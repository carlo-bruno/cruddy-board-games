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
  res.render("index");
});

// show all - index
app.get("/games", (req, res) => {
  db.game.findAll().then(games => {
    res.render("games/index", { games });
  });
});

// link new page
app.get("/games/new", (req, res) => {
  res.render("games/new");
});
//create entry - new
app.post("/games", (req, res) => {
  db.game
    .create({
      name: req.body.name,
      description: req.body.description,
      players: req.body.players
    })
    .then(() => {
      res.redirect("/games");
    });
});

// show one - show
app.get("/games/:id", (req, res) => {
  db.game.findById(parseInt(req.params.id)).then(game => {
    res.render("games/show", { game });
  });
});

// delete
app.delete("/games/:id", (req, res) => {
  db.game
    .destroy({
      where: { id: req.params.id }
    })
    .then(() => {
      res.redirect("/games");
    });
});

// link update page
app.get("/games/:id/edit", (req, res) => {
  db.game.findById(parseInt(req.params.id)).then(game => {
    res.render("games/edit", { game });
  });
});

// update
app.put("/games/:id", (req, res) => {
  db.game
    .update(
      {
        name: req.body.name,
        description: req.body.description,
        players: req.body.players
      },
      {
        where: { id: req.params.id }
      }
    )
    .then(() => {
      res.redirect("/games/" + req.params.id);
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
