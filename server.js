const express = require("express");
const methodOverride = require("method-override");
const db = require("./models");
const app = express();

const port = 3000;

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("WORKING!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
