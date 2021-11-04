// axios - Para fazer requisições HTTP e configuração.
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.github.com',
});

export default api;