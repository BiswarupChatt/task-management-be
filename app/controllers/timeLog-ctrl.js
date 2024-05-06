const TimeLog = require("../models/timeLog-model");
const Task = require("../models/task-model");
//const User = require('../models/user-model')

const timeCtrl = {};

//  new time log entry
timeCtrl.addTimeLog = async (req, res) => {
  const { taskId, timeSpent } = req.body;
  //const userId = req.user.id;

  try {
    // Check if the task exists
    // const task = await Task.findById(taskId);
    // if (!task) {
    //   return res.status(404).json({ errors: "Task not found" });
    // }

    // Check if the user exists
    // const user = await User.findById(userId);
    // if (!user) {
    //     return res.status(404).json({ errors: 'User not found' });
    // }

    const newTimeLog = new TimeLog({
      task: taskId,
      //user: userId,
      timeSpent,
    });
    await newTimeLog.save();
    res.status(201).json(newTimeLog);
  } catch (err) {
    console.error("Error logging time:", err);
    res.status(500).json({ errors: "Failed to log time" });
  }
};

//  time logs for a specific task
timeCtrl.getTimeLogsByTask = async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const timeLogs = await TimeLog.find({ task: taskId });
    res.status(200).json(timeLogs);
  } catch (err) {
    console.error("Error retrieving time logs");
    res.status(500).json({ errors: "Failed to retrieve time logs" });
  }
};

//  time logs for a specific user
// timeCtrl.getTimeLogsByUser = async (req, res) => {
//     const userId = req.params.userId;

//     try {
//         const timeLogs = await TimeLog.find({ user: userId })
//         res.status(200).json(timeLogs);
//     } catch (err) {
//         console.error('Error retrieving time logs:');
//         res.status(500).json({ errors: 'Failed to retrieve time logs' });
//     }
// };

module.exports = timeCtrl;
