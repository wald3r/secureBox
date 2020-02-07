const cypressRouter = require('express').Router()
const File = require ('../models/file')
const Mimetype = require ('../models/mimetype')
const Note = require ('../models/note')
const Public = require ('../models/public')
const Registration = require ('../models/registration')
const User = require ('../models/user')
const bcrypt = require('bcrypt')


/**
 * Cypress router for E2E testing. 
 */

/**
* Clear test database
*/
cypressRouter.get('/clear', async (request, response, next) => {

  try {
    await File.remove({})
    await Mimetype.remove({})
    await Note.remove({})
    await Public.remove({})
    await Registration.remove({})
    await User.remove({})
    response.status(200).send('Database cleared!')
  }catch(exception){
    next(exception)
  }
})

/**
 * Add admin for testing
 */
cypressRouter.get('/addAdmin', async (request, response, next) => {

  try {
    const salt = 10
    const passwordHash = await bcrypt.hash('admin', salt)

    const admin = new User({
      username: 'admin',
      password: passwordHash,
      email: 'admin@admin.com',
      name: 'admin',
      active: true,
      role: 'admin'
    })

    await admin.save()

    response.status(200).json(admin)
   
  }catch(exception){
    next(exception)
  }
})

/**
 * Add user for testing
 */
cypressRouter.get('/addUser', async (request, response, next) => {

  try {
    const salt = 10
    const passwordHash = await bcrypt.hash('user', salt)

    const user = new User({
      username: 'user',
      password: passwordHash,
      email: 'user@user.com',
      name: 'user',
      active: true
    })

    await user.save()

    response.status(200).json(user)
   
  }catch(exception){
    next(exception)
  }
})






module.exports = cypressRouter