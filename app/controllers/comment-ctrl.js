const { validationResult } = require("express-validator")
const Comment = require("../models/comment-model")

const commentCtrl = {}

commentCtrl.create = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
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
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const taskId = req.query.id
        const comment = await Comment.find({ "identifier.taskId": taskId })
        res.status(200).json(comment)
    } catch (err) {
        res.status(500).json({ errors: 'Something went wrong' })
    }
}

commentCtrl.edit = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const body = req.body
        const commentId = req.query._id
        const comment = await Comment.findById(commentId)
        if (comment.identifier.userId.toString() == req.user.id.toString()) {
            const comment = await Comment.findByIdAndUpdate(commentId, body, { new: true })
            res.status(200).json(comment)
        } else {
            res.status(500).json({ errors: "Something went wrong" })
        }
    } catch (err) {
        res.status(500).json({ errors: 'Something went wrong' })
    }
}

commentCtrl.delete = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const commentId = req.query._id
        const comment = await Comment.findById(commentId)
        if (comment.identifier.userId.toString() == req.user.id.toString()) {
            const comment = await Comment.findByIdAndDelete(commentId)
            res.status(200).json(comment)
        }
    } catch (err) {
        res.status(500).json({ errors: 'Something went wrong' })
    }
}


module.exports = commentCtrl