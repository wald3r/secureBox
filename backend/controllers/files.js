const filesRouter = require('express').Router()
const authenticationHelper = require('../utils/authenticationHelper')
const File = require ('../models/file')
const fs = require('fs');
const config = require('../utils/config')
const nameCreation = require('../utils/nameCreation')
const cryptoHelper = require('../utils/cryptoHelper')

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
  
  const readStream = cryptoHelper.decrypt('test', `${config.FILE_DIR}${filePath}.enc`)
  readStream.on('close', async () => {
    await response.sendFile(filePath , { root : config.FILE_DIR})
  }) 
  
})


filesRouter.delete('/dremove/:id', async(request, response) => {
  const user = await authenticationHelper.isLoggedIn(request.token)
  if(user == undefined){
    return response.status(400).send('Not Authenticated')
  }

  const fileDb = await File.findById(request.params.id)
  const filePath = `${fileDb.path}/${fileDb.name}`
  try{
      fs.unlink(`${config.FILE_DIR}${filePath}`, (err) => {
        if(err) throw console.log(err)
     })
  } catch(exception) {
      console.error(`File Removal Helper: ${exception.message}`)
  }


})


filesRouter.delete('/eremove/:id', async(request, response) => {

  const user = await authenticationHelper.isLoggedIn(request.token)
  if(user == undefined){
    return response.status(400).send('Not Authenticated')
  }

  const fileDb = await File.findById(request.params.id)
  const filePath = `${fileDb.path}/${fileDb.name}.enc`

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
  })
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
    const fileName = nameCreation.createDocumentName(file.name, file.mimetype, path)
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
    cryptoHelper.encrypt('test', `${config.FILE_DIR}${path}/${fileName}`)
  })



  response.status(200).send('Files uploaded')
   
})


module.exports = filesRouter