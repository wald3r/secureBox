import fileService from '../services/files'


export const getFiles = () => {
  return async dispatch => {
    const data = await fileService.getFiles()
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