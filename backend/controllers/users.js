const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const authenticationHelper = require('../utils/authenticationHelper')
const roles = require('../utils/roleManagement')

usersRouter.get('/', async (request, response, next) => {
    try{
      const authenticatedUser = await authenticationHelper.isLoggedIn(request.token)
      if(authenticatedUser == undefined){
        return response.status(400).send('Not Authenticated')
      }

      const users = await User.find({})
      return response.json(users)
    } catch(exception){
      next(exception)
    }
  })


usersRouter.put('/check/:id', async (request, response, next) => {
    try{

      const authenticatedUser = await authenticationHelper.isLoggedIn(request.token)
      if(authenticatedUser == undefined){
        return response.status(400).send('Not Authenticated')
      }

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

      const authenticatedUser = await authenticationHelper.isLoggedIn(request.token)
      if(authenticatedUser == undefined){
        return response.status(400).send('Not Authenticated')
      }


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


usersRouter.get('/roles/:id', async (request, response, next) => {
  try{
    console.log(request.token)
    console.log(request.params.id)
    const authenticatedUser = await authenticationHelper.isLoggedIn(request.token)
      if(authenticatedUser == undefined){
        return response.status(400).send('Not Authenticated')
      }

    console.log('start changeing')
    const userToChange = await User.findById(request.params.id)

    if(userToChange !== undefined){
      if(userToChange.role === roles.ADMIN){
        userToChange.role = roles.USER
      }else{
        userToChange.role = roles.ADMIN
      }
      await userToChange.save()
      response.status(200).send('User role changed!')
    } 

    response.status(500).send('Nothing happened!')

    } catch(exception){
      console.log(exception.message)
    }
})

  usersRouter.put('/details/:id', async (request, response, next) => {
    try{
      const authenticatedUser = await authenticationHelper.isLoggedIn(request.token)
      if(authenticatedUser == undefined){
        return response.status(400).send('Not Authenticated')
      }

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