import axios from "axios";

export const restApi = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 1000
});