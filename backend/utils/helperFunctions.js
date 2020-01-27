require('dotenv').config()


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function getDir(fullDir){
  console.log('test', fullDir)
  const dir = fullDir.replace('/controllers', '/')
  return dir

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

module.exports = { sleep, modifyLastUsed, removeLastUsed, getDir }