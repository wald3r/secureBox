
const mimetypesRouter = require('express').Router()
const Mimetype = require('../models/mimetype')
const roleManagement = require('../utils/roleManagement')
const authenticationHelper = require('../utils/authenticationHelper')

mimetypesRouter.get('/', async(request, response, next) => {
  
  try{
    const user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }

    const types = await Mimetype.find({})
    return response.status(200).json(types.map(t => t.toJSON()))
  }catch(exception){
    next(exception)
  }
})


mimetypesRouter.post('/', async(request, response, next) => {
  
  try{
    const user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }
    if(user.role !== roleManagement.roles.ADMIN){
      return response.status(401).send('Wrong user role')
    }

    const body = request.body
    const newType = new Mimetype({
      name: body.name,
      ending: body.ending,
    })

    const savedType = await newType.save()
    return response.status(200).json(savedType.toJSON())
  }catch(exception){
    next(exception)
  }
})

mimetypesRouter.delete('/remove/:id', async(request, response, next) => {
  
  try{
    const user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }
    if(user.role !== roleManagement.roles.ADMIN){
      return response.status(401).send('Wrong user role')
    }

    await Mimetype.findByIdAndDelete(request.params.id)

    response.status(200).send('MIME-Type was successfully deleted.')
  }catch(exception){
    next(exception)
  }
})


module.exports = mimetypesRouter