const User = require('../models/user-model')
const usernameSchema = {
    notEmpty : {
        errorMessage : 'name connot be empty'
    },

    isLength :{
       options : {min : 3},
       errorMessage : 'username should be greater than 3 characters'
    }
}  

const loginEmailSchema = {
    notEmpty : {
        errorMessage : 'Email cannot be empty'
    },
    isEmail : {
        errorMessage : 'Invalid Email'
    }
}

const emailSchema = {
    notEmpty : {
        errorMessage : 'Email cannot be empty'
    }, 

    isEmail : {
        errorMessage : 'invalid email'
    } ,

    custom : {
        options :  async (value) => {
            const user = await User.findOne({email : value}) 
            if(!user) {
                return true
            } else {
                throw new Error('This email already exists')
            }
        }
            
       
    }

}  


const passwordSchema = {
   isLength: {
    options : {min : 8 , max : 128}
   },
   errorMessage: 'password should be 8 to 128 characters long'
} 


const userRegi = {
username :usernameSchema,
email : emailSchema,
password : passwordSchema
} 

const userLogin = {
    email : loginEmailSchema,
    password : passwordSchema
} 

module.exports = {userRegi , userLogin}