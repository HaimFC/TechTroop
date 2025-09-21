const express = require("express");
const app = express();

app.use(express.json());

// --- In-memory data store ---
const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

// --- Helpers ---
const makeError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

// --- Route-specific middleware ---
// 1) Validate :id is a positive integer
const validateId = (req, res, next) => {
  const { id } = req.params;
  // allow leading zeros but require digits only
  if (!/^\d+$/.test(id)) {
    return next(makeError(400, "Invalid ID format: must be a number"));
  }
  req.idNum = Number(id);
  next();
};

// 2) Check the user exists; attach to req.user
const checkResourceExists = (req, res, next) => {
  const user = users.find((u) => u.id === req.idNum);
  if (!user) {
    return next(makeError(404, `User with id ${req.idNum} not found`));
  }
  req.user = user;
  next();
};

// --- Routes ---
// GET /users - list all users
app.get("/users", (req, res) => {
  res.json(users);
});

// GET /users/:id - validate id, check existence, then return
app.get("/users/:id", validateId, checkResourceExists, (req, res) => {
  res.json(req.user);
});

// POST /users - create a user (simple validation)
app.post("/users", (req, res, next) => {
  const { name } = req.body || {};
  if (!name || typeof name !== "string" || !name.trim()) {
    return next(makeError(400, "Field 'name' is required"));
  }
  const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const newUser = { id: nextId, name: name.trim() };
  users.push(newUser);
  res.status(201).json(newUser);
});

// --- Error handler (must be after routes) ---
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || "Internal Server Error",
      status,
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
