const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const roleManagement = require('../utils/roleManagement')
var timestamps = require('mongoose-timestamp');


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
    },
    role: {
        type: String,
        default: roleManagement.roles.USER
    }
})


userSchema.plugin(timestamps)
userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema)