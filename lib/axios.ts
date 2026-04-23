import axios from 'axios'

const api = axios.create({
  baseURL: '/minhaapi',
})

export default api