const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.get("/", function(req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }
  let day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    listTitle: day,
    listItems: items
  });
});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", listItems: workItems})
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.post("/", function(req, res) {
  if (req.body.list === "Work") {
    workItems.push(req.body.newItem);
    res.redirect("/work");
  } else {
    items.push(req.body.newItem);
    res.redirect("/");
  }
});

app.listen(port, function() {
  console.log("Server started on port " + port);
});
