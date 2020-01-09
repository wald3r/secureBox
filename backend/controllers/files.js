const filesRouter = require('express').Router()
const authenticationHelper = require('../utils/authenticationHelper')
const File = require ('../models/file')
const fs = require('fs');
const config = require('../utils/config')
const nameCreation = require('../utils/nameCreation')
const cryptoHelper = require('../utils/cryptoHelper')
const logger = require('../utils/logger')


filesRouter.get('/', async (request, response, next) => {

  try {

    const user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }
    const files = await File.find({ user: user.id }).populate('user')
    return response.status(200).json(files)
  }catch(exception){
    next(exception)
  }
})


filesRouter.get('/download/:id', async(request, response, next) => {
  try{
    const user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }
    const fileDb = await File.findById(request.params.id)
    const filePath = `${fileDb.path}/${fileDb.name}`
    
    const readStream = cryptoHelper.decrypt('test', `${config.FILE_DIR}${filePath}.enc`)
    readStream.on('close', async () => {
      await response.sendFile(filePath , { root : config.FILE_DIR})
    }) 
    logger.downloadFile(filePath)
  }
  catch(exception){
    next(exception)
  }
})


filesRouter.delete('/dremove/:id', async(request, response, next) => {
  
  const user = await authenticationHelper.isLoggedIn(request.token)
  if(user == undefined){
    return response.status(401).send('Not Authenticated')
  }

  const fileDb = await File.findById(request.params.id)
  const filePath = `${fileDb.path}/${fileDb.name}`
  try{
      fs.unlink(`${config.FILE_DIR}${filePath}`, (err) => {
        if(err) throw logger.failedDeleteFile(err.message)
     })
  } catch(exception) {
      logger.failedDeleteFile(exception.message)
      next(exception)
  }


})


filesRouter.delete('/eremove/:id', async(request, response, next) => {

  const user = await authenticationHelper.isLoggedIn(request.token)
  if(user == undefined){
    return response.status(401).send('Not Authenticated')
  }

  const fileDb = await File.findById(request.params.id)
  const filePath = `${fileDb.path}/${fileDb.name}.enc`

  fs.exists(filePath, async (exists) => {
    if (exists) {
      try{
        fs.unlinkSync(filePath)
        await File.findByIdAndDelete(request.params.id)
        response.status(200).send('File removed')
        logger.deleteFile(filePath)
      } catch(exception) {
        logger.failedDeleteFile(exception.message)
        next(exception)
      }
    } else {
      response.status(404).send('File does not exist')
    }
  })
})

filesRouter.post('/upload', async (request, response, next) => {

  const user = await authenticationHelper.isLoggedIn(request.token)
  if(user == undefined){
    return response.status(401).send('Not Authenticated')
  }
  if (!request.files || Object.keys(request.files).length === 0) {
    return response.status(400).send('No files were uploaded.')
  }

  try{
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
      const splitName = file.name.split('_')
      const fileName = nameCreation.createDocumentName(splitName[3], files.length === 1 ? '' : splitName[0] ,file.mimetype, path)
      const newFile = new File ({
        name: fileName,
        path: path,
        mimetype: file.mimetype,
        size: file.size,
        user: user._id,
        category: splitName[1],
        date: splitName[2]  
      })
      const savedFile = await newFile.save()
      file.mv(`${path}/${fileName}`, err => {
        if (err){
          logger.failedUploadFile(err.message)
          return response.status(500).send(err)}
    
    
      })
      if(fs.existsSync(`${config.FILE_DIR}${path}/${fileName}`)){
        console.log('start encrypting', fileName)
        cryptoHelper.encrypt('test', `${config.FILE_DIR}${path}/${fileName}`)
        logger.uploadFile(`${config.FILE_DIR}${path}/${fileName}`)
      }
      else{
        console.error('problem')
      }
    })

    response.status(200).send('Files uploaded')
  }catch(exception){
    next(exception)
  }
})


module.exports = filesRouter