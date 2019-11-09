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

const filesReducer = (state = [], action) => {

  console.log(action.type)
  switch (action.type){
  case 'GETFILES':
    return action.data
  default:
    return state
  }
}


export default filesReducer