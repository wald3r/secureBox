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
const User = require('./models/user')
const bcrypt = require('bcrypt')


const addAdmin = async () => {
  
  const savedUser = await User.find({username: 'admin', name: 'admin', email: 'admin@admin.com'})
  if(savedUser.length === 0){

    const salt = 10
    const passwordHash = await bcrypt.hash('admin', salt)

    const user = new User({
      username: 'admin', 
      name: 'admin',
      password: passwordHash,
      email: 'admin@admin.com',
      role: 'admin',
      active: true
    })
    await user.save()
    console.log('Admin added!')
  } else{
    console.log('No need to add admin')
  }
}

  const clearDatabase = async () => {
  
    if(process.env.NODE_ENV === 'test'){
      const users = await User.find({})
      console.log('Start clearing database:', users)
      await users.map(async u => await User.findByIdAndDelete(u._id))
    }
   await addAdmin()
  }


mongoose.connect(config.DB_URI, { useNewUrlParser: true})

clearDatabase()
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
