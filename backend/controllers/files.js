var filesRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')


filesRouter.post('/upload', async (request, response) => {


  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(400).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  
  if(!user){
    return response.status(400).send('User not found')
  }

  if (!request.files || Object.keys(request.files).length === 0) {
    return response.status(400).send('No files were uploaded.')
  }

  console.log(request.files)
  let test = request.files.file

  test.mv(`files/${test.name}`, err => {
    if (err){
      return response.status(500).send(err)
    }else{
      return response.status(200).send('All files uploaded.')
    }
  })  
})

module.exports = filesRouter