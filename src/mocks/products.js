
import { http, HttpResponse } from 'msw';
import DefaultProducts from './data/products.json';

const baseApiURL = 'https://fruitproducts.org/api/v1';

const PRODUCTS_LS_KEY = 'products-db';

const products = localStorage.getItem(PRODUCTS_LS_KEY) ? JSON.parse(localStorage.getItem(PRODUCTS_LS_KEY)) : DefaultProducts;

export const handleList = http.get(`${baseApiURL}/products`, () => HttpResponse.json(products));
