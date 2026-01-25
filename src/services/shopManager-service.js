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

export const getProducts = async () => {
    const products = await http.get('/products');

    return products.toSorted((a, b) => 
        a.name.localeCompare(b.name));
};

export const getProductId = (id) => 
    http.get(`/products/${id}`);

export const setProductDelete = (id) => 
    http.delete(`/products/${id}`);

export const setProductCreate = (data) => 
    http.post('/products', data);

export const getWarehouses = () => 
    http.get('/warehouses');

export const getWarehouse = (warehouseId) => 
    http.get(`/warehouses/${warehouseId}`);

export const getProductsWarehouses = (warehouseId) => 
    http.get(`/warehouses/${warehouseId}/products`);

export const setProductWarehouses = (warehouseId, body) => 
    http.post(`/warehouses/${warehouseId}/product`, body);

export const setProductUpdateWarehouse = (warehouseId, productId, body) => 
    http.patch(`/warehouses/${warehouseId}/product/${productId}`, body);

export const setProductDeleteWarehouse = (warehouseId, productId) => 
    http.delete(`/warehouses/${warehouseId}/product/${productId}`);