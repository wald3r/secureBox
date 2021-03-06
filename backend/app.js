/* eslint-disable no-undef */
const config = require('./utils/config')
const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const auth = require('./middleware/authentication')
const limiter = require('./middleware/limitRequests')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const registrationRouter = require('./controllers/registration')
const filesRouter = require('./controllers/files')
const logging = require('./middleware/logging')
const errorHandler = require('./middleware/errorHandler')
const helmet = require('helmet')
const scheduler = require ('./utils/scheduler.js')
const mimetypesRouter = require('./controllers/mimetypes')
const notesRouter = require('./controllers/notes')
const cypressRouter = require('./controllers/cypress')
const appRouter = require('./controllers/app')

mongoose.connect(config.DB_URI, { useNewUrlParser: true})

scheduler.clearPublicLinks

app.use(express.static('build'))
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(fileUpload())
app.use(auth.getTokenFrom)
app.use(logging.logRequests)
if(process.env.NODE_ENV !== 'test'){
  app.use('/api/login', limiter.loginLimiter)
}else{
  app.use('/api/cypress', cypressRouter)
}

if(process.env.NODE_ENV === 'pro'){
  app.use('/', appRouter)
}
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/registration', limiter.accountLimiter)
app.use('/api/registration', registrationRouter)
app.use('/api/files', filesRouter)
app.use('/api/mimes', mimetypesRouter)
app.use('/api/notes', notesRouter)
app.use(errorHandler)


module.exports = app
