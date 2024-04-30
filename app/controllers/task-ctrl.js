const express = require("express");

const Task = require("../models/task-model");

const taskCtrl = {};

taskCtrl.create = async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).send(task);
};

taskCtrl.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
};

taskCtrl.update = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(task);
};
taskCtrl.delete = async (req, res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.status(204).send("Task deleted");
};

module.exports = taskCtrl
