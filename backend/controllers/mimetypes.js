
const mimetypesRouter = require('express').Router()
const mimetype = require('../models/mimetype')
const roleManagement = require('../utils/roleManagement')

mimetypesRouter.get('/', async(request, response, next) => {
  
  try{
    const user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }
    if(user.role !== roleManagement.roles.ADMIN){
      return response.status(401).send('Wrong user role')
    }

    const types = await mimetype.find({})
    return response.status(200).json(types.map(t => t.toJSON()))
  }catch(exception){
    next(exception)
  }
})

module.exports = mimetypesRouter