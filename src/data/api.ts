import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://mcuapi.herokuapp.com/api/v1'
})
