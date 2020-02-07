/* eslint-disable no-undef */
const SimpleNodeLogger = require('simple-node-logger')

/**
 * Logger methods 
 */
const logLogins = (username, status) => {


  const opts = {
    logFilePath: process.env.NODE_ENV === 'pro' ? 'logfiles/production/login.log' : 'logfiles/development/login.log',
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
    logFilePath: process.env.NODE_ENV === 'pro' ? 'logfiles/production/registration.log' : 'logfiles/development/registration.log',
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
    logFilePath: process.env.NODE_ENV === 'pro' ? 'logfiles/production/validation.log' : 'logfiles/development/validation.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)

  log.setLevel('error')
  log.error('ValidationManager:', exception)
  return

}

const verification = (userid) => {
  
  const opts = {
    logFilePath: process.env.NODE_ENV === 'pro' ? 'logfiles/production/registration.log' : 'logfiles/development/registration.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)

  log.setLevel('info')
  log.info(`RegistrationsManager: User got activated ${userid}`)
  return

}

const verificationFailed = (exception) => {
  
  const opts = {
    logFilePath: process.env.NODE_ENV === 'pro' ? 'logfiles/production/registration.log' : 'logfiles/development/registration.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)

  log.setLevel('error')
  log.error(`RegistrationsManager: ${exception}`)
  return

}

const downloadFile = (filePath) => {
  
  const opts = {
    logFilePath: process.env.NODE_ENV === 'pro' ? 'logfiles/production/download.log' : 'logfiles/development/download.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)

  log.setLevel('info')
  log.info(`DownloadManager: ${filePath}`)
  return

}


const deleteFile = (filePath) => {
  
  const opts = {
    logFilePath: process.env.NODE_ENV === 'pro' ? 'logfiles/production/delete.log' : 'logfiles/development/delete.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)

  log.setLevel('info')
  log.info(`DeleteManager: ${filePath}`)
  return

}

const failedDeleteFile = (exception) => {
  
  const opts = {
    logFilePath: process.env.NODE_ENV === 'pro' ? 'logfiles/production/delete.log' : 'logfiles/development/delete.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)

  log.setLevel('error')
  log.error(`DeleteManager: ${exception}`)
  return

}


const uploadFile = (filePath) => {
  
  const opts = {
    logFilePath: process.env.NODE_ENV === 'pro' ? 'logfiles/production/upload.log' : 'logfiles/development/upload.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)

  log.setLevel('info')
  log.info(`UploadManager: ${filePath}`)
  return

}


const failedUploadFile = (message) => {
  
  const opts = {
    logFilePath: process.env.NODE_ENV === 'pro' ? 'logfiles/production/upload.log' : 'logfiles/development/upload.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)

  log.setLevel('error')
  log.error(`UploadManager: ${message}`)
  return

}

const cryptoError = (message) => {
  const opts = {
    logFilePath: process.env.NODE_ENV === 'pro' ? 'logfiles/production/crypto.log' : 'logfiles/development/crypto.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)

  log.setLevel('error')
  log.error(`CryptoManager: ${message}`)
  return

}

const errorHandler = (message) => {
  
  const opts = {
    logFilePath: process.env.NODE_ENV === 'pro' ? 'logfiles/production/handler.log' : 'logfiles/development/handler.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)

  log.setLevel('error')
  log.error(`ErrorHandler: ${message}`)
  return

}


const cleanUpHandler = (message) => {
  
  const opts = {
    logFilePath: process.env.NODE_ENV === 'pro' ? 'logfiles/production/cleanup.log' : 'logfiles/development/cleanup.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  }
  
  const log = SimpleNodeLogger.createSimpleLogger(opts)

  log.setLevel('info')
  log.info(`CleanUp Handler: ${message}`)
  return

}
module.exports = { cleanUpHandler, cryptoError, errorHandler, failedUploadFile, uploadFile, deleteFile, failedDeleteFile, downloadFile, logLogins, logRegistrations, validationError, verificationFailed, verification}