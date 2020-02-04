const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const roleManagement = require('../utils/roleManagement')
var timestamps = require('mongoose-timestamp');

/**
 * Schema to store users
 */
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
    },
    lastUsed: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'File'
        }
    ]
})



userSchema.plugin(timestamps)
userSchema.plugin(uniqueValidator)
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  
module.exports = mongoose.model('User', userSchema)