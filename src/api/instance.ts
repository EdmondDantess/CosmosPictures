import axios from 'axios'

const key = 'BhGcNq7WsGMSUyjspXtJpTMfwnIA0DyJsqgoZgU8'

export const instance = axios.create({
    baseURL: `https://api.nasa.gov/planetary/apod?api_key=` + key
})
