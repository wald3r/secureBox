const User = require('../models/user')
const jwt = require('jsonwebtoken')

/**
 * Verify if user is logged in  
 * @param {*} token 
 */
const isLoggedIn = async (token) => {
  
  var user = undefined
  try{
    // eslint-disable-next-line no-undef
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