import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://mcuapi.up.railway.app/api/v1'
})
