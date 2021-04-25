const axios = require('axios')

const api = axios.create({
    baseURL : 'https://my-json-server.typicode.com/Katoumat123/numer'
})

const getRoot = () => api.get('/root_of_eqution')
const getmatrix = () => api.get('/matrix')
const getInter = () => api.get('/interpolation')
const getRegession = () => api.get('/regression')

const apis = {
    getRoot,getmatrix,getInter,getRegession
}

export default apis