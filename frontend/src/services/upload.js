import axios from 'axios'
const baseUrl = '/api/files'

let token = null

// eslint-disable-next-line no-unused-vars
const setToken = newToken => {
  token = `bearer ${newToken}`
}


const sendFiles = async data => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(`${baseUrl}/upload`, data, config)
  return response.status


}



export default { sendFiles, setToken }