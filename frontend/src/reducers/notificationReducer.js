const setNotification = (data) => {
  return ({
    type: 'NOTIFICATION',
    data
  })
}


const removeNotification = () => {
  return ({
    type: 'REMOVENOTIFICATION'
  })
}


export const handleNotification = (message, time) => {
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {dispatch(removeNotification())}, time)
  }
}


const notificationReducer = (state = '', action) => {

  switch(action.type){
  case 'NOTIFICATION':
    return action.data
  case 'REMOVENOTIFICATION':
    return ''

  default:
    return state
  }
}


export default notificationReducer