import axios from 'axios'

const client = axios.create({
    baseURL: 'https://personscrudapi.herokuapp.com/',
    headers: { 'Content-Type': 'application/json' }
})

export default client;