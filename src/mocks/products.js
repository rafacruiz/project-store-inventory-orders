
import { http, HttpResponse } from 'msw';
import DefaultProducts from './data/products.json';

const baseApiURL = 'https://fruitproducts.org/api/v1';

const PRODUCTS_LS_KEY = 'products-db';

export let products = localStorage.getItem(PRODUCTS_LS_KEY) ? JSON.parse(localStorage.getItem(PRODUCTS_LS_KEY)) : DefaultProducts;

const store = () => localStorage.setItem(PRODUCTS_LS_KEY, JSON.stringify(products));

export const handleListProducts = 
    http.get(`${baseApiURL}/products`, async () => {
    
        store();
    
        await new Promise((r) => setTimeout(r, 2000)); // DELETE

        return HttpResponse.json(products);
    });

export const handleDetailsProduct = 
    http.get(`${baseApiURL}/products/:id`, (req) => {
        const { id } = req.params;
        
        const product = products.find((product) => product.id === id);
        if (!product) return HttpResponse.json({ message: 'Error details product' }, { status: 404 });
        
        return HttpResponse.json(product);
    });

export const handleDeleteProduct = 
    http.delete(`${baseApiURL}/products/:id`, (req) => {
        const { id } = req.params;
        
        products = products.filter((product) => !product.id.includes(id));
        if (!products) return HttpResponse.json({ message: 'Error delete product' }, { status: 404 });

        store();

        return HttpResponse.json(products);
    });

export const handleCreateProduct = 
    http.post(`${baseApiURL}/products`, async (req) => {
        let product = await req.request.clone().json();
        
        product = {
            'id': self.crypto.randomUUID().toString(),
            'name': product.nameProduct,
            'description': product.descriptionProduct,
            'imageUrl': product.imageProduct,
            'category': product.categoryProduct,
        }

        products.push(product);
        store();
    
        return HttpResponse.json(product, { status: 201 });
    });