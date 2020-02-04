const logger = require('../utils/logger')

/**
 * Middleware to deal with errors
 * 
 * @param {*} error 
 * @param {*} request 
 * @param {*} response 
 */
const errorHandler = (error, request, response) => {

  if(error.name === 'ValidationError'){
    logger.validationError(error.message)
    response.status(500).send(error.message)
  }

  if(error.name === 'CastError'){
    logger.validationError(error.message)
    response.status(500).send(error.message)
  }

  
  logger.errorHandler(error.message)
  //response.status(500).send(error.message)

}


module.exports = errorHandler