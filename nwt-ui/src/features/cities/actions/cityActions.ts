import {City} from "common/types/commonTypes";
import axios, {AxiosResponse} from "axios";

const restApi = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 1000
});

const updateCity = (city: City) => {
}