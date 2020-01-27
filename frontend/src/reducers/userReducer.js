import fileService from '../services/files'
import usersService from '../services/users'
import parameter from '../utils/parameter'
import mimesService from '../services/mimes'
import notesService from '../services/notes'


export const setUser = ( user ) => {
  return async dispatch => {
    window.localStorage.setItem('loggedappUser', JSON.stringify(user))
    fileService.setToken(user.token)
    usersService.setToken(user.token)
    mimesService.setToken(user.token)
    notesService.setToken(user.token)
    
    dispatch({
      type: 'SETUSER',
      user
    })
  }
}

export const addLastUsed = ( file, user ) => {
  return async dispatch => {
    var list = user.lastUsed.filter(oFile => oFile.id !== file.id)
    if(list.length < parameter.lastUsed){
      list.unshift(file)
    }else{
      list.pop()
      list.unshift(file)
    }
    dispatch({
      type: 'ADDLASTUSED',
      list
    })
  }
}


export const removeLastUsed = ( fileId, user ) => {
  return async dispatch => {
    var list = user.lastUsed.filter(oFile => oFile.id !== fileId)
    dispatch({
      type: 'REMOVELASTUSED',
      list
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
    const addedToList = { ...state, lastUsed: action.list}
    return addedToList
  case 'REMOVELASTUSED':
    const removedFromList = { ...state, lastUsed: action.list}
    return removedFromList
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