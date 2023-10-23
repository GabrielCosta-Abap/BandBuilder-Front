import axios from 'axios';

const API = axios.create ({
    baseURL:"https://band-builder-alpha.vercel.app/api"
});

export default API;