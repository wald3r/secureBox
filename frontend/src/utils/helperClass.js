//format the time to display it in a readable way

const padding = (digits) => {
  if(digits.toString().length < 2){
    return `0${digits}`
  }else{
    return digits
  }
}

function formatTime(timestamp){
  var dateobject = new Date(timestamp)
  var datestring = `${dateobject.getFullYear()}-${padding(dateobject.getMonth()+1)}-${padding(dateobject.getDay())}`
  return datestring
}

const createName = (type, mime, oldFileName, newFileName, newDate) => {

  const mimes = mime.split('/')
  var newName
  var date
  if(newDate === ''){
    date = new Date()
  }else{
    date = newDate
  }
  if(newFileName !== ''){
    newName = `${type}_${padding(date.getDate())}-${padding(date.getMonth()+1)}-${date.getFullYear()}_${newFileName}.${mimes[1]}`
  }else{
    newName = `${type}_${padding(date.getDate())}-${padding(date.getMonth()+1)}-${date.getFullYear()}_${oldFileName}.${mimes[1]}`
  }
  return newName
}

export default { formatTime, createName }
