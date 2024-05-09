const TimeLog = require("../models/timeLog-model");
const Task = require("../models/task-model");
const { validationResult } = require("express-validator");

const timeCtrl = {};

//  new time log entry
timeCtrl.addTimeLog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { taskId, timeSpent } = req.body;
  const userId = req.user.id;

  try {

    const newTimeLog = new TimeLog({
      task: taskId, 
      user:userId,   
      timeSpent,
      
    });
    await newTimeLog.save();
    res.status(201).json(newTimeLog);
  } catch (err) {
    console.error("Error logging time:", err);
    res.status(500).json({ errors: "Failed to log time" });
  }
};

timeCtrl.getTimeLogsByTask = async (req, res) => {
  const taskId = req.params.taskId;
  const userId = req.user.id

  try {
    const timeLogs = await TimeLog.find({ task: taskId , user:userId})//.populate("user");
    res.status(200).json(timeLogs);
  } catch (err) {
    console.error("Error retrieving time logs");
    res.status(500).json({ errors: "Failed to retrieve time logs" });
  }
};

timeCtrl.update = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }

    try{
        const body = req.body
        const timeLogId = req.query._id
        console.log("Retrieved TimeLog ID:", timeLogId)
        const timeLog = await TimeLog.findById(timeLogId)
        
        if(timeLog.user.toString() === req.user.id.toString()){
            const updatedTimeLog = await TimeLog.findByIdAndUpdate(timeLogId,body,{new:true})
            res.status(200).json(updatedTimeLog)

        } else {
            res.status(403).json({ errors: "Unauthorized to edit this time log" })
        }
    } catch(err){
        console.log("Error while updating time log:", err)
        res.status(500).json({ errors: 'Something went wrong',message: err.message  })
    }

}

timeCtrl.delete = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const timeLogId = req.query._id
        const timeLog = await TimeLog.findById(timeLogId)
        if (timeLog.user.toString() == req.user.id.toString()) {
            const timeLog = await TimeLog.findByIdAndDelete(timeLogId)
            res.status(200).json("Time log deleted successfully")
        } else {
            res.status(500).json({ errors: "Unauthorized to delete timeLog" })
        }
    } catch (err) {
        console.log("error while deleting timeLog",err)
        res.status(500).json({ errors: 'Something went wrong',message: err.message  })
    }
}


module.exports = timeCtrl;
