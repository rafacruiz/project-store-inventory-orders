import axios from "axios";

const http = axios.create({
    baseURL: 'https://fruitproducts.org/api/v1'
});

http.interceptors.response.use(
    (res) => res.data,
    (err) => Promise.reject(err)
);

export const getProducts = () => http.get('/products');
