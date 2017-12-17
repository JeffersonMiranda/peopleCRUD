import axios from 'axios'

const client = axios.create({
    baseURL: 'https://fast-escarpment-66590.herokuapp.com/',
    headers: { 'Content-Type': 'application/json' }
})

export default client;