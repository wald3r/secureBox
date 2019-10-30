import axios from 'axios'


const login = async (username, password) => {
  console.log(username, password)
  const response = await axios.get('http://localhost:3001/users/1')
  return response.data

}

export default { login }