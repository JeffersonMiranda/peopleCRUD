import axios from 'axios'

const client = axios.create({
    baseURL: 'personscrudapi.herokuapp.com/',
    headers: { 'Content-Type': 'application/json' }
})

export default client;