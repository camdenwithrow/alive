const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
require("dotenv").config();
const axios = require('axios');

const filename = "./data/data.json";
let data = require(filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const newDate = () => new Date().toString();


app.get("/", (req, res) => {
  res.send(data);
});

app.put("/", async (req, res) => {
  const id = data.id;
  const name = data.name
  const {feeling, emoji, gif} = req.body
  let gifUrl;
  const date =  newDate()

  const encodeFeeling = encodeURIComponent(gif)

  axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY}&q=${gif}`)
  .then(function (response) {
    // handle success
    gifUrl = response.data.data[0].embed_url
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
    data = { id: id, name: name, feeling: feeling, emoji: emoji, gif: gifUrl, lastUpdated: date };
    fs.writeFile(filename, JSON.stringify(data), "utf8");
    res.send(data);
  });
  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
