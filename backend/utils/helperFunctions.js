require('dotenv').config()
const bcrypt = require('bcrypt')


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function getDir(fullDir){
  const dir = fullDir.replace('/controllers', '/')
  return dir

}

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


function removeLastUsed(user, object){
  user.lastUsed = user.lastUsed.filter(file => String(file) !== String(object.id))
  return user
}

module.exports = { comparePassword, sleep, modifyLastUsed, removeLastUsed, getDir }