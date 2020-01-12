import usersService from '../services/users'

export const getUsers = ( user ) => {
  return async dispatch => {
    const response = await usersService.getAllUsers()
    const users = response.data.filter(u => u.id !== user.id)
    dispatch({
      type: 'GETUSERS',
      users
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
    return action.users
  case 'CHANGEUSER':
    const users = state.filter(u => u.id !== action.user.id)
    users.concat(action.user)
    return users.concat(action.user)
  default:
    return state
  }
}


export default userReducer