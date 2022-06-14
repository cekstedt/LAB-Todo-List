// Module Imports

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const date = require(__dirname + "/date.js");

// Setting module imports for use.

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");

// Global variables.

const port = process.env.PORT;
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

// Get routes.

app.get("/", function(req, res) {
  res.render("list", {
    listTitle: date.getDate(),
    listItems: items
  });
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    listItems: workItems
  })
});

app.get("/about", function(req, res) {
  res.render("about");
});

// Post routes.

app.post("/", function(req, res) {
  if (req.body.list === "Work") {
    workItems.push(req.body.newItem);
    res.redirect("/work");
  } else {
    items.push(req.body.newItem);
    res.redirect("/");
  }
});

// Initialize server.

app.listen(port, function() {
  console.log("Server started on port " + port);
});
