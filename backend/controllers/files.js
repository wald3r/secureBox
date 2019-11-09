const filesRouter = require('express').Router()
const authenticationHelper = require('../utils/authenticationHelper')
const File = require ('../models/file')
const fs = require('fs');


filesRouter.get('/', async (request, response, next) => {

  try {

    const user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(400).send('Not Authenticated')
    }

    const files = await File.find({ user: user.id }).populate('user')
    console.log(files)
    return response.status(200).json(files)
  }catch(exception){
    next(exception)
  }


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
    user: user.id
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