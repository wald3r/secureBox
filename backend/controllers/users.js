const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response, next) => {
    try{
      const users = await User.find({})
      return response.json(users)
    } catch(exception){
      next(exception)
    }
  })

module.exports = usersRouter