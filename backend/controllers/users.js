const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const authenticationHelper = require('../utils/authenticationHelper')
const roleManagement = require('../utils/roleManagement')

usersRouter.get('/', async (request, response, next) => {
    try{

      const authenticatedUser = await authenticationHelper.isLoggedIn(request.token)
      if(authenticatedUser == undefined){
        return response.status(400).send('Not Authenticated')
      }
      if(authenticatedUser.role !== roleManagement.roles.ADMIN){
        return response.status(400).send('Wrong user role')
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

/*
usersRouter.get('/role/:id', async (request, response, next) => {
  try{

    const authenticatedUser = await authenticationHelper.isLoggedIn(request.token)
    if(authenticatedUser == undefined){
      return response.status(400).send('Not Authenticated')
    }
    if(authenticatedUser.role !== roleManagement.roles.ADMIN){
      return response.status(400).send('Wrong user role')
    }

    const userToChange = await User.findById(request.params.id)

    if(userToChange !== undefined){
      if(userToChange.role === roleManagement.roles.ADMIN){ 
        userToChange.role = roleManagement.roles.USER
      }else{
        userToChange.role = roleManagement.roles.ADMIN
      }
      await userToChange.save()
      response.status(200).json(userToChange)
    } 

    response.status(500).send('Nothing happened!')

    } catch(exception){
      console.log(exception.message)
    }
})
*/

  usersRouter.get('/user/:id', async (request, response, next) => {
    try{

      const authenticatedUser = await authenticationHelper.isLoggedIn(request.token)
      if(authenticatedUser == undefined){
        return response.status(400).send('Not Authenticated')
      }
      if(authenticatedUser.role !== roleManagement.roles.ADMIN){
        return response.status(400).send('Wrong user role')
      }

      const getUser = await User.findById(request.params.id)

     
      response.status(200).json(getUser)
       
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
      console.log(request.body)
      user.name = request.body.name
      user.username = request.body.username
      user.email = request.body.email
      user.active = request.body.active
      user.role = request.body.role


      const savedUser = await user.save()
      console.log(savedUser)
      return response.status(200).json(savedUser)

    } catch(exception){
      console.log(exception.message)
      return response.status(500)
    }
  })

module.exports = usersRouter