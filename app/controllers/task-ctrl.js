const { validationResult } = require('express-validator')
const Task = require("../models/task-model")
const User = require("../models/user-model")
const nodemailer = require("../utility/nodemailer")
// const Employee = require("../models/task-model");
const taskCtrl = {};

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

//list of user assigned to particular tasks
taskCtrl.getEmployeeTasks = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const userId = req.user.id
    const tasks = await Task.find({ assignedUserId: userId });
    res.status(200).json(tasks)
  }catch(err){
    console.log(err)
    res.status(500).json({ errors: 'Cant not retrieve the data ' })
  } 
  
};



// taskCtrl.getTeamLeadTasks = async (req, res) => {
//   const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() })
//   }

//   try {
//     const userId = req.user.id
//     const tasks = await Task.find({ UserId: userId });
//     res.status(200).json(tasks)
//   }catch(err){
//     console.log(err)
//     res.status(500).json({ errors: 'Cant not retrieve the data ' })
//   } 
  
// };

//list of tasks created by that particular teamlead
taskCtrl.getTeamLeadTasks = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = req.user.id; 
        const tasks = await Task.find({ userId: userId }); // userId is case sensitive 
        res.status(200).json(tasks);
    } catch (err) {
        console.error('Error retrieving tasks:', err);
        res.status(500).json({ errors: 'Cannot retrieve the data' });
    }
};

module.exports = taskCtrl;





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
