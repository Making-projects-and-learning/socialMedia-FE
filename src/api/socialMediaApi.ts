/** Libraries */
import axios, { AxiosInstance } from 'axios';

/** Helpers */
import { getEnvironmets } from '../utils';

const { VITE_REACT_APP_API_URL } = getEnvironmets();


const socialMediaApi: AxiosInstance = axios.create({
    baseURL: VITE_REACT_APP_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-token': localStorage.getItem('token')
    }
});

export default socialMediaApi;



