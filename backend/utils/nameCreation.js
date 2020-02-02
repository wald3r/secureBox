
const fs = require('fs');
const config = require('../utils/config')
const Mimetype = require('../models/mimetype')
const padding = (digits) => {
  if(digits.toString().length < 2){
    return `0${digits}`
  }else{
    return digits
  }
}

const createDocumentName = async (username, name, category, date, number, type, path) => {

  const types = type.split('/')
  var newName = name.replace(`.${types[1]}`, '')
  if(types[1] === 'jpeg'){
    newName = newName.replace(`.jpg`, '')
    newName = newName.replace(`.JPG`, '')
  }

  const ending = await Mimetype.find({name: type})

  let docName = `${config.FILE_DIR}${path}/${username}__${category}__${date}__${newName}__${number}${ending[0].ending}`

  let counter = 0
  let dup = ''
  for(;;){
    if(!alreadyExists(docName)){
      break
    }else{
      counter += 1
      str='(1)'
      dup = str.repeat(counter)
      docName = `${config.FILE_DIR}${path}/${username}__${category}__${date}__${newName}__${number}${dup}.${ending[0].ending}`
    }
  }
  
  return `${username}__${category}__${date}__${newName}__${number}${dup}${ending[0].ending}`

}


const alreadyExists = (path) => {
  if(fs.existsSync(path+'.enc') || fs.existsSync(path)){
    return true
  }else{
    return false
  }
}



module.exports = { createDocumentName }