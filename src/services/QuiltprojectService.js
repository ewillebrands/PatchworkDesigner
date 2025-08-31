import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/ewillebrands/PatchworkDesigner', // Replace with the actual API base URL
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
export default {
  getBlockDesigns() {
    return apiClient.get('/blockdesigns')
  },
}
