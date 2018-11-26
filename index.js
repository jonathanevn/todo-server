const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/to-do-list");

// 1) Definir le model - A faire qu'une fois
var ToDo = mongoose.model("ToDo", {
  name: String,
  age: Number,
  createdAt: { type: Date, default: Date.now }
});

// 2) Créer des documents
var lucy = new ToDo({
  name: "Lucy",
  age: 28
});

// 3) Sauvegarder des documents
lucy.save(function(err, obj) {
  if (err) {
    console.log("something went wrong");
  } else {
    console.log("we just saved your to do" + obj.name);
  }
});

// / => hi
app.get("/", function(req, res) {
  res.send("hi");
});

app.get("/hello", function(req, res) {
  res.send("hello");
});

app.get("/bonjour", function(req, res) {
  res.send("bonjour");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server has started");
});
