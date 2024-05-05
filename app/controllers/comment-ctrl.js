const{validationResult} = require("express-validator")
const Comment = require("../models/comment-model")

const commentCtrl = {}

const handleValidationErrors = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
  }


  commentCtrl.create = async (req, res)=>{
    handleValidationErrors(req, res)
    try{
        const body = req.body
        const comment = new Comment(body)
        comment.identifier.userId = req.user.id
        comment.identifier.taskId = req.query.id
        await comment.save()
        res.status(200).json(comment)
    }catch(err){
        res.status(500).json({ errors: 'Something went wrong' })
    }
  }


  module.exports = commentCtrl