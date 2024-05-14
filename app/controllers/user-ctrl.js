const User = require('../models/user-model')
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {sendRegistrationEmail} = require("../utility/nodemailer")
const _ = require("lodash")

const userCtrl = {}

userCtrl.register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body
    try {
        const salt = await bcryptjs.genSalt()
        const hashPassword = await bcryptjs.hash(body.password, salt)
        const user = new User(body)
        user.password = hashPassword
        await user.save()
        const newUser = await User.findOne({email: req.body.email})
        if(newUser){
            sendRegistrationEmail(newUser.email, newUser.firstName)
        }else{
            return res.status(400).json({errors: 'New user not found'})
        }
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json({ errors: 'Something went wrong' })
    }
}


userCtrl.login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body
    try {
        const user = await User.findOne({ email: body.email })
        if (user) {
            const isAuth = await bcryptjs.compare(body.password, user.password)
            if (isAuth) {
                const tokenData = {
                    id: user._id,
                    role: user.role
                }
                const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
                res.json({ token: token })
            } else {
                return res.status(404).json({ errors: 'Invalid credentials' })
            }
        } else {
            return res.status(404).json({ errors: 'Invalid credentials' })
        }
    } catch (err) {
        res.status(500).json({ errors: 'Something went wrong' })
    }
}

userCtrl.account = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        return res.json(user)
    } catch (err) {
        return res.status(500).json({ errors: 'Something went wrong' })
    }
}

userCtrl.update = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const body = req.body
        const user = await User.findByIdAndUpdate(req.user.id, body, { new: true })
        return res.json(_.pick(user, ['firstName', 'lastName', 'email']))
    } catch (err) {
        res.status(500).json({ errors: 'Something went wrong' })
    }
}

userCtrl.delete = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await User.findByIdAndDelete(req.user.id)
        return res.json('User Deleted Successfully')
    } catch (err) {
        res.status(500).json({ errors: 'Something went wrong' })
    }
}


module.exports = userCtrl