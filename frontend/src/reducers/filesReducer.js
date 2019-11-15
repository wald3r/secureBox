import fileService from '../services/files'


export const getFiles = () => {
  return async dispatch => {
    const response = await fileService.getFiles()
    if(response.status === 400){
      return
    }
    let data = response.data
    dispatch({
      type: 'GETFILES',
      data
    })
  }
}

export const setFiles = (data) => {
  return async dispatch => {
    dispatch({
      type: 'SETFILES',
      data
    })
  }
}

const filesReducer = (state = [], action) => {

  console.log(action.type)
  switch (action.type){
  case 'GETFILES':
    return action.data
  case 'SETFILES':
    return action.data
  default:
    return state
  }
}


export default filesReducer