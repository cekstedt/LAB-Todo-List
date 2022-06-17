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



// Get routes.

app.get("/", function(req, res) {
  Item.find({}, function(err, foundItems) {
    if (err) {
      console.log(err);
    } else {
      if (foundItems.length === 0) {
        const item1 = new Item({ name: "Welcome to your Todo List!" });
        const item2 = new Item({ name: "Hit the + button to add a new item." });
        const item3 = new Item({ name: "<-- Hit this to delete an item." });
        foundItems = [item1, item2, item3];
        Item.insertMany(foundItems, handleError);
      }
      res.render("list", {
        listTitle: "Today",
        listItems: foundItems
      });
    }
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
    const newItem = new Item({ name: req.body.newItem });
    newItem.save();
    res.redirect("/");
  }
});

app.post("/delete", function(req, res) {
  Item.findByIdAndRemove(req.body.checkbox, handleError);
  res.redirect("/");
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