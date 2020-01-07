const SimpleNodeLogger = require('simple-node-logger')

const logLogins = (username, status) => {


  const opts = {
    logFilePath:'logfiles/login.log',
     timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)
  
  if(Number(status) === 0){
    log.setLevel('info')
    log.info('LoginManager: Trying to login ', username)
    return
  }
  if(Number(status) === 1){
    log.setLevel('warn')
    log.warn('LoginManager: Failed to login ', username)
    return
  }
  if(Number(status) === 2){
    log.setLevel('info')
    log.info('LoginManager: Logged in ', username)
    return
  }
}


const logRegistrations = (user, hash, status) => {
  
  const opts = {
    logFilePath:'logfiles/registration.log',
     timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)
  if(Number(status) === 0){
    log.setLevel('info')
    log.info(`RegistrationsManager: Registered id: ${user._id} user: ${user.username}, email: ${user.email}`)
  }
  if(Number(status) === 1){
    log.setLevel('info')
    log.info(`RegistrationsManager: Activation link created hash: ${hash.hash}, user: ${hash.userid}`)
  }
  if(Number(status) === 2){
    log.setLevel('info')
    log.info('RegistrationsManager: Mail for activation sent')
  }
  return

}

const validationError = (exception) => {
  
  const opts = {
    logFilePath:'logfiles/validation.log',
     timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)

  log.setLevel('error')
  log.error('ValidationManager:', exception)
  return

}

const verification = (userid) => {
  
  const opts = {
    logFilePath:'logfiles/registration.log',
     timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)

  log.setLevel('info')
  log.info(`RegistrationsManager: User got activated ${userid}`)
  return

}

const verificationFailed = (exception) => {
  
  const opts = {
    logFilePath:'logfiles/registration.log',
     timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)

  log.setLevel('error')
  log.error(`RegistrationsManager: ${exception}`)
  return

}

const downloadFile = (filePath) => {
  
  const opts = {
    logFilePath:'logfiles/download.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)

  log.setLevel('info')
  log.info(`DownloadManager: ${filePath}`)
  return

}


const deleteFile = (filePath) => {
  
  const opts = {
    logFilePath:'logfiles/delete.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)

  log.setLevel('info')
  log.info(`DeleteManager: ${filePath}`)
  return

}

const failedDeleteFile = (exception) => {
  
  const opts = {
    logFilePath:'logfiles/delete.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)

  log.setLevel('error')
  log.error(`DeleteManager: ${exception}`)
  return

}


const uploadFile = (filePath) => {
  
  const opts = {
    logFilePath:'logfiles/upload.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)

  log.setLevel('info')
  log.info(`UploadManager: ${filePath}`)
  return

}


const failedUploadFile = (message) => {
  
  const opts = {
    logFilePath:'logfiles/upload.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)

  log.setLevel('error')
  log.error(`UploadManager: ${message}`)
  return

}


const errorHandler = (message) => {
  
  const opts = {
    logFilePath:'logfiles/handler.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)

  log.setLevel('error')
  log.error(`ErrorHandler: ${message}`)
  return

}
module.exports = { errorHandler, failedUploadFile, uploadFile, deleteFile, failedDeleteFile, downloadFile, logLogins, logRegistrations, validationError, verificationFailed, verification}