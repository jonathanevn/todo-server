const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/To-do-list",
  { useNewUrlParser: true }
);

app.use(bodyParser.json());

// 1) Definir le model - A faire qu'une fois
const TaskModel = mongoose.model("ToDo", {
  title: String,
  clicked: Boolean
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
  console.log("req.body", req.body);
  console.log("newTask", newTask);
  //je sauvegarde le modèle
  newTask.save(function(err, TaskSaved) {
    console.log("TaskSaved", TaskSaved);
    if (err) {
      console.log("err", err);
      res.json({ error: "erreur" });
    } else {
      res.json("We just saved the new task" + TaskSaved);
    }
  });
});

// en POST, pour que le client puisse rendre une tâche faite ou non-faite

app.post("/update", function(req, res) {});

// en POST, pour que le client puisse supprimer une tâche

app.post("/delete", function(req, res) {});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server has started");
});
