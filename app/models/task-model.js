const mongoose = require('mongoose')
const { Schema, model } = mongoose

const taskSchema = new Schema(
  {
    title: String,
    description: String,
    priority: String,
    status: String,
    dueDate: Date,
    assignedUserId: Schema.Types.ObjectId,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
}, { timestamps: true })


const Task = model("Task", taskSchema);

module.exports = Task;
