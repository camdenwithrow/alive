const express = require("express");
const fs = require("fs").promises;

const filename = "./data/data.json";
let data = require(filename);

const app = express();
const port = 3000;

const newDate = () => new Date().toString();

app.get("/", (req, res) => {
  res.send(data);
});

app.put("/", async (req, res) => {
  const id = data.id;
  const date = {
    lastUpdated: newDate(),
  };
  data = { id: id, name: data.name, ...date };
  console.log(data);
  await fs.writeFile(filename, JSON.stringify(data), "utf8");
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
