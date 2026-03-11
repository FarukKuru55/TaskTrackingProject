import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7052/api',
});

export default api;""