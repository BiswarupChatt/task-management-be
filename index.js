require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { checkSchema } = require('express-validator')


const configureDB = require('./config/db')
const userCtrl = require('./app/controllers/user-ctrl')
const { userRegisterValidation, userLoginValidations } = require('./app/validations/user-validation')
const {taskValidations} = require('./app/validations/task-validations')
const authenticateUser = require('./app/middlewares/authenticateUser')

const taskCtrl = require('./app/controllers/task-ctrl')

const app = express()
const port = process.env.PORT
 
configureDB()
app.use(express.json())
app.use(morgan('common'))
app.use(cors())


app.post('/users/register', checkSchema(userRegisterValidation), userCtrl.register)
app.post('/users/login', checkSchema(userLoginValidations),  userCtrl.login)
app.get('/users/account', authenticateUser, userCtrl.account)

app.post('/tasks/create',checkSchema(taskValidations),taskCtrl.create)
app.get('/tasks',taskCtrl.getTasks)
app.put('/tasks/:id',checkSchema(taskValidations),taskCtrl.update)
app.delete('/tasks/:id',taskCtrl.delete)




app.listen(port, () => {
    console.log(`server is running successfully on this url http://localhost:${port}`)
})