const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
var timestamps = require('mongoose-timestamp')

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


noteSchema.plugin(timestamps)
noteSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Note', noteSchema)