//format the time to display it in a readable way

const padding = (digits) => {
  if(digits.toString().length < 2){
    return `0${digits}`
  }else{
    return digits
  }
}

function formatName(name){

  const splitName = name.split('__')
  let newName = name
  if(splitName.length > 1){
    newName = splitName[3]
    newName += splitName[4]
  }
  return newName
}

function formatTime(timestamp){
  var dateobject = new Date(timestamp)
  var datestring = `${dateobject.getFullYear()}-${padding(dateobject.getMonth()+1)}-${padding(dateobject.getDay())}`
  return datestring
}

const createName = (username, type, mime, oldFileName, newFileName, newDate, number) => {

  const mimes = mime.split('/')
  var newName
  var date
  if(newDate === ''){
    date = new Date()
  }else{
    date = newDate
  }
  if(newFileName !== ''){
    newName = `${username}__${number}__${type}__${padding(date.getDate())}-${padding(date.getMonth()+1)}-${date.getFullYear()}__${newFileName}.${mimes[1]}`
  }else{
    newName = `${username}__${number}__${type}__${padding(date.getDate())}-${padding(date.getMonth()+1)}-${date.getFullYear()}__${oldFileName}.${mimes[1]}`
  }
  return newName
}

export default { formatTime, createName, formatName }
