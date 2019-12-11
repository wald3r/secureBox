import fileService from '../services/files'
import usersService from '../services/users'

export const setUser = ( user ) => {
  return async dispatch => {
    window.localStorage.setItem('loggedappUser', JSON.stringify(user))
    fileService.setToken(user.token)
    usersService.setToken(user.token)
    dispatch({
      type: 'SETUSER',
      user
    })
  }
}


export const updateUser = ( details ) => {
  return async dispatch => {
    dispatch({
      type: 'UDPATEDETAILS',
      details
    })
  }
}

export const removeUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedappUser')
    dispatch({
      type: 'REMOVEUSER',
    })
  }
}

const userReducer = (state = null, action) => {

  console.log(action.type)
  switch (action.type){
  case 'SETUSER':
    return action.user
  case 'REMOVEUSER':
    return null
  case 'UPDATEDETAILS':
    const updatedUser = {  name: action.details.name,
      username: action.details.username,
      email: action.details.email,
      ...state  }
    return updatedUser
  default:
    return state
  }
}


export default userReducer