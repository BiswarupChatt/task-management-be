const mongoose = require('mongoose')

const commentSchema = new Schema({
    content: { type: String, required: true },
    task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postedAt: { type: Date, default: Date.now }
},{timestamps:true}) // timestamps true to know when was the comment posted 

const Comment = model('Comment', commentSchema)

module.exports = Comment