import axios from 'axios'

const baseUrl = '/api/notes'

let token = null


const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getNotes = async () => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  return response
}

const addNote = async (data) => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, data, config)
  return response
}

const removeNote = async (id) => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/remove/${id}`, config)
  return response
}



export default { addNote, setToken, getNotes, removeNote }