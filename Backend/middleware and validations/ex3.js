
const express = require("express");
const { body, param, validationResult } = require("express-validator");
const Ajv = require("ajv");

const app = express();
app.use(express.json());


let nextPostId = 1;
let nextCommentId = 1;
const posts = []; // { id, title, content, tags }
const comments = []; // { id, postId, content, email, createdAt }


app.use((req, res, next) => {
  res.ok = (data, meta) => {
    return res.json({ success: true, data, meta: meta || null });
  };
  res.fail = (status, message, details) => {
    return res.status(status).json({
      success: false,
      error: { message, status, details: details || null },
    });
  };
  next();
});


app.use((req, res, next) => {
  const start = process.hrtime.bigint();
  const ts = new Date().toISOString();
  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const ms = Number(end - start) / 1e6;
    const len = res.getHeader("content-length") || 0;
    console.log(
      `[${ts}] ${req.ip} ${req.method} ${req.originalUrl} -> ${res.statusCode} ${len}B ${ms.toFixed(
        1
      )}ms`
    );
  });
  next();
});


const RATE_LIMIT = 10;
const WINDOW_MS = 60_000;
const ipHits = new Map(); // ip -> array of timestamps (ms)

app.use((req, res, next) => {
  const now = Date.now();
  const ip = req.ip;

  if (!ipHits.has(ip)) ipHits.set(ip, []);
  const arr = ipHits.get(ip);

  // drop old
  while (arr.length && now - arr[0] > WINDOW_MS) arr.shift();

  if (arr.length >= RATE_LIMIT) {
    return res.fail(429, "Too Many Requests", {
      limit: RATE_LIMIT,
      windowMs: WINDOW_MS,
    });
  }
  arr.push(now);
  next();
});


app.use((req, res, next) => {
  if (["POST", "PUT"].includes(req.method)) {
    const ct = req.headers["content-type"] || "";
    if (!ct.toLowerCase().startsWith("application/json")) {
      return res.fail(415, "Unsupported Media Type: expected application/json");
    }
  }
  next();
});


const ajv = new Ajv({ allErrors: true, removeAdditional: "failing" });

const postSchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "content", "tags"],
  properties: {
    title: { type: "string", minLength: 5, maxLength: 100 },
    content: { type: "string", minLength: 10, maxLength: 1000 },
    tags: {
      type: "array",
      items: { type: "string" },
    },
    category: { type: "string" }, // <-- allow category if desired
  },
};

const validatePost = ajv.compile(postSchema);


const findPostById = (id) => posts.find((p) => p.id === id);
const toInt = (v) => Number.parseInt(v, 10);



app.post("/posts", (req, res) => {
  const valid = validatePost(req.body);
  if (!valid) {
    return res.fail(400, "Post validation failed", validatePost.errors);
  }

  const { title, content, tags, category } = req.body;
  const post = {
    id: nextPostId++,
    title,
    content,
    tags: Array.isArray(tags) ? tags : [],
    ...(category ? { category } : {}),
  };
  posts.push(post);
  return res.status(201).ok(post);
});

app.get("/posts", (req, res) => {
  return res.ok(posts);
});

app.post(
  "/posts/:postId/comments",
  [
    param("postId").isInt({ min: 1 }).withMessage("postId must be a positive integer"),
    body("content")
      .isString()
      .isLength({ min: 5, max: 500 })
      .withMessage("content must be 5–500 characters"),
    body("email").isEmail().withMessage("email must be a valid email address"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.fail(400, "Comment validation failed", errors.array());
    }

    const postId = toInt(req.params.postId);
    const post = findPostById(postId);
    if (!post) {
      return res.fail(404, `Post with id ${postId} not found`);
    }

    const { content, email } = req.body;
    const comment = {
      id: nextCommentId++,
      postId,
      content,
      email,
      createdAt: new Date().toISOString(),
    };
    comments.push(comment);
    return res.status(201).ok(comment);
  }
);

app.get(
  "/posts/:postId/comments",
  [param("postId").isInt({ min: 1 }).withMessage("postId must be a positive integer")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.fail(400, "Invalid postId", errors.array());
    }

    const postId = toInt(req.params.postId);
    const result = comments.filter((c) => c.postId === postId);
    return res.ok(result, { count: result.length });
  }
);


app.use((req, res) => res.fail(404, "Route not found"));

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  const status = err.status || 500;
  res.fail(status, err.message || "Internal Server Error");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API listening at http://localhost:${PORT}`);
});
