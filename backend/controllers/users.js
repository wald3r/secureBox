const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response, next) => {
    try{
      const users = await User.find({})
      return response.json(users)
    } catch(exception){
      next(exception)
    }
  })


  usersRouter.put('/check/:id', async (request, response, next) => {
    try{
      const body = request.body
      const user = await User.findById(request.params.id)
      
      console.log(body)
      const passwordCorrect = user === null 
        ? false  
        : await bcrypt.compare(body.password, user.password)

      console.log(passwordCorrect)
      if(passwordCorrect){
        return response.status(200).send('Password correct')
      }else{
        return response.status(400).send('Password incorrect')
      }

    } catch(exception){
      console.log(exception.message)
    }
  })

  usersRouter.put('/password/:id', async (request, response, next) => {
    try{
      const user = await User.findById(request.params.id)
      const body = request.body
      
      const salt = 10
      const passwordHash = await bcrypt.hash(body.password, salt)

      user.password = passwordHash
      const savedUser = await user.save()

      return response.status(200).json(savedUser)

    } catch(exception){
      console.log(exception.message)
    }
  })


  usersRouter.put('/details/:id', async (request, response, next) => {
    try{
      const user = await User.findById(request.params.id)
    
      user.name = request.body.name
      user.username = request.body.username
      user.email = request.body.email


      const savedUser = await user.save()
      console.log(savedUser)
      return response.status(200).json(savedUser)

    } catch(exception){
      console.log(exception.message)
    }
  })

module.exports = usersRouter