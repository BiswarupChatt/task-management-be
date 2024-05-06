require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { checkSchema, validationResult } = require('express-validator')


const configureDB = require('./config/db')
const userCtrl = require('./app/controllers/user-ctrl')
const taskCtrl = require('./app/controllers/task-ctrl')

const { userRegisterValidation, userLoginValidations, userUpdateValidations } = require('./app/validations/user-validation')
const { taskValidations, taskStatusValidation } = require('./app/validations/task-validations')
const { commentValidation } = require('./app/validations/comment-validation')

const authenticateUser = require('./app/middlewares/authenticateUser')
const authorizeUser = require('./app/middlewares/authorizeUser')
const commentCtrl = require('./app/controllers/comment-ctrl')




// const emailCtrl = require('./app/controllers/email.ctrl')
// const { emailValidations } = require('./app/validations/email-validations')

const app = express()
const port = process.env.PORT

configureDB()
app.use(express.json())
app.use(morgan('common'))
app.use(cors())

//user crud operations
app.post('/users/register', checkSchema(userRegisterValidation), userCtrl.register)
app.post('/users/login', checkSchema(userLoginValidations), userCtrl.login)
app.get('/users/account', authenticateUser, userCtrl.account)

app.put('/users/update', authenticateUser, checkSchema(userUpdateValidations), userCtrl.update)
app.delete('/users/delete', authenticateUser, userCtrl.delete)

//tasks crud operations 
app.post('/task/create', authenticateUser, authorizeUser(["TeamLead"]), checkSchema(taskValidations), taskCtrl.create)
app.get('/tasks', authenticateUser, taskCtrl.getTasks)
app.put('/tasks/statusUpdate', authenticateUser, authorizeUser(["Employee"]), checkSchema(taskStatusValidation), taskCtrl.statusUpdate)
app.put('/tasks/update', authenticateUser, authorizeUser(["TeamLead"]), checkSchema(taskValidations), taskCtrl.update)
app.delete('/tasks/delete', authenticateUser, authorizeUser(["TeamLead"]), taskCtrl.delete)


//comment crud operation
app.post('/comment/create', authenticateUser, checkSchema(commentValidation), commentCtrl.create)
app.get('/comment/get' , authenticateUser, commentCtrl.get)



app.listen(port, () => {
    console.log(`server is running successfully on this url http://localhost:${port}`)
})