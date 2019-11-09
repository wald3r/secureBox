import axios from 'axios'
const baseUrl = '/api/files'

let token = null

// eslint-disable-next-line no-unused-vars
const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getFiles = async () => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}



const sendFiles = async data => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(`${baseUrl}/upload`, data, config)
  return response


}



export default { sendFiles, setToken, getFiles }