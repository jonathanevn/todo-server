const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");

const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/To-do-list",
  { useNewUrlParser: true }
);

app.use(bodyParser.json());

// 1) Definir le model - A faire qu'une fois
const TaskModel = mongoose.model("ToDo", {
  title: String,
  clicked: {
    type: Boolean,
    default: false
  }
});

// en GET, pour que le client récupère la liste des tâches
app.get("/", function(req, res) {
  TaskModel.find().exec(function(err, task) {
    if (!err) {
      res.json(task);
    }
  });
});

// en POST, pour que le client puisse créer une tâche

app.post("/create", function(req, res) {
  //je créé un nouveau modèle
  const newTask = new TaskModel(req.body);
  //je sauvegarde le modèle
  newTask.save(function(err, TaskSaved) {
    if (err) {
      res.status(500).json({ error: "erreur" });
    } else {
      res.status(200).json(TaskSaved);
    }
  });
});

app.post("/update", function(req, res) {
  const { _id, clicked } = req.body;
  TaskModel.findByIdAndUpdate(_id, { clicked }, (err, task) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      TaskModel.findById(_id, (err, task) => {
        res.status(200).json(task);
      });
    }
  });
});

// en POST, pour que le client puisse supprimer une tâche

app.post("/delete", function(req, res) {
  const { _id, deleted } = req.body;
  TaskModel.findByIdAndRemove(_id, (err, task) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).send("OK");
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server has started");
});
