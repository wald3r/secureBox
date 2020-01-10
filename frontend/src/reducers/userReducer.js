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

export const addLastUsed = ( id ) => {
  return async dispatch => {
    dispatch({
      type: 'ADDLASTUSED',
      id
    })
  }
}

export const updateUser = ( details ) => {
  return async dispatch => {
    dispatch({
      type: 'UPDATEDETAILS',
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

  switch (action.type){
  case 'ADDLASTUSED':
      var user = state
      user.lastUsed = user.lastUsed.filter(file => String(file) !== String(action.id))

      if(user.lastUsed.length < 20){
        user.lastUsed = user.lastUsed.unshift(action.id)
      }else{
        user.lastUsed.pop()
        user.lastUsed = user.lastUsed.unshift(action.id)
      }
    return user
  case 'SETUSER':
    return action.user
  case 'REMOVEUSER':
    return null
  case 'UPDATEDETAILS':
    const updatedUser = {  ...state,
      name: action.details.name,
      username: action.details.username,
      email: action.details.email,
    }
    window.localStorage.removeItem('loggedappUser')
    window.localStorage.setItem('loggedappUser', JSON.stringify(updatedUser))
    return updatedUser
  default:
    return state
  }
}


export default userReducer