const express = require("express");
const app = express();
const port = 3000;

let requestCounter = 0;

// Logging middleware
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

// Request counter middleware
const counter = (req, res, next) => {
  requestCounter++;
  req.requestCount = requestCounter;
  next();
};

// Apply both middlewares to all routes
app.use(logger);
app.use(counter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome!", requestCount: req.requestCount });
});

app.get("/about", (req, res) => {
  res.json({ message: "About Page!", requestCount: req.requestCount });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
