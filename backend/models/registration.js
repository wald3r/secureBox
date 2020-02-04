const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
var timestamps = require('mongoose-timestamp')

/**
 * Schema to store activation links
 */
const registrationSchema = mongoose.Schema({
    userid: {
            type: Object,
            required: true
    },
    hash: {
      type: String,
      required: true
    }
})


registrationSchema.plugin(timestamps)
registrationSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Registration', registrationSchema)