const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

/**
 * Schema to files in the database
 */
const fileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  path: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  counter: {
    type: Number,
    default: 0
  },
  password: {
    type: String,
  }
})

fileSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})



fileSchema.plugin(uniqueValidator)
module.exports = mongoose.model('File', fileSchema)