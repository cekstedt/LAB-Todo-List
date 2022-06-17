// Module Imports

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const _ = require("lodash");

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

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema]
});
const List = mongoose.model("List", listSchema);

const item1 = new Item({ name: "Welcome to your Todo List!" });
const item2 = new Item({ name: "Hit the + button to add a new item." });
const item3 = new Item({ name: "<-- Hit this to delete an item." });
const defaultList = [item1, item2, item3];

// Get routes.

// Bug fix: Causing duplicate data in database.
app.get("/favicon.ico", (req, res) => {
  res.sendStatus(404);
});

app.get("/", function(req, res) {
  Item.find({}, function(err, foundItems) {
    if (err) {
      console.log(err);
    } else {
      if (foundItems.length === 0) {
        Item.insertMany(defaultList, handleError);
        res.redirect("/");
      } else {
        res.render("list", {
          listTitle: "Today",
          listItems: foundItems
        });
      }
    }
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/:listName", function(req, res) {
  const listName = _.capitalize(req.params.listName);

  List.findOne({ name: listName }, function(err, foundList) {
    if (!err) {
      if (!foundList) {
        // Create a new list.
        const list = new List({
          name: listName,
          items: defaultList
        });
        list.save();
        res.redirect("/" + listName);
      } else {
        // Show an existing list.
        res.render("list", {
          listTitle: foundList.name,
          listItems: foundList.items
        });
      }
    }
  })
});

// Post routes.

app.post("/", function(req, res) {
  const itemName = req.body.newItem;
  const listName = _.capitalize(req.body.list);
  const newItem = new Item({ name: itemName });

  if (listName === "Today") {
    newItem.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, function(err, foundList) {
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", function(req, res) {
  const itemID = req.body.checkbox;
  const listName = _.capitalize(req.body.listName);

  if (listName === "Today") {
    Item.findByIdAndRemove(itemID, handleError);
    res.redirect("/");
  } else {
    List.findOneAndUpdate({
        name: listName
      }, { $pull: { items: { _id: itemID } } },
      function(err, foundList) {
        if (!err) {
          res.redirect("/" + listName);
        }
      });
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