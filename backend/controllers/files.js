const filesRouter = require('express').Router()
const authenticationHelper = require('../utils/authenticationHelper')
const File = require ('../models/file')
const fs = require('fs');
const config = require('../utils/config')
const nameCreation = require('../utils/nameCreation')
const CryptoJS = require('crypto-js')


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
  
  fs.exists(filePath, (exists) => {
    if (exists) {
      response.sendFile(filePath , { root : config.FILE_DIR});
    } else {
      response.status(404).send('File does not exist')
    }
  });

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
    console.log(file)
    console.log(file.data[0])
    var cipherobject = CryptoJS.AES.encrypt(JSON.stringify(file.data), 'secret key')
    console.log(cipherobject)
    file.data = cipherobject
    console.log(file)
    //file.data = ciphertext
    //console.log(file)
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
  })
  response.status(200).send('Files uploaded')
   
})

module.exports = filesRouter