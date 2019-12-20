const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

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



registrationSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Registration', registrationSchema)