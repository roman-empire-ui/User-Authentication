const jwt = require('jsonwebtoken') 
const authUser = async (req , res , next) => {
    try {
    const token = req.headers['authorization'] 
    const tokenData = await jwt.verify( token ,process.env.JWT_SECRET)
    req.userId = tokenData.id
    } catch (e) {
        res.status(400).json({error : 'something went wrong'})
    }
    
} 

module.exports = authUser