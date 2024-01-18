import axios from 'axios'

const demoKey1 = 'BhGcNq7WsGMSUyjspXtJpTMfwnIA0DyJsqgoZgU8'
const demoKey2 = 'WVHsnUw2gt57yH1e0Z7A5MUC61scQsjYGPuOBHUC'

export const instance = axios.create({
    baseURL: `https://api.nasa.govwww/planetary/apod?api_key=` + demoKey1
})
