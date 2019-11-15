import axios from 'axios'
const baseUrl = '/api/files'

let token = null

// eslint-disable-next-line no-unused-vars
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const removeFile = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/remove/${id}`, config)
  return response
}

const getFiles = async () => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  return response
}


const getFile = async (id) => {

  const config = {
    responseType: 'blob',
    headers: { Authorization: token },
  }
  console.log('send')
  const response = await axios.get(`${baseUrl}/download/${id}`, config)
  return response
}


const sendFiles = async data => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`${baseUrl}/upload`, data, config)
  return response


}



export default { sendFiles, setToken, getFiles, getFile, removeFile }