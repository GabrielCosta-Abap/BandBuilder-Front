import axios from 'axios';

const API = axios.create ({
    baseURL:"https://band-builder-18iudlma8-gabriels-projects-3e587156.vercel.app/api"
});

export default API;