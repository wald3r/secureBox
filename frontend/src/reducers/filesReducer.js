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

export const getDocuments = () => {
  return async dispatch => {
    const response = await fileService.getDocuments()
    if(response.status === 400){
      return
    }
    let data = response.data
    dispatch({
      type: 'GETDOCUMENTS',
      data
    })
  }
}

export const getMusic = () => {
  return async dispatch => {
    const response = await fileService.getMusic()
    if(response.status === 400){
      return
    }
    let data = response.data
    dispatch({
      type: 'GETMUSIC',
      data
    })
  }
}

export const getFavourites = (id) => {
  return async dispatch => {
    const response = await fileService.getFavourites(id)
    if(response.status === 400){
      return
    }
    let data = response.data
    dispatch({
      type: 'GETFAVOURITES',
      data
    })
  }
}

export const getPictures = () => {
  return async dispatch => {
    const response = await fileService.getPictures()
    if(response.status === 400){
      return
    }
    let data = response.data
    dispatch({
      type: 'GETPICTURES',
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

  switch (action.type){
  case 'GETFILES':
    return action.data
  case 'SETFILES':
    return action.data
  case 'GETDOCUMENTS':
    return action.data
  case 'GETFAVOURITES':
    return action.data
  case 'GETPICTURES':
    return action.data
  case 'GETMUSIC':
    return action.data
  default:
    return state
  }
}


export default filesReducer