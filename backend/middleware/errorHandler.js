const logger = require('../utils/logger')

const errorHandler = (error, request, response, next) => {



  if(error.name === 'ValidationError'){
    logger.validationError(error.message)
    response.status(500).send(error.message)
  }

  
  logger.errorHandler(error.message)
  response.status(500).send(error.message)
  

  next()
}


module.exports = errorHandler