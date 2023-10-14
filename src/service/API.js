import axios from 'axios';

const API = axios.create ({
    baseURL:"https://band-builder-d6qhr5vbj-gabriels-projects-3e587156.vercel.app/api"
});

export default API;