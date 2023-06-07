const cors = require('cors');
const express = require("express");
let fruits = require("./fruits.json");

const app = express();

app.use(cors());
// const logger = require("./logger");
// app.use(logger)

app.get("/", (req, res) => {
  res.send("Hello Fruit API");
});

app.use(express.json());

app.get("/fruits", (req, res) => {
  res.send(fruits);
});

app.get("/fruits/:name", (req, res) => {
  const name = req.params.name.toLowerCase();

  const fruit = fruits.find(
    (fruitInfo) => fruitInfo.name.toLowerCase() === name
  );
  if (fruit) {
    res.send(fruit, 200);
  } else {
    res.send("Fruit not found", 404);
  }
});

app.post("/fruits", (req, res) => {
  const fruit = req.body;
  const fruitName = fruit.name.toLowerCase();
  const fruitIndex = fruits.findIndex((fruit) => fruit.name === fruitName);

  if (~fruitIndex) {
    fruits.push(fruit);
    res.send("New Fruit Created", 201);
  } else {
    res.send("Fruit has already been defined", 409);
  }
});

app.delete("/fruits/:name", (req, res) => {
  const fruitName = req.params.name.toLowerCase();

  const fruitIndex = fruits.findIndex(
    (fruit) => fruit.name.toLowerCase() === fruitName
  );

  const hasFruit = ~fruitIndex;

  if (hasFruit) {
    const fruitDeleted = fruits.splice(fruitIndex, 1);
    res.status(204).send(`You deled ${fruitDeleted.name}`);
  } else {
    res.status(409).send("Fruit not found");
  }
});

module.exports = app;
