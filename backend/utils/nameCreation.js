
const fs = require('fs');
const config = require('../utils/config')

const padding = (digits) => {
  if(digits.toString().length < 2){
    return `0${digits}`
  }else{
    return digits
  }
}

const createDocumentName = (name, type, path) => {

  const types = type.split('/')
  var newName = name.replace(`.${types[1]}`, '')
  if(types[1] === 'jpeg'){
    newName = newName.replace(`.jpg`, '')
    newName = newName.replace(`.JPG`, '')
  }
  const date = new Date()
  //const dateString = `${padding(date.getDay())}-${padding(date.getMonth()+1)}-${date.getFullYear()}`
  let docName = `${config.FILE_DIR}${path}/${newName}.${types[1]}`
  let counter = 0
  let dup = ''
  for(let a = 0; a < 10; a++){
    if(!alreadyExists(docName)){
      break
    }else{
      counter += 1
      let str = '(1)'
      dup = str.repeat(counter)
      docName = `${config.FILE_DIR}${path}/${newName}${dup}.${types[1]}`
    }
  }

  return `${newName}${dup}.${types[1]}`

}


const alreadyExists = (path) => {
  if(fs.existsSync(path+'.enc')){
    return true
  }else{
    return false
  }
}



module.exports = { createDocumentName }