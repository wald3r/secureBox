import axios from 'axios'
const baseUrl = '/api/files'

const sendPhotos = async data => {
  console.log('test3ss')
  const response = await axios.post(`${baseUrl}/upload`, data)
  return response.data


}



export default { sendPhotos }