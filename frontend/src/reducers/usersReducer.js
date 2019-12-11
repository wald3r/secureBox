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




const userReducer = (state = [], action) => {

  switch (action.type){
  case 'GETUSERS':
    return action.data
  default:
    return state
  }
}


export default userReducer