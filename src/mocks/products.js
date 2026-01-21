
import { http, HttpResponse } from 'msw';
import DefaultProducts from './data/products.json';

const baseApiURL = 'https://fruitproducts.org/api/v1';

const PRODUCTS_LS_KEY = 'products-db';

let products = localStorage.getItem(PRODUCTS_LS_KEY) ? JSON.parse(localStorage.getItem(PRODUCTS_LS_KEY)) : DefaultProducts;

const store = () => localStorage.setItem(PRODUCTS_LS_KEY, JSON.stringify(products));

export const handleListProducts = http.get(`${baseApiURL}/products`, () => {
    store();
    return HttpResponse.json(products);
});

export const handleDetailsProduct = http.get(`${baseApiURL}/products/:id`, (req) => {
    const { id } = req.params;
    const product = products.find((product) => product.uuid === id);
    
    return HttpResponse.json(product);
});

export const handleDeleteProduct = http.delete(`${baseApiURL}/products/:id`, (req) => {
    const { id } = req.params;
    products = products.filter((product) => !product.uuid.includes(id));
    store();

    return HttpResponse.json(products);
});

export const handleCreateProduct = http.post(`${baseApiURL}/products`, async (req) => {
    let product = await req.request.clone().json();
    
    product = {
        'uuid': self.crypto.randomUUID().toString(),
        'name': product.NameProduct,
        'description': product.DescriptionProduct,
        'imageUrl': product.ImageProduct,
        'category': product.CategoryProduct,
    }

    products.push(product);
    store();
   
    return HttpResponse.json(product, { status: 201 });
});