import axios from "axios";

const BASE_URL = 'https://react-mini-projects-api.classbon.com';

const httpService = axios.create({
    baseURL: BASE_URL,
    
})