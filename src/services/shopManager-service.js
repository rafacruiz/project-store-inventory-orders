import axios from "axios";
import { body } from "motion/react-client";

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

export const getProducts = async () =>  
    http.get('/products');

export const getProductId = (id) => 
    http.get(`/products/${id}`);

export const setProductCreate = (data) => 
    http.post('/products', data);

export const setProductDelete = (id) => 
    http.delete(`/products/${id}`);

export const getWarehouses = () => 
    http.get('/warehouses');

export const getWarehouse = (warehouseId) => 
    http.get(`/warehouses/${warehouseId}`);

export const getProductsWarehouses = (warehouseId) => 
    http.get(`/warehouses/${warehouseId}/products`);

export const setProductWarehouses = (warehouseId, body) => 
    http.post(`/warehouses/${warehouseId}/product`, body);

export const setProductUpdateWarehouses = (warehouseId, productId, body) => 
    http.patch(`/warehouses/${warehouseId}/product/${productId}`, body);

export const setProductDeleteWarehouses = (warehouseId, productId) => 
    http.delete(`/warehouses/${warehouseId}/product/${productId}`);

export const getStores = () =>
    http.get('/stores');

export const getOrders = (options = {}) =>
    http.get('/orders', {
        params: { 
            sort: options?.sort,
            status: options?.status }
    });

export const getOrdersByStore = (storeId) => 
    http.get(`/orders/store/${storeId}`);

export const setOrdersOpen = (body) => 
    http.post(`/orders/open`, body);

export const getOrdersById = (orderId) =>
    http.get(`/orders/${orderId}`);

export const setOrdersUpdate = (orderId, warehouseId, body) =>
    http.patch(`/orders/${orderId}/warehouse/${warehouseId}`, body);

export const setOrdersLinesUpdate = (orderId, body) =>
    http.patch(`/orders/${orderId}/lines`, body);

export const setOrdersDelete = (orderId, warehouseId) => 
    http.delete(`/orders/${orderId}/warehouses/${warehouseId}`);