require('dotenv').config()
const bcrypt = require('bcrypt')


/**
 * Sleep functions
 * @param {*} ms 
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/**
 * Modify directory
 * @param {*} fullDir 
 */
function getDir(fullDir){
  const dir = fullDir.replace('/controllers', '/')
  return dir

}

/**
 * Check whether password is correct or not
 * @param {*} object 
 * @param {*} password 
 */
const comparePassword = async (object, password) => {

  const passwordCorrect = object === null 
    ? false  
    : await bcrypt.compare(password, object.password)
    if(!passwordCorrect){
      return false
    }else{
      return true
    }
}


/**
 * Modify last used list of a certain user
 * @param {*} user 
 * @param {*} object 
 */
function modifyLastUsed(user, object){
  const maxLength = process.env.LASTUSED
  var list = []
  list = list.concat(user.lastUsed.filter(file => String(file) !== String(object.id)))
  if(list.length < maxLength){
    list.unshift(object.id)
  }else{
    list.pop()
    list.unshift(object.id)
  }
  user.lastUsed = list
  return user
}


/**
 * Remove file from last used list
 * @param {*} user 
 * @param {*} object 
 */
function removeLastUsed(user, object){
  user.lastUsed = user.lastUsed.filter(file => String(file) !== String(object.id))
  return user
}

module.exports = { comparePassword, sleep, modifyLastUsed, removeLastUsed, getDir }