import axios from 'axios';

const apiAxios = axios.create({
    baseURL:'https://user-auth-backend-three.vercel.app',
    withCredentials: true, 
});

export default apiAxios;