
const notesRouter = require('express').Router()
const Note = require('../models/note')
const authenticationHelper = require('../utils/authenticationHelper')

notesRouter.get('/', async(request, response, next) => {
  
  try{
    const user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }
 

    const notes = await Note.find({user: user._id})
    return response.status(200).json(notes.map(n => n.toJSON()))
  }catch(exception){
    next(exception)
  }
})


notesRouter.post('/', async(request, response, next) => {
  
  try{
    const user = await authenticationHelper.isLoggedIn(request.token)
    if(user == undefined){
      return response.status(401).send('Not Authenticated')
    }
   
    const body = request.body
    const newNote = new Note({
      title: body.title,
      body: body.body,
      user: user._id
    })

    const savedNote = await newNote.save()
    return response.status(200).json(savedNote.toJSON())
  }catch(exception){
    next(exception)
  }
})



module.exports = notesRouter