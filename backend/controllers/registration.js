const registrationRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')




registrationRouter.post('/', async (request, response, next) => {
    try{
        const body = request.body
        const salt = 10

        const passwordHash = await bcrypt.hash(body.password, salt)
        console.log(body)
        const user = new User({
            username: body.username,
            name: body.name,
            password: passwordHash,
            email: body.email
        })
        const savedUser = await user.save()
        response.status(200).json(savedUser)

    } catch(exception){
      console.log(exception.message)
      //response.status(500).send({error: exception.message})
      next(exception)
    }
  })

  module.exports = registrationRouter
