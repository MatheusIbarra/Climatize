import axios from 'axios';

//https://api.hgbrasil.com/weather?key=d645c9ae&lat=-23.682&lon=-46.875

export const key = 'd645c9ae'

const api = axios.create({
    baseURL: 'https://api.hgbrasil.com/'
})

export default api;