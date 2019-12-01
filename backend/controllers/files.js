const filesRouter = require('express').Router()
const authenticationHelper = require('../utils/authenticationHelper')
const File = require ('../models/file')
const fs = require('fs');
const config = require('../utils/config')
const nameCreation = require('../utils/nameCreation')
const crypto = require('crypto')
const hash = crypto.createHash('sha256');
const test = require('path');
const AppendInitVect = require('../utils/AppendInitVect')
const password = 'Password used to generate key'
const algorithm = 'aes-256-cbc'


filesRouter.get('/', async (request, response, next) => {

  try {

    const user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(400).send('Not Authenticated')
    }
    const files = await File.find({ user: user.id }).populate('user')
    return response.status(200).json(files)
  }catch(exception){
    next(exception)
  }
})


filesRouter.get('/download/:id', async(request, response) => {

  const user = await authenticationHelper.isLoggedIn(request.token)
  if(user == undefined){
    return response.status(400).send('Not Authenticated')
  }
  const fileDb = await File.findById(request.params.id)
  const filePath = `${fileDb.path}/${fileDb.name}`
  
  const readStream = fs.createReadStream(`${config.FILE_DIR}${filePath}.enc`, { start: 16 })
  const readInitVect = fs.createReadStream(`${config.FILE_DIR}${filePath}.enc`, { end: 15 })
  let initVect
  readInitVect.on('data', (chunk) => {
    initVect = chunk
  })
  readInitVect.on('close', () => {
    const cipherKey = getCipherKey(password)
    const decipher = crypto.createDecipheriv('aes256', cipherKey, initVect)
    const writeStream = fs.createWriteStream(`${config.FILE_DIR}${filePath}.enc`.replace('.enc', ''))
    readStream
      .pipe(decipher)
      .pipe(writeStream)
    
  })

  await readStream.on('close', async () => {
    await response.sendFile(filePath , { root : config.FILE_DIR});

  })
  console.log(`${config.FILE_DIR}${filePath}`)
  fs.unlinkSync(`${config.FILE_DIR}${filePath}`)

})

filesRouter.delete('/remove/:id', async(request, response) => {

  const user = await authenticationHelper.isLoggedIn(request.token)
  if(user == undefined){
    return response.status(400).send('Not Authenticated')
  }

  const fileDb = await File.findById(request.params.id)
  const filePath = `${fileDb.path}/${fileDb.name}`

  fs.exists(filePath, async (exists) => {
    if (exists) {
      try{
        fs.unlinkSync(filePath)
        await File.findByIdAndDelete(request.params.id)
        response.status(200).send('File removed')
      } catch(exception) {
        console.error(`File Removal Helper: ${exception.message}`)
      }
    } else {
      response.status(404).send('File does not exist')
    }
  });
})

filesRouter.post('/upload', async (request, response) => {

  const user = await authenticationHelper.isLoggedIn(request.token)
  if(user == undefined){
    return response.status(400).send('Not Authenticated')
  }
  if (!request.files || Object.keys(request.files).length === 0) {
    return response.status(400).send('No files were uploaded.')
  }

  const path = `files/${user.username}`

  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
  } 
  
  let files = []
  if(request.files.file.length === undefined){
    files = files.concat(request.files.file)
  }else{
    files = request.files.file
  }

  await files.map(async file => {  
    const fileName = nameCreation.createDocumentName(file.name, file.mimetype)
    const newFile = new File ({
      name: fileName,
      path: path,
      mimetype: file.mimetype,
      size: file.size,
      user: user._id
      
    })

    const savedFile = await newFile.save()
      
    file.mv(`${path}/${fileName}`, err => {
      if (err){
         console.log(`File Post Helper: ${err.message}`)
         return response.status(500).send(err)}
  
  
    })
    console.log(`${config.FILE_DIR}${path}/${fileName}`)
    
    const readStream = fs.createReadStream(`${config.FILE_DIR}${path}/${fileName}`)
    const key = getCipherKey(password)
    const iv = crypto.randomBytes(16)
    


    const cipher = crypto.createCipheriv('aes256', key, iv)
    const appendInitVector = new AppendInitVect(iv)
    const writeStream = fs.createWriteStream(`${config.FILE_DIR}${path}/${fileName}` + '.enc')

    readStream.pipe(cipher)
              .pipe(appendInitVector)
              .pipe(writeStream)

    fs.unlinkSync(`${config.FILE_DIR}${path}/${fileName}`)
  })



  response.status(200).send('Files uploaded')
   
})

function getCipherKey(password) {
  return crypto.createHash('sha256').update(password).digest();
}

module.exports = filesRouter