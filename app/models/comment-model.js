const mongoose = require('mongoose')
const { Schema, model } = mongoose

const commentSchema = new Schema({
    content: { type: String, required: true },
    id: {
        taskId: {
            type: Schema.Types.ObjectId,
            ref: 'Task',
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    postedAt: { type: Date, default: Date.now }
}, { timestamps: true }) // timestamps true to know when was the comment posted 

const Comment = model('Comment', commentSchema)

module.exports = Comment
