const mongoose = require('mongoose')
const {Schema, model} = mongoose

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    dueDate: { type: Date, required: true }, //2024-01-01
   // assignedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},{timestamps:true})

const Task = model('Task', taskSchema)

module.exports = Task 
