const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3 // limit each IP to 100 requests per windowMs
  });


loginRouter.post('/', async(request, response) => {
    const body = request.body
    const user = await User.findOne({ username: body.username })
    const passwordCorrect = user === null 
        ? false  
        : await bcrypt.compare(body.password, user.password)
    if(!(user && passwordCorrect)){
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }


    const token = jwt.sign(userForToken, process.env.SECRET)
    response
        .status(200)
        .send({ token, username: user.username, name: user.name, id: user.id, email: user.email })
})

module.exports = loginRouter