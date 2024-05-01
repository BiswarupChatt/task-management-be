<<<<<<< HEAD
const mongoose = require('mongoose')
const { Schema, model } = mongoose
=======
const mongoose = require("mongoose");
const { Schema, model } = mongoose;
>>>>>>> 7ed2c19e7357c51e920f27fbeb8696d819ff0287

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
<<<<<<< HEAD
    priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    dueDate: { type: Date, required: true },

}, { timestamps: true })
=======
    priority: { type: String, enum: ["Low", "Medium", "High"], required: true },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    dueDate: { type: Date, required: true }, //2024-01-01
    // assignedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);
>>>>>>> 7ed2c19e7357c51e920f27fbeb8696d819ff0287

const Task = model("Task", taskSchema);

module.exports = Task;
