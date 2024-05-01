const {validationResult} = require('express-validator')
const Task = require("../models/task-model");

const taskCtrl = {};

taskCtrl.create = async (req, res) => {
  const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

  try {
    const body = req.body
    const task = new Task(body)
    task.userId = req.user.id
    await task.save()
    //sent task email (todo)
    res.status(200).json(task)
  } catch (err) {
    res.status(500).json({ errors: 'Something went wrong' })
  }
}

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

module.exports = taskCtrl;
