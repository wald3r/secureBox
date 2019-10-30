import axios from 'axios'

const baseUrl = '/api/registration'

const register = async data => {

  const response = await axios.post(baseUrl, data)
  return response.data

}

export default { register }