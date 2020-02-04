const schedule = require('node-schedule')
const Public = require ('../models/public')
const logger = require('./logger')


/**
 * Delete all download links every midnight
 */
const clearPublicLinks = schedule.scheduleJob('* 59 23 * * *', async () => {
  const data = await Public.find({})
  data.filter( async e => {
    await Public.findByIdAndDelete(e._id)
    logger.cleanUpHandler(`File: ${e.file}`)
  })
})



module.exports = { clearPublicLinks }