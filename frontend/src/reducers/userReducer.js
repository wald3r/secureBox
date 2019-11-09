import fileService from '../services/files'

export const setUser = ( user ) => {
  return async dispatch => {
    window.localStorage.setItem('loggedappUser', JSON.stringify(user))
    fileService.setToken(user.token)
    dispatch({
      type: 'SETUSER',
      user
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
  default:
    return state
  }
}


export default userReducer