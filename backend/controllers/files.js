const filesRouter = require('express').Router()
const authenticationHelper = require('../utils/authenticationHelper')
const File = require ('../models/file')
const fs = require('fs');
const config = require('../utils/config')


filesRouter.get('/', async (request, response, next) => {

  try {

    const user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(400).send('Not Authenticated')
    }
    console.log('list files')
    const files = await File.find({ user: user.id }).populate('user')
    console.log(files)
    return response.status(200).json(files)
  }catch(exception){
    next(exception)
  }
})


filesRouter.get('/download/:id', async(request, response) => {

  console.log('download file')
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



filesRouter.post('/upload', async (request, response) => {

  const user = await authenticationHelper.isLoggedIn(request.token)
  if(user == undefined){
    return response.status(400).send('Not Authenticated')
  }
  if (!request.files || Object.keys(request.files).length === 0) {
    return response.status(400).send('No files were uploaded.')
  }

  console.log(request.files)
  let file = request.files.file
  let path = `files/${user.username}`

  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
  } 
  const newFile = new File ({
    name: file.name,
    path: path,
    mimetype: file.mimetype,
    size: file.size,
    user: user._id
  })

  const savedFile = newFile.save()
  

  file.mv(`${path}/${file.name}`, err => {
    if (err){
      console.log(err)
      return response.status(500).send(err)}

    response.status(200).send('All files uploaded.')

  })  
})

module.exports = filesRouter