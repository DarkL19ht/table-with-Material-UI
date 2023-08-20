import axios from "axios";

const instance = axios.create({
    baseURL: "https://fakestoreapi.com"
});

// instance.defaults.headers.common['Authorization'] = 'Auth From instance';

export default instance;
