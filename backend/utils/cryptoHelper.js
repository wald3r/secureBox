const crypto = require('crypto')
const AppendInitVect = require('./AppendInitVect')
const fs = require('fs');
const logger = require('./logger')


/**
 * create a random hash to use it for activation links and public download links
 */
const createRandomHash = () => {

  const current_date = (new Date()).valueOf().toString()
  const random = Math.random().toString()
  return crypto.createHash('sha1').update(current_date + random).digest('hex')
}

/**
 * Cryptography method to encrypt file
 * @param {*} password 
 * @param {*} pathToObject 
 */
const encrypt = (password, pathToObject) => {
    try{
      const readStream = fs.createReadStream(pathToObject)
      const key = getCipherKey(password)
      const iv = crypto.randomBytes(16)

      const cipher = crypto.createCipheriv('aes256', key, iv)
      const appendInitVector = new AppendInitVect(iv)
      const writeStream = fs.createWriteStream(pathToObject + '.enc')

      readStream.pipe(cipher)
        .pipe(appendInitVector)
        .pipe(writeStream)

      fs.unlinkSync(pathToObject)
    }catch(error){
      logger.cryptoError(error.message)
    }
}


/**
 * Cryptography method to decrypt file
 * @param {*} password 
 * @param {*} pathToObject 
 */
const decrypt = (password, pathToObject) => {

  try{
    const readStream = fs.createReadStream(pathToObject, { start: 16 })
    const readInitVect = fs.createReadStream(pathToObject, { end: 15 })
    let initVect
    readInitVect.on('data', (chunk) => {
      initVect = chunk
    })

    readInitVect.on('close', () => {
      const cipherKey = getCipherKey(password)
      const decipher = crypto.createDecipheriv('aes256', cipherKey, initVect)
      const writeStream = fs.createWriteStream(pathToObject.replace('.enc', ''))
      readStream
        .pipe(decipher)
        .pipe(writeStream)
      
    })

    return readStream
  }catch(error){
    logger.cryptoError(error.message)
  }
}


/**
 * Create hash key to secure files
 * @param {*} password 
 */
const getCipherKey = (password) => crypto.createHash('sha256').update(password).digest();


module.exports = { encrypt, decrypt, createRandomHash }