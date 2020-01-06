const registrationRouter = require('express').Router()
const User = require('../models/user')
const Registration = require('../models/registration')
const bcrypt = require('bcrypt')
const cryptoHelper = require('../utils/cryptoHelper.js')
const nodemailer = require('../utils/nodemailer')
const logger = require('../utils/logger')

registrationRouter.get('/verify/:id', async (request, response) => {
  try{
    const waitingActivation = await Registration.find({hash: request.params.id})
    console.log(waitingActivation)
    if(waitingActivation.length > 0){
      const user = await User.findById(waitingActivation[0].userid)
      if(user !== undefined){
        user.active = true
        await user.save()
      }
      await Registration.findByIdAndDelete(waitingActivation._id)
      logger.verification(waitingActivation.userid)
      return response.status(200).send('User got activated.')
    
    }
    logger.verificationFailed(`Verification failed for ${waitingActivation.userid}`)
    return response.status(500).send('Activation did not work. Please contact the administrator.')
  }
  catch(exception){
    logger.verificationFailed(exception.message)
  }

})



registrationRouter.post('/', async (request, response, next) => {
    try{
        const body = request.body
        const salt = 10
        const passwordHash = await bcrypt.hash(body.password, salt)
        const user = new User({
            username: body.username,
            name: body.name,
            password: passwordHash,
            email: body.email
        })
        const savedUser = await user.save()
        logger.logRegistrations(savedUser, null, 0)
        if(savedUser !== undefined){
          const registration = new Registration({
            userid: savedUser._id,
            hash: cryptoHelper.createRandomHash()
          })

          await registration.save()
          logger.logRegistrations(null, registration, 1)
          await nodemailer.sendRegistrationMail(savedUser, registration.hash)
          logger.logRegistrations(null, null, 2)
        }

        
        response.status(200).json(savedUser)

    } catch(exception){
      logger.logFailedRegistration(exception.message)
      //response.status(500).send({error: exception.message})
      next(exception)
    }
  })

  module.exports = registrationRouter
