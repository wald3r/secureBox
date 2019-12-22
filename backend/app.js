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

mongoose.connect(config.DB_URI, { useNewUrlParser: true})




app.use(cors())
app.use(bodyParser.json())
app.use(fileUpload())
app.use(auth.getTokenFrom)
app.use(logging.logRequests)
app.use('/api/login', limiter.loginLimiter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/registration', limiter.accountLimiter)
app.use('/api/registration', registrationRouter)
app.use('/api/files/', filesRouter)


module.exports = app