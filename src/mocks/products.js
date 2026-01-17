
import { http, HttpResponse } from 'msw';
import DefaultProducts from './data/products.json';

const baseApiURL = 'https://fruitproducts.org/api/v1';

const PRODUCTS_LS_KEY = 'products-db';

const products = localStorage.getItem(PRODUCTS_LS_KEY) ? JSON.parse(localStorage.getItem(PRODUCTS_LS_KEY)) : DefaultProducts;

export const handleListProducts = http.get(`${baseApiURL}/products`, () => HttpResponse.json(products));

export const handleDetailsProduct = http.get(`${baseApiURL}/products/:id`, (req) => {
    const { id } = req.params;
    
    const product = products.find((product) => product.uuid === id);

    return HttpResponse.json(product);
});
