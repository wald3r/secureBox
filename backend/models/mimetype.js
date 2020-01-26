const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
var timestamps = require('mongoose-timestamp')

const mimetypeSchema = mongoose.Schema({
    mime: {
      type: String,
      required: true
    },
    ending: {
      type: String,
      required: true
    }
})


mimetypeSchema.plugin(timestamps)
mimetypeSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Mimetype', mimetypeSchema)