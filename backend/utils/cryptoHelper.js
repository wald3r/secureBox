const crypto = require('crypto')
const AppendInitVect = require('./AppendInitVect')
const fs = require('fs');


const encrypt = (password, pathToObject) => {


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
}



const decrypt = (password, pathToObject) => {


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
}



const getCipherKey = (password) => crypto.createHash('sha256').update(password).digest();


module.exports = { encrypt, decrypt }