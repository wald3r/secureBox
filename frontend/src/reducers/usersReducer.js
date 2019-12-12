import usersService from '../services/users'

export const getUsers = ( ) => {
  return async dispatch => {
    const response = await usersService.getAllUsers()
    dispatch({
      type: 'GETUSERS',
      data: response.data
    })
  }
}


export const changeUser = ( user ) => {
  return async dispatch => {
    dispatch({
      type: 'CHANGEUSER',
      user
    })
  }
}


const userReducer = (state = [], action) => {

  switch (action.type){
  case 'GETUSERS':
    return action.data
  case 'CHANGEUSER':
    const users = state.filter(u => u._id !== action.user._id)
    users.concat(action.user)
    return users.concat(action.user)
  default:
    return state
  }
}


export default userReducer