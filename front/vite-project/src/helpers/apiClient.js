import axios from 'axios';
import { getAuthHeaders } from './authHelpers';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
});

apiClient.interceptors.request.use(
    (config) => {
        const authHeaders = getAuthHeaders();
        
        if (config.data instanceof FormData) {
            config.headers = {
                ...config.headers,
                'token': authHeaders.token
            };
        } else {
            config.headers = {
                ...config.headers,
                ...authHeaders
            };
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 400) {
            console.error('Error de autenticación:', error.response?.data?.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
