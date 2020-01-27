import notesService from '../services/notes'


export const getNotes = () => {
  return async dispatch => {
    const response = await notesService.getNotes()
    let data = response.data
    dispatch({
      type: 'GETNOTES',
      data
    })
  }
}

export const addNote = (object) => {
  return async dispatch => {
    const response = await notesService.addNote(object)
    let data = response.data
    dispatch({
      type: 'ADDNOTE',
      data
    })
  }
}



const notesReducer = (state = [], action) => {
  switch (action.type){
  case 'GETNOTES':
   return action.data
  case 'ADDNOTE':
    return state.concat(action.data)
  default:
    return state
  }
}


export default notesReducer