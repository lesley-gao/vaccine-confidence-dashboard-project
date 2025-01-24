import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://8.138.179.126:8050";

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
    },
});


export const fetchData = async (endpoint, options = {}) => {
    try {
        const response = await api.get(endpoint, options);
        if (response.data.code === 0) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || 'Request failed');
        }
    } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch data';
        throw new Error(errorMessage);
    }
};


export const postData = async (url, data, options = {}) => {
    try {
        const response = await axios.post(`${API_BASE_URL}${url}`, data, options);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message;
    }
};


export const putData = async (url, data, options = {}) => {
    try {
        const response = await axios.put(`${API_BASE_URL}${url}`, data, options);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message;
    }
};


export const patchData = async (url, data, options = {}) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}${url}`, data, options);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message;
    }
};


export const deleteData = async (url, options = {}) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}${url}`, options);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message;
    }
};
