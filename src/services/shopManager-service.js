import axios from "axios";

const http = axios.create({
    baseURL: 'https://fruitproducts.org/api/v1'
});

http.interceptors.response.use(
    (res) => res.data,
    (err) => {
        const { status, data } = err?.response || {};
        
        if (status === 400) {
            console.error('API Error:', data || err.message);
        }

        return Promise.reject({
            message: data?.message || 'Bad Request',
            status: status
        });
    }
);

export const getProducts = () => http.get('/products');

export const getProductId = (id) => http.get(`/products/${id}`);

export const setProductDelete = (id) => http.delete(`/products/${id}`);

export const setCreateProduct = (data) => http.post('/products', data);
