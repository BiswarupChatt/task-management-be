const { validationResult } = require("express-validator")
const Comment = require("../models/comment-model")

const commentCtrl = {}

const handleValidationErrors = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
}


commentCtrl.create = async (req, res) => {
    handleValidationErrors(req, res)
    try {
        const body = req.body
        const comment = new Comment(body)
        comment.identifier.userId = req.user.id
        comment.identifier.taskId = req.query.id
        await comment.save()
        res.status(200).json(comment)
    } catch (err) {
        res.status(500).json({ errors: 'Something went wrong' })
    }
}

commentCtrl.get = async (req, res) => {
    handleValidationErrors(req, res)
    try {
        const taskId = req.query.id
        const comment = await Comment.findOne({ "identifier.taskId": taskId })
        res.status(200).json(comment)
    } catch (err) {
        res.status(500).json({ errors: 'Something went wrong' })
    }
}

commentCtrl.edit = async (req, res) => {
    handleValidationErrors(req, res)
    try {
        const body = req.body
        const taskId = req.query.id
        const task = await findOne({ "identifier.taskId": taskId })
        if (task.identifier.userId.toString() == req.user.id.toString()) {
            const comment = await Comment.findOneAndUpdate({ "identifier.taskId": taskId }, body, { new: true })
            res.status(200).json(comment)
        }else{
            res.status(500).json({errors: "Something went wrong"})
        }
    } catch (err) {
        res.status(500).json({ errors: 'Something went wrong' })
    }
}


module.exports = commentCtrl