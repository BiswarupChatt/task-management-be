const { validationResult } = require('express-validator')
const Task = require("../models/task-model")
const User = require("../models/user-model")
const nodemailer = require("../utility/nodemailer")
const Employee = require("../models/task-model");
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
// taskCtrl.getTasks = async (req, res) => {
//   try {
//     //  req.user.id contains the ID of the logged-in user
//     const tasks = await Task.find({ userId: req.user.id });
//     res.send(tasks);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to retrieve tasks', error: error });
//   }
// };

// taskCtrl.getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({ userId: req.user.id });
//     res.status(200).json(tasks);
//   } catch (error) {
//     console.error(error);  // Log the full error to your server console
//     res.status(500).json({ message: 'Failed to retrieve tasks', error: error.message });
//   }
// };



// taskCtrl.getTasks = async (req, res) => {
//   const tasks = await Task.find();
//   res.send(tasks);
// };

taskCtrl.getTasks = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const userId = req.user.id
    const tasks = await Task.find({ assignedUserId: userId });
    res.status(200).json(tasks)
<<<<<<< HEAD
  }catch(err){
    console.log(err)
    res.status(500).json({ errors: 'Cant not retrieve the data ' })
=======
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: 'Something went wrong' })
>>>>>>> 4ef185a27dedf1e4a8d88738f2e29767073222a0
  }
};

// controllers/taskCtrl.js


// const taskCtrl1 = {
//   getTasks: async (req, res) => {
//     try {
//       // Assuming that only Employee role should fetch all employees
//       const employees = await Employee.find();
//       res.json(employees);
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to retrieve employees', error: error.toString() });
//     }
//   }
// };

// module.exports = taskCtrl1;


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
