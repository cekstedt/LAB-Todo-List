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

app.get("/", function(req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }
  let day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    kindOfDay: day,
    listItems: items
  });
});

app.post("/", function(req, res) {
  items.push(req.body.newItem);
  res.redirect("/");
});

app.listen(port, function() {
  console.log("Server started on port " + port);
});
