const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    username: {
            type: String,
            unique: true,
            required: true,
            minlength: 3,
    },
    name: String,
    password: {
        type: String,
        required: true,
        minlength: 1,
    },
    email: { 
        type: String, 
        required: true 
    },   
    active: {
        type: Boolean,
        default: false
    }
})



userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema)