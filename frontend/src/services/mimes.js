import axios from 'axios'

const baseUrl = '/api/mimes'

let token = null


const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getTypes = async () => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  return response
}

const addType = async (data) => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, data, config)
  return response
}

const removeType = async (id) => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/remove/${id}`, config)
  return response
}



export default { addType, setToken, getTypes, removeType }