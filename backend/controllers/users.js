const usersRouter = require('express').Router()
const User = require('../models/user')
const Note = require('../models/note')
const File = require('../models/file')
const bcrypt = require('bcrypt')
const authenticationHelper = require('../utils/authenticationHelper')
const roleManagement = require('../utils/roleManagement')
const fs = require('fs');


usersRouter.get('/', async (request, response, next) => {
    try{

      const authenticatedUser = await authenticationHelper.isLoggedIn(request.token)
      if(authenticatedUser == undefined){
        return response.status(401).send('Not Authenticated')
      }
      if(authenticatedUser.role !== roleManagement.roles.ADMIN){
        return response.status(401).send('Wrong user role')
      }

      const users = await User.find({}).populate('lastUsed')
      return response.json(users.map(user => user.toJSON()))
    } catch(exception){
      next(exception)
    }
  })


usersRouter.put('/check/:id', async (request, response, next) => {
    try{

      const authenticatedUser = await authenticationHelper.isLoggedIn(request.token)
      if(authenticatedUser == undefined){
        return response.status(401).send('Not Authenticated')
      }

      const body = request.body
      const user = await User
        .findById(request.params.id)
        .exec()
        .catch(error => console.error(error.message))
      
      var passwordCorrect
      if(user !== null && user !== undefined){
        passwordCorrect = user === null 
          ? false  
          : await bcrypt.compare(body.password, user.password)
      }else{
        response.status(500).send('User does not exist')
      }

      if(passwordCorrect){
        return response.status(200).send('Old password correct')
      }else{
        return response.status(400).send('Old password incorrect')
      }

    } catch(exception){
      next(exception)
    }
})

usersRouter.put('/password/:id', async (request, response, next) => {
    try{

      const authenticatedUser = await authenticationHelper.isLoggedIn(request.token)
      if(authenticatedUser == undefined){
        return response.status(401).send('Not Authenticated')
      }


      const user = await User
        .findById(request.params.id)
        .populate('lastUsed')
        .exec()
        .catch(error => console.error(error.message))

      const body = request.body
      
      const salt = 10
      const passwordHash = await bcrypt.hash(body.password, salt)


      if(user !== null && user !== undefined){
        user.password = passwordHash
        const savedUser = await user.save()
        return response.status(200).json(savedUser.toJSON())
      }else{
        response.status(500).send('User does not exist')
      }

    } catch(exception){
      next(exception)
    }
  })

  usersRouter.get('/user/:id', async (request, response, next) => {
    try{

      const authenticatedUser = await authenticationHelper.isLoggedIn(request.token)
      if(authenticatedUser == undefined){
        return response.status(401).send('Not Authenticated')
      }
      if(authenticatedUser.role !== roleManagement.roles.ADMIN){
        return response.status(401).send('Wrong user role')
      }

      const getUser = await User
        .findById(request.params.id)
        .populate('lastUsed')
        .exec()
        .catch(error => console.error(error.message))

      if(getUser !== null && getUser !== undefined){
        response.status(200).json(getUser.toJSON())
      }else{
        response.status(500).send('User does not exist')
      }       
    } catch(exception){
      next(exception)
    }
  })

  usersRouter.delete('/remove/:id', async (request, response, next) => {
    try{

      const authenticatedUser = await authenticationHelper.isLoggedIn(request.token)
      if(authenticatedUser == undefined){
        return response.status(401).send('Not Authenticated')
      }
      if(authenticatedUser.role !== roleManagement.roles.ADMIN){
        return response.status(401).send('Wrong user role')
      }

      const files = await File.find({user: request.params.id})
      files.map(async f => {
        const filePath = `${f.path}/${f.name}.enc`
        fs.unlinkSync(filePath)
        await File.findByIdAndDelete(f._id)
      })

      const notes = await Note.find({user: request.params.id})
      notes.map(async n => await Note.findByIdAndDelete(n._id))

      await User.findByIdAndDelete(request.params.id)
      response.status(200).send('User was successfully deleted!')

    } catch(exception){
      next(exception)
    }
  })


  usersRouter.put('/details/:id', async (request, response, next) => {
    try{
      const authenticatedUser = await authenticationHelper.isLoggedIn(request.token)
      if(authenticatedUser == undefined){
        return response.status(401).send('Not Authenticated')
      }

      const user = await User
        .findById(request.params.id)
        .populate('lastUsed')
        .exec()
        .catch(error => console.error(error.message))
      
      if(user !== null && user !== undefined){
        user.name = request.body.name
        user.username = request.body.username
        user.email = request.body.email
        user.active = request.body.active
        user.role = request.body.role
  
        const savedUser = await user.save()
        return response.status(200).json(savedUser.toJSON())
      }else{
        response.status(500).send('User does not exist')
      }       

    } catch(exception){
      next(exception)
    }
  })

module.exports = usersRouter