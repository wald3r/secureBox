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



export default { formatTime }
