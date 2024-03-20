require('dotenv').config() 
const express = require('express') 
const cors = require('cors')
const app = express() 
const configureDB = require('./config/db')
const userCon = require('./app/components/userCon') 
const {checkSchema} = require('express-validator')
const {userRegi , userLogin} = require('./app/helpers/user-validations')
const authUser = require('./app/middlewares/auth')
app.use(express.json()) 
app.use(cors()) 
const PORT = 3400 
configureDB() 

app.post('/api/user/register' , checkSchema(userRegi),  userCon.register)
app.post('/api/user/login' , checkSchema(userLogin), userCon.login)
app.get('/api/getUsers' , userCon.getUsers)
app.get('/api/userById' , userCon.getUserById)


app.listen (PORT , () => {
    console.log('server is running on port' , PORT)
})