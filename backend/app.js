const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const auth = require('./middleware/authentication')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')

mongoose.connect(config.DB_URI, { useNewUrlParser: true})

app.use(cors())
app.use(bodyParser.json())
app.use(auth.getTokenFrom)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)


module.exports = app