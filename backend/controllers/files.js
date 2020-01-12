const filesRouter = require('express').Router()
const authenticationHelper = require('../utils/authenticationHelper')
const File = require ('../models/file')
const fs = require('fs');
const nameCreation = require('../utils/nameCreation')
const cryptoHelper = require('../utils/cryptoHelper')
const logger = require('../utils/logger')
const helperFunctions = require ('../utils/helperFunctions')

filesRouter.get('/', async (request, response, next) => {

  try {

    const user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }
    const files = await File.find({ user: user._id }).populate('user')
    return response.status(200).json(files.map(file => file.toJSON()))
  }catch(exception){
    next(exception)
  }
})

filesRouter.get('/favourites/:id', async (request, response, next) => {

  try {
    const user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }
    const files = await File.find({ user: user._id}).sort([['counter', -1]]).limit(5).populate('user')
    console.log(files)
    const usedFiles = files.filter(file => file.counter > 0)
    console.log(usedFiles)
    return response.status(200).json(usedFiles.map(file => file.toJSON()))
  }catch(exception){
    next(exception)
  }
})

filesRouter.get('/documents/', async (request, response, next) => {

  try {
    const user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }
    const files = await File.find({ user: user._id, category: 'Document' })
    return response.status(200).json(files.map(file => file.toJSON()))
  }catch(exception){
    next(exception)
  }
})


filesRouter.get('/pictures/', async (request, response, next) => {

  try {

    const user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }
    const files = await File.find({ user: user._id, category: 'Picture' }).populate('user')
    return response.status(200).json(files.map(file => file.toJSON()))
  }catch(exception){
    next(exception)
  }
})



filesRouter.get('/download/:id', async(request, response, next) => {
  try{
    var user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }
    const fileDb = await File.findById(request.params.id)
    const filePath = `${fileDb.path}/${fileDb.name}`
    const readStream = cryptoHelper.decrypt('test', `${helperFunctions.getDir(__dirname)}${filePath}.enc`)
    readStream.on('close', async () => {
      await response.sendFile(filePath , { root : helperFunctions.getDir(__dirname)})
    }) 
    logger.downloadFile(filePath)

    const modifiedUser = helperFunctions.modifyLastUsed(user, fileDb)
    await modifiedUser.save()
    fileDb.counter += 1
    await fileDb.save()
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
      fs.unlink(`${helperFunctions.getDir(__dirname)}${filePath}`, (err) => {
        if(err) throw logger.failedDeleteFile(err.message)
     })
  } catch(exception) {
      logger.failedDeleteFile(exception.message)
      next(exception)
  }


})


filesRouter.delete('/eremove/:id', async(request, response, next) => {

  var user = await authenticationHelper.isLoggedIn(request.token)
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
        const modifiedUser = helperFunctions.removeLastUsed(user, fileDb)
        await modifiedUser.save()
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
      const splitName = file.name.split('__')
      const fileName = nameCreation.createDocumentName(user.username, splitName[4], splitName[2], splitName[3], files.length === 1 ? '' : splitName[1] ,file.mimetype, path)
      const newFile = new File ({
        name: fileName,
        path: path,
        mimetype: file.mimetype,
        size: file.size,
        user: user._id,
        category: splitName[2],
        date: splitName[3]  
      })
      const savedFile = await newFile.save()
      file.mv(`${path}/${fileName}`, err => {
        if (err){
          logger.failedUploadFile(err.message)
          return response.status(500).send(err)}
      })

      for(let a = 0; a < 10; a++){
        if(fs.existsSync(`${helperFunctions.getDir(__dirname)}${path}/${fileName}`)){
          console.log('start encrypting', fileName)
          cryptoHelper.encrypt('test', `${helperFunctions.getDir(__dirname)}${path}/${fileName}`)
          logger.uploadFile(`${helperFunctions.getDir(__dirname)}${path}/${fileName}`)
          break
        }
        else{
          await helperFunctions.sleep(1000)
        }
      }
    })

    response.status(200).send('Files uploaded')
  }catch(exception){
    next(exception)
  }
})


module.exports = filesRouter