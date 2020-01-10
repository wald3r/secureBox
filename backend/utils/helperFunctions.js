require('dotenv').config()


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



function modifyLastUsed(user, object){
  console.log(user)
  const maxLength = process.env.LASTUSED
  user.lastUsed = user.lastUsed.filter(file => String(file) !== String(object._id))

  if(user.lastUsed.length < maxLength){
    user.lastUsed = user.lastUsed.unshift(object._id)
    return user
  }else{
    user.lastUsed.pop()
    user.lastUsed = user.lastUsed.unshift(object._id)
    return user
  }

}


function removeLastUsed(user, object){
  user.lastUsed = user.lastUsed.filter(file => String(file) !== String(object._id))
  return user
}

module.exports = { sleep, modifyLastUsed, removeLastUsed }