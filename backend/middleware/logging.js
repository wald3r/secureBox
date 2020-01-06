const SimpleNodeLogger = require('simple-node-logger')
const opts = {
  logFilePath:'logfiles/request.log',
   timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
}

const log = SimpleNodeLogger.createSimpleLogger(opts)


const logRequests = (request, response, next) => {

  log.setLevel('info')
  log.info('Method:', request.method)
  log.info('Path:', request.path)
  log.info('-----')
  next()
}


module.exports = { logRequests }