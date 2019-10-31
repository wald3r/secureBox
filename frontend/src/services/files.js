import axios from 'axios'
const baseUrl = '/api/files'

const send = async data => {

  const response = await axios.post(baseUrl, data)
  return response.data 
}



export default { send }