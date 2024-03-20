const mongoose = require('mongoose') 
const configureDB = async () => {
    const url = process.env.DB_URL 
    const name = process.env.DB_NAME
    try {
        await mongoose.connect (`${url}/${name}`)
        console.log('connected to db')
    } catch (e) {
        console.log('error connecting to db' , e)
    }
} 

module.exports = configureDB