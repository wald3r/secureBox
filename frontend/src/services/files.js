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

  const response = await axios.delete(`${baseUrl}/eremove/${id}`, config)
  return response
}

const getFavourites = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(`${baseUrl}/favourites/${id}`, config)
  return response
}


const getFiles = async () => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  return response
}

const getDocuments = async () => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/documents/`, config)
  return response
}

const getPictures = async () => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/pictures/`, config)
  return response
}

const getFile = async (id) => {
  
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response
}

const downloadFile = async (id) => {

  const config = {
    responseType: 'blob',
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/download/${id}`, config)
  return response
}


const removeUnencryptedFile = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  await axios.delete(`${baseUrl}/dremove/${id}`, config)
}

const sendFiles = async (data) => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`${baseUrl}/upload`, data, config)
  return response


}



export default { getFavourites, downloadFile, sendFiles, setToken, getFiles, getFile, removeFile, removeUnencryptedFile, getPictures, getDocuments }