const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')
const helperFunctions = require('../utils/helperFunctions')


/**
 * Login a user
 */
loginRouter.post('/', async(request, response) => {
  logger.logLogins(request.body.username, 0)
  const body = request.body
  const user = await User.findOne({ username: body.username }).populate('lastUsed')
  if(!(await helperFunctions.comparePassword(user, body.password) && user )){
    logger.logLogins(body.username, 1)
    return response.status(401).send('invalid username or password')
  }

  if(user.active !== true){
    logger.logLogins(body.username, 1)
    return response.status(401).send('not active')
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

    
  logger.logLogins(body.username, 2)
  // eslint-disable-next-line no-undef
  const token = jwt.sign(userForToken, process.env.SECRET)
  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user.id, email: user.email, role: user.role, active: user.active, lastUsed: user.lastUsed })
})

module.exports = loginRouter