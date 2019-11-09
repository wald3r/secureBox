const config = require('./utils/config')
const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const bodyParser = require('body-parser')
const multer  = require('multer')
const cors = require('cors')
const mongoose = require('mongoose')
const auth = require('./middleware/authentication')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const registrationRouter = require('./controllers/registration')
const filesRouter = require('./controllers/files')


mongoose.connect(config.DB_URI, { useNewUrlParser: true})

app.use(cors())
app.use(bodyParser.json())
app.use(fileUpload())
app.use(auth.getTokenFrom)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/registration', registrationRouter)
app.use('/api/files/', filesRouter)


module.exports = app