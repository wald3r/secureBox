const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
var timestamps = require('mongoose-timestamp')

const mimetypeSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    ending: {
      type: String,
      required: true
    }
})

mimetypeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


mimetypeSchema.plugin(timestamps)
mimetypeSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Mimetype', mimetypeSchema)