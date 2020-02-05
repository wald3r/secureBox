const filesRouter = require('express').Router()
const authenticationHelper = require('../utils/authenticationHelper')
const File = require ('../models/file')
const Public = require ('../models/public')
const fs = require('fs');
const nameCreation = require('../utils/nameCreation')
const cryptoHelper = require('../utils/cryptoHelper')
const logger = require('../utils/logger')
const helperFunctions = require ('../utils/helperFunctions')
const nodemailer = require('../utils/nodemailer')
const bcrypt = require('bcrypt')


/**
 * Get all files from a certain user
 */
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

/**
 * Get top 5 favourite files from a certain user
 */
filesRouter.get('/favourites/:id', async (request, response, next) => {

  try {
    const user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }
    const files = await File.find({ user: user._id}).sort([['counter', -1]]).limit(5).populate('user')
    const usedFiles = files.filter(file => file.counter > 0)
    return response.status(200).json(usedFiles.map(file => file.toJSON()))
  }catch(exception){
    next(exception)
  }
})


/**
 * Get all uploaded documents from a certain user
 */
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


/**
 * Get all uploaded pictures from a certain user
 */
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

/**
 * Get all uploaded music from a certain user
 */
filesRouter.get('/music/', async (request, response, next) => {

  try {

    const user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }
    const files = await File.find({ user: user._id, category: 'Music' }).populate('user')
    return response.status(200).json(files.map(file => file.toJSON()))
  }catch(exception){
    next(exception)
  }
})

/**
 * Download an encrypted file
 */
filesRouter.post('/download/encrypted/:id', async(request, response, next) => {
  try{
    var user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }
   
    const fileDb = await File.findById(request.params.id)
    if(!(await helperFunctions.comparePassword(fileDb, request.body.password))){
      return response.status(401).send('Wrong password')
    }

    const filePath = `${fileDb.path}/${fileDb.name}`
    const readStream = cryptoHelper.decrypt(request.body.password, `${helperFunctions.getDir(__dirname)}${filePath}.enc`)
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

/**
 * Download a file
 */
filesRouter.get('/download/:id', async(request, response, next) => {
  try{
    var user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }
   
    const fileDb = await File.findById(request.params.id)
    const filePath = `${fileDb.path}/${fileDb.name}`
    await response.sendFile(filePath , { root : helperFunctions.getDir(__dirname)})
    
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


/**
 * Download a file, which was made available for the public
 */
filesRouter.get('/download/public/:id', async(request, response, next) => {
  try{
    const publicLink = await Public.find({hash: request.params.id})
    if(publicLink[0] === undefined){
      return response.status(500).send('Does not exist')
    }
    const fileDb = await File.findById(publicLink[0].file)
    const filePath = `${fileDb.path}/${fileDb.name}`
 
    await response.sendFile(filePath , { root : helperFunctions.getDir(__dirname)})
    logger.downloadFile(filePath)
    await Public.findByIdAndDelete(publicLink[0]._id)
  }
  catch(exception){
    next(exception)
  }
})

/**
 * Make a file available for the public
 */
filesRouter.get('/public/:id', async(request, response, next) => {
  try{
    var user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }
    const fileDb = await File.findById(request.params.id)

    const newPublicLink = new Public({
      file: fileDb._id,
      hash: cryptoHelper.createRandomHash()
    })

    await newPublicLink.save()

    return response.status(200).json(newPublicLink.toJSON())
  }
  catch(exception){
    next(exception)
  }
})

/**
 * Make a file public and send an email out to a given recipient
 */
filesRouter.post('/public/mail/:id', async(request, response, next) => {
  try{
    var user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }
    const fileDb = await File.findById(request.params.id)
    const body = request.body

    const newPublicLink = new Public({
      file: fileDb._id,
      hash: cryptoHelper.createRandomHash()
    })

    await newPublicLink.save()
    nodemailer.sendDownloadLink(body.mail, newPublicLink.hash)

    return response.status(200).json(newPublicLink.toJSON())
  }
  catch(exception){
    next(exception)
  }
})

/**
 * Remove a decrypted file
 */
filesRouter.delete('/dremove/:id', async(request, response, next) => {
  
  const user = await authenticationHelper.isLoggedIn(request.token)
  if(user == undefined){
    return response.status(401).send('Not Authenticated')
  }
  const fileDb = await File.findById(request.params.id)
  const filePath = `${fileDb.path}/${fileDb.name}`
  try{
      await File.findByIdAndDelete(request.params.id)
      fs.unlinkSync(`${helperFunctions.getDir(__dirname)}${filePath}`)
      response.status(200).send('File removed')

  } catch(exception) {
      logger.failedDeleteFile(exception.message)
      next(exception)
  }

})
/**
 * Delete the file after it got decrypted for download
 */
filesRouter.delete('/remove/:id', async(request, response, next) => {
  
  const user = await authenticationHelper.isLoggedIn(request.token)
  if(user == undefined){
    return response.status(401).send('Not Authenticated')
  }
  const fileDb = await File.findById(request.params.id)
  const filePath = `${fileDb.path}/${fileDb.name}`
  try{
      fs.unlinkSync(`${helperFunctions.getDir(__dirname)}${filePath}`)
  } catch(exception) {
      logger.failedDeleteFile(exception.message)
      next(exception)
  }


})

/**
 * Remove an encrypted File
 */
filesRouter.delete('/eremove/:id', async(request, response, next) => {
  try{
    var user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }

    const fileDb = await File.findById(request.params.id)
    const filePath = `${fileDb.path}/${fileDb.name}.enc`

    await File.findByIdAndDelete(request.params.id)
    const modifiedUser = helperFunctions.removeLastUsed(user, fileDb)
    await modifiedUser.save()

    fs.exists(filePath, async (exists) => {
      try{      
        if (exists) {
          fs.unlinkSync(filePath)
          response.status(200).send('File removed')
          logger.deleteFile(filePath)
        } else {
          response.status(404).send('File does not exist')
        }
      }catch(exception){
        next(exception)
      }
    })
  } catch(exception) {
    logger.failedDeleteFile(exception.message)
    next(exception)
  }
})


/**
 * Upload Files and save them
 */
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

    var allSavedFiles = []

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
      const fileName = await nameCreation.createDocumentName(user.username, splitName[4], splitName[2], splitName[3], files.length === 1 ? '' : splitName[1] ,file.mimetype, path)
      allSavedFiles = allSavedFiles.concat(fileName)
      const newFile = new File ({
        name: fileName,
        path: path,
        mimetype: file.mimetype,
        size: file.size,
        user: user._id,
        category: splitName[2],
        date: splitName[3]  
      })
      await newFile.save()
      file.mv(`${path}/${fileName}`, err => {
        if (err){
          logger.failedUploadFile(err.message)
          return response.status(500).send(err)}
      })
      logger.uploadFile(`${helperFunctions.getDir(__dirname)}${path}/${fileName}`)

    })
    response.status(200).json(allSavedFiles)
  }catch(exception){
    next(exception)
  }
})


/**
 * Encrypt a file
 */
filesRouter.post('/encrypt/', async (request, response, next) => {
  try{
    const user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }

    const path = `files/${user.username}`
    const file = request.body.file
    const salt = 10
    
    const passwordHash = await bcrypt.hash(request.body.password, salt)
    const savedFile = await File.find({ name: file })
    savedFile[0].password = passwordHash

    for(let a = 0; a < 10; a++){
      if(fs.existsSync(`${helperFunctions.getDir(__dirname)}${path}/${savedFile[0].name}`)){
        cryptoHelper.encrypt(request.body.password, `${helperFunctions.getDir(__dirname)}${path}/${savedFile[0].name}`)
        break
      }
      else{
        await helperFunctions.sleep(1000)
      }
    }
    const saved = await savedFile[0].save()
   
    response.status(200).json(saved.toJSON())
  }catch(exception){
    next(exception)
  }

})

/**
 * Decrypt a file
 */
filesRouter.post('/decrypt/', async (request, response, next) => {
  try{
    const user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }

    const path = `files/${user.username}`
    const file = request.body.file

    
    var fileDb = await File.find({ name: file })
    if(!(await helperFunctions.comparePassword(fileDb[0], request.body.password))){
      return response.status(401).send('Wrong password')
    }

    const filePath = `${fileDb[0].path}/${fileDb[0].name}`
    if(fs.existsSync(`${helperFunctions.getDir(__dirname)}${path}/${fileDb[0].name}.enc`)){
      cryptoHelper.decrypt(request.body.password, `${helperFunctions.getDir(__dirname)}${filePath}.enc`)
      fs.unlinkSync(`${helperFunctions.getDir(__dirname)}${filePath}.enc`)
    }
    fileDb[0].password = undefined
      
    await fileDb[0].save()

    response.status(200).json(fileDb[0].toJSON())
  }catch(exception){
    next(exception)
  }

})


module.exports = filesRouter