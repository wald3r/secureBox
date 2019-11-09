const User = require('../models/user')
const jwt = require('jsonwebtoken')

const isLoggedIn = async (token) => {
  
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return null
  }

  const user = await User.findById(decodedToken.id)
  
  if(!user){
    return null
  }

  return user
}

module.exports = { isLoggedIn }