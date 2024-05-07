// const yup = require('yup');
// import { object } from 'yup';
// const timeLogValidation = yup.object({
//     taskId: yup
//         .string()
//         .required('Task ID is required.'),


// const timeLogValidation = yup.object({
//     taskId: yup
//         .string()
//         .required('Task ID is required.'),

//     timeSpent: yup
//         .number()
//         .required('Time spent is required.')
//         .positive('Time spent must be a positive number.')
//         .integer('Time spent must be an integer.')
// });

// module.exports = timeLogValidation;


const TimeLog = require("../models/timeLog-model")

const timeLogValidations = {
    taskId: {
        in: ['body'],
        exists:{
            errorMessage:"task Id is required"
        },
    notEmpty:{
        errorMessage: 'User ID cannot be empty'
        }
        
    },
    // userId: {
    //     in: ['body'],
    //     exists:{
    //         errorMessage:"userId is required"
    //     },
    // notEmpty:{
    //     errorMessage: 'User ID cannot be empty'
    //     }
        
    // },
    timeSpent: {
        in: ['body'],
        exists:{
            errorMessage:"task Id is required"
        },
        notEmpty:{
            errorMessage: 'User ID cannot be empty'
        },
        isNumeric: {
            errorMessage: 'Time spent must be a numeric value'
        },
        custom: {
            options: (value) => {
                if (value <= 0) {
                    throw new Error("Time spent must be greater than zero");
                }
                return true;
            },
            errorMessage: 'Time spent must be greater than zero'
        }
    },
    
        
};

module.exports = timeLogValidations;


time controls 

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
