import axios from 'axios'

const demoKey = 'BhGcNq7WsGMSUyjspXtJpTMfwnIA0DyJsqgoZgU8'

export const instance = axios.create({
    baseURL: "https://22api.nasa.gov/planetary/apod?api_key=" + demoKey
})


