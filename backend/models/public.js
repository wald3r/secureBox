const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
var timestamps = require('mongoose-timestamp')


/**
 * Schema to store links to make files public
 */
const publicSchema = mongoose.Schema({
    
    file: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File'
    },
    hash: {
      type: String,
      required: true,
    },
   
})

publicSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})



publicSchema.plugin(uniqueValidator)
publicSchema.plugin(timestamps)
module.exports = mongoose.model('Public', publicSchema)