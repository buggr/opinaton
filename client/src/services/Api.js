import axios from 'axios'

export const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3030' : 'https://opinaton-api.herokuapp.com'

const Api = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3030/api' : 'https://opinaton-api.herokuapp.com/api',
})
export default Api