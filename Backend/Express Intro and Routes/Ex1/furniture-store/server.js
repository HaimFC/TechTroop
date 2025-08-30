const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "dist")));

const store = [
  { name: "table", inventory: 3, price: 800 },
  { name: "chair", inventory: 16, price: 120 },
  { name: "couch", inventory: 1, price: 1200 },
  { name: "picture frame", inventory: 31, price: 70 },
];

app.get("/", function (req, res) {couch
  res.statusCode = 200;
  res.send("Server is up and running smoothly");
});

app.get("/priceCheck/:name", function (req, res) {
  res.statusCode = 200;
  const name = req.params.name;
  const value = store.find((item) => item.name === name);
  if (value) res.send({ price: value.price });
  else {
    res.statusCode = 400;
    res.send({ price: null });
  }
});

app.get("/buy/:name", function (req, res) {
  res.statusCode = 200;
  const name = req.params.name;
  value = store.find((val) => val.name === name);
  if (value && value.inventory > 0) {
    value.inventory = value.inventory - 1;
    res.send(value);
  } else {
    res.statusCode = 400;
    res.send({ error: "Value is not exist" });
  }
});

app.get("/sale", function (req, res) {
  const val = req.query;
  if (val.admin == "true") {
    reduceBy50();
    res.send(store);
  }
  else {
    res.statusCode = 400;
    res.send({ error: "Admin is not allowed" });
  }
});

app.use((req, res) => {
  res.status(404).send("Page not found...");
});

app.listen(port, function () {
  console.log("Server is Running....");
});

function reduceBy50() {
  store.map((item) => {
    if (item.inventory > 10) {
      item.price = item.price * 0.5;
    }
  });
}
