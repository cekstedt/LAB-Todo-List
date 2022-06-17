// Module Imports

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");

// Setting module imports for use.

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/todolistDB");

// Global variables.

const port = process.env.PORT;
const itemsSchema = new mongoose.Schema({
  name: String
});
const Item = mongoose.model("Item", itemsSchema);

// const item1 = new Item({ name: "Welcome to your Todo List!" });
// const item2 = new Item({ name: "Hit the + button to add a new item." });
// const item3 = new Item({ name: "<-- Hit this to delete an item." });
// const defaultItems = [item1, item2, item3];
// Item.insertMany(defaultItems, handleError);


// Get routes.

app.get("/", function(req, res) {
  Item.find({}, function(err, result) {
    res.render("list", {
      listTitle: "Today",
      listItems: result
    });
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

// Utility functions.

function handleError(err) {
  if (err) {
    console.log(err);
  }
}