const User = require('../models/user-model')
const _ = require('lodash')
const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken') 
const {validationResult} = require('express-validator')
const userCon = {} 

userCon.register = async (req, res) => { 

    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
       return res.status(404).json({errors : errors.array()})
    }
 try { 
    const body = _.pick(req.body , ['username' , 'email' , 'password']) 
    const user = new User(body) 
    const salt = await bcrypt.genSalt()
    const hashedPass = await bcrypt.hash(user.password , salt) 
    user.password = hashedPass 
    const info = await user.save() 
    res.json({message : 'user registered' , info})

 } catch (e) {
    res.status(500).json({error : 'something went wrong'})
 }
} 

userCon.login = async(req , res) => {

    try { 
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
        return res.status(404).json({errors : errors.array()})
        }
        const body = _.pick(req.body , ['email' , 'password']) 
        const user = await User.findOne({email : body.email}) 
        if(user) {
            if(await bcrypt.compare(body.password , user.password)) {
                const token = jwt.sign({
                    id: user._id
                }, process.env.JWT_SECRET) 
                res.json({ message : 'logged in' ,token : token})
            }else {
            res.json({error : 'invalid emai/password'})
        } 
         
        }  else {
            res.json('user not found')
        }
    } catch (e) {
        // res.status(500).json({error : 'email/password is incorrect'})
        res.json(e)
    }
}

userCon.getUsers = async(req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (e) {
        res.status(500).json({error : 'something went wrong'})
    }
} 

userCon.getUserById = async(req , res) => {
    
    try {
        const user = await User.findById(req.userId) 
        const userDoc = _.pick(user , ['_id' , 'username' , 'email'])
        res.json(userDoc)
    } catch(e) {
        res.json(e)
    }
}

module.exports = userCon


