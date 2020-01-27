import mimesService from '../services/mimes'


export const getTypes = () => {
  return async dispatch => {
    const response = await mimesService.getTypes()
    let data = response.data
    dispatch({
      type: 'GETTYPES',
      data
    })
  }
}

export const addType = (typedata) => {
  return async dispatch => {
    const response = await mimesService.addType(typedata)
    let data = response.data
    dispatch({
      type: 'ADDTYPE',
      data
    })
  }
}


export const removeType = (object) => {
  return async dispatch => {
    dispatch({
      type: 'REMOVETYPE',
      id: object.id
    })
  }
}



const mimetypesReducer = (state = [], action) => {
  switch (action.type){
  case 'GETTYPES':
   return action.data
  case 'ADDTYPE':
    return state.concat(action.data)
  case 'REMOVETYPE':
    return state.filter(t => t.id !== action.id)
  default:
    return state
  }
}


export default mimetypesReducer