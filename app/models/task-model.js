const mongoose = require('mongoose')
const { Schema, model } = mongoose

const taskSchema = new Schema(
  {
    title: String,
    description: String,
    priority: String,
    status: String,
    dueDate: Date,
    assignedUserId: {
      type:Schema.Types.ObjectId,
      ref:'User'
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }, { timestamps: true })

// {
//   title: String,
//   description: String,
//   priority: String,
//   status: String,
//   dueDate: Date,
//   userId: {
//     taskAssignedUserId: Schema.Types.ObjectId,
//     taskCreatorUserId: {
//       type: Schema.Types.ObjectId,
//       ref: 'User'
//     }
//   }
// }, { timestamps: true })


const Task = model("Task", taskSchema);

module.exports = Task;
