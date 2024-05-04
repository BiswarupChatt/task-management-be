const { validationResult } = require('express-validator')
const Task = require("../models/task-model")
const User = require("../models/user-model")
const nodemailer = require("../utility/nodemailer")
// const Employee = require("../models/task-model");
const taskCtrl = {};

const handleValidationErrors = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
}

//creating the tasks
taskCtrl.create = async (req, res) => {
  handleValidationErrors(req, res)
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
  handleValidationErrors(req, res)

  try {
    if (req.user.role == 'Employee') {
      const userId = req.user.id
      const tasks = await Task.find({ assignedUserId: userId });
      res.status(200).json(tasks)
    } else if (req.user.role == 'TeamLead') {
      const userId = req.user.id;
      const tasks = await Task.find({ userId: userId }); // userId is case sensitive 
      res.status(200).json(tasks);
    } else {
      res.status(400).json({ errors: "User not authorize to get task" })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: 'Cant not retrieve the data ' })
  }

};


// taskCtrl.update = async (req, res) => {
//   handleValidationErrors(req, res)

//   try {
//     const taskId = req.query._id; // The ID of the task to update
//     const userId = req.user.id; // ID of the logged-in user
//     const body = req.body; // Data for updating the task

//     // Find the task based on taskId to check the assigned user or role before updating
//     const task = await Task.findById(taskId);

//     // Check if the logged-in user is the task's assigned user or is a team lead
//     if (task.userId.toString() == userId.toString()) {
//       // Authorized to update the task
//       const updatedTask = await Task.findByIdAndUpdate(taskId, body, { new: true });
//       res.status(200).json(updatedTask);
//     } else {
//       // Not authorized to update the task
//       return res.status(403).json({ message: "You are not authorized to update this task" });
//     }
//   } catch (err) {
//     console.error("Error updating task:", err);
//     res.status(500).json({ message: 'Unable to update task', errors: err.message });
//   }
// }


// taskCtrl.update = async (req, res) => {
//   handleValidationErrors(req, res)

//   try {
//     const taskId = req.query._id
//     const userId = req.user.id
//     const body = req.body
//     const task = await Task.findById(taskId)

//     if (req.user.role == "TeamLead") {
//       if (task.userId.toString() == userId.toString()) {
//         const updatedTask = await Task.findByIdAndUpdate(taskId, body, { new: true })
//         res.status(200).json(updatedTask);
//       } else {
//         res.status(403).json({ errors: "You are not authorized to update this task" })
//       }
//     }
//     else if (req.user.role == "Employee") {
//       if (task.assignedUserId.toString() == userId.toString()) {
//         const updatedTask = await Task.findByIdAndUpdate(taskId, { status: body.status }, { new: true })
//         res.status(200).json(updatedTask);
//       } else {
//         res.status(403).json({ errors: "You are not authorized to update this task" })
//       }
//     }
//     else {
//       res.status(400).json({ errors: "Invalid User Role" })
//     }

//   } catch (err) {
//     console.error("Error updating task:", err);
//     res.status(500).json({ message: 'Unable to update task', errors: err.message })
//   }
// }


taskCtrl.update = async (req, res) => {
  handleValidationErrors(req, res)
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
  handleValidationErrors(req, res)
  try {
    const taskId = req.query._id
    const userId = req.user.id
    const body = req.body
    const task = await Task.findById(taskId)

    if (task.assignedUserId.toString() == userId.toString()) {
      const updatedTask = await Task.findByIdAndUpdate(taskId, { status: body.status }, { new: true })
      res.status(200).json(updatedTask);
    } else {
      res.status(403).json({ errors: "You are not authorized to update this task" })
    }
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: 'Unable to update task', errors: err.message })
  }
}


taskCtrl.delete = async (req, res) => {
  handleValidationErrors(req, res)

  try {
    const taskId = req.query._id
    const userId = req.user.id
    const task = await Task.findById(taskId)

    if (task.userId.toString() !== userId.toString()) {
      res.status(400).json({ errors: "Unauthorized to delete task" })
    } else {
      const deletedTask = await Task.findByIdAndDelete(taskId)
      res.status(200).json(deletedTask)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: "Something went wrong" })
  }
};

module.exports = taskCtrl;
