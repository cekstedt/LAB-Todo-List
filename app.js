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

app.get("/", function(req, res) {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let today = new Date();
  let currentDay = today.getDay();

  res.render("list", {
    kindOfDay: weekdays[currentDay]
  });
});

app.listen(port, function() {
  console.log("Server started on port " + port);
});
