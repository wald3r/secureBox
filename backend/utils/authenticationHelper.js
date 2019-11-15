const User = require('../models/user')
const jwt = require('jsonwebtoken')

const isLoggedIn = async (token) => {
  
  var user = undefined
  try{
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return null
    }

    user = await User.findById(decodedToken.id)
  }catch(exception){
    console.error(`Authentication Helper: ${exception.message}`)
  }
  if(user == undefined){
    return null
  }

  return user
}

module.exports = { isLoggedIn }