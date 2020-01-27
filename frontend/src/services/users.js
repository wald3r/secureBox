import axios from 'axios'

const baseUrl = '/api/users'

let token = null


const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAllUsers = async () => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(baseUrl, config)
  return response
}


const getUser = async (id) =>  {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(`${baseUrl}/user/${id}`, config)
  return response.data
}

const updateUserDetails = async (details, id) => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/details/${id}`, details, config)
  return response
}

const checkUserPassword = async (password, id) => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/check/${id}`, password, config)
  return response

}

const updateUserPassword = async (password, id) => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/password/${id}`, password, config)
  return response
}


const deleteUser = async (id) => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/remove/${id}`, config)
  return response
}

export default { deleteUser, updateUserDetails, updateUserPassword, setToken, getAllUsers, checkUserPassword, getUser }