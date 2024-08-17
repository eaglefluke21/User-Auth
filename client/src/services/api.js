import axios from 'axios';

const apiAxios = axios.create({
    baseURL:'http://localhost:3000',
    withCredentials: true, 
});

export default apiAxios;