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

export const removeNote = (note) => {
  return async dispatch => {
    dispatch({
      type: 'REMOVENOTE',
      note
    })
  }
}



const notesReducer = (state = [], action) => {
  switch (action.type){
  case 'GETNOTES':
    return action.data
  case 'ADDNOTE':
    return state.concat(action.data)
  case 'REMOVENOTE':
    return state.filter(n => n.id !== action.note.id)
  default:
    return state
  }
}


export default notesReducer