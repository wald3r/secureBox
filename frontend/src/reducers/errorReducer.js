const setError = (data) => {
  return ({
    type: 'ERROR',
    data
  })
}


const removeError = () => {
  return ({
    type: 'REMOVERROR'
  })
}


export const handleError = (message, time) => {
  return async dispatch => {
    dispatch(setError(message))
    setTimeout(() => {dispatch(removeError())}, time)
  }
}


const errorReducer = (state = '', action) => {

  switch(action.type){
  case 'ERROR':
    return action.data
  case 'REMOVEERROR':
    return ''

  default:
    return state
  }
}


export default errorReducer