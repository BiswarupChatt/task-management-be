const { validationResult } = require('express-validator')
const Task = require("../models/task-model")
const User = require("../models/user-model")
const nodemailer = require("../utility/nodemailer")
const taskCtrl = {};
const _ = require("lodash")

//creating the tasks
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
    const assignedUser = await User.findById(task.assignedUserId)
    if (!assignedUser) {
      return res.status(400).json({ errors: 'Assigned user not found' })
    } else {
      nodemailer.sendTaskEmail(assignedUser.email)
    }
    res.status(200).json(task)
  } catch (err) {
    res.status(500).json({ errors: 'Something went wrong' })
  }
}

taskCtrl.getTasks = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const userId = req.user.id
    if (req.user.role == 'Employee') {
      const tasks = await Task.find({ assignedUserId: userId }).populate('assignedUserId userId', 'firstName lastName email');
      res.status(200).json(tasks)
    } else if (req.user.role == 'TeamLead') {
      const tasks = await Task.find({ userId: userId }).populate('assignedUserId userId', 'firstName lastName email')
      res.status(200).json(tasks)
    } else {
      res.status(400).json({ errors: "User not authorize to get task" })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: 'Cant not retrieve the data ' })
  }

};

taskCtrl.update = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const taskId = req.query._id
    const userId = req.user.id
    const body = req.body
    const task = await Task.findById(taskId)

    if (task.userId.toString() == userId.toString()) {
      const updatedTask = await Task.findByIdAndUpdate(taskId, body, { new: true })
      res.status(200).json(updatedTask);
    } else {
      res.status(403).json({ errors: "You are not authorized to update this task" })
    }
  } catch (err) {
    res.status(500).json({ errors: 'Something went wrong' })
  }
}

taskCtrl.statusUpdate = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const taskId = req.query._id
    const userId = req.user.id
    const body = req.body
    const task = await Task.findById(taskId)

    if (task.assignedUserId.toString() == userId.toString()) {
      const updatedTask = await Task.findByIdAndUpdate(taskId, { status: body.status }, { new: true })
      res.status(200).json(_.pick(updatedTask, ['status']));
    } else {
      res.status(403).json({ errors: "You are not authorized to update this task" })
    }
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: 'Unable to update task', errors: err.message })
  }
}


taskCtrl.delete = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const taskId = req.query._id
    const userId = req.user.id
    const task = await Task.findById(taskId)

    if (task.userId.toString() !== userId.toString()) {
      res.status(400).json({ errors: "Unauthorized to delete task" })
    } else {
      const deletedTask = await Task.findByIdAndDelete(taskId)
      res.status(200).json("Task Deleted Successfully")
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: "Something went wrong" })
  }
};

module.exports = taskCtrl;
