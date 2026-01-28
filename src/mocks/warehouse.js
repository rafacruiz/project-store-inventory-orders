
import { http, HttpResponse } from 'msw';
import DefaultWarehouse from './data/warehouses.json';
import { products } from './products';

const baseApiURL = 'https://fruitproducts.org/api/v1';

const WAREHOUSE_LS_KEY = 'warehouse-db';

let warehouses = localStorage.getItem(WAREHOUSE_LS_KEY) ? JSON.parse(localStorage.getItem(WAREHOUSE_LS_KEY)) : DefaultWarehouse;

const store = () => localStorage.setItem(WAREHOUSE_LS_KEY, JSON.stringify(warehouses));

export const handleWarehouses = 
    http.get(`${baseApiURL}/warehouses`, () => HttpResponse.json(warehouses, { status: 200 } ));

export const handleWarehouse = 
    http.get(`${baseApiURL}/warehouses/:id`, (req) => {
        const { id } = req.params;
        const warehouse = warehouses.find(wh => wh.id === id);
        
        if (!warehouse) return HttpResponse.json({ message: 'Warehouse not found' }, { status: 400 });
        
        return HttpResponse.json(warehouse, { status: 200 });
    });

export const handleProductsWarehouse = 
    http.get(`${baseApiURL}/warehouses/:id/products`, (req) => {
        const { id } = req.params;
        const warehouse = warehouses.find(wh => wh.id === id);

        if (!warehouse) return HttpResponse.json({ message: 'Warehouse not found' }, { status: 400 });

        const products = warehouse.products.filter((product) => product.active);

        if (!products) return HttpResponse.json({ message: 'Products of warehouse not found' }, { status: 400 });

        return HttpResponse.json(products, { status: 200 });
    });

export const handleAddProductWarehouse = 
    http.post(`${baseApiURL}/warehouses/:warehouseId/product`, async (req) => {
        const { warehouseId } = req.params;
        const { id } = await req.request.clone().json();

        const warehouse = warehouses.find(wh => wh.id === warehouseId);
        if (!warehouse) return HttpResponse.json({ message: 'Warehouse not found' }, { status: 400 });
        
        const warehouseProduct = warehouse.products.find(product => product.id === id);
        if (warehouseProduct) return HttpResponse.json({ message: 'Product found in warehouse' }, { status: 400 });
        
        const product = products.find((product) => product.id === id);
        if (!product) return HttpResponse.json({ message: 'Product not found' }, { status: 400 });
        
        warehouse.products.push(
            {
                ...product, 
                stock: 0, 
                price: 0, 
                minStock: 0
            });
        store();

        return HttpResponse.json(warehouse, { status: 201 });
    });

export const handleUpdateProductWarehouse = 
    http.patch(`${baseApiURL}/warehouses/:warehouseId/product/:productId`, async (req) => {
        const { warehouseId, productId } = req.params;
        const updates = await req.request.clone().json();

        const warehouse = warehouses.find(wh => wh.id === warehouseId);
        if (!warehouse) return HttpResponse.json({ message: 'Warehouse not found' }, { status: 404 });
        
        const product = warehouse.products.find(product => product.id === productId);
        if (!product) return HttpResponse.json({ message: 'Product not found' }, { status: 404 });

        Object.assign(product, updates);
        store();

        return HttpResponse.json(product, {status: 200});
    });

export const handleDeleteProductWarehouse = 
    http.delete(`${baseApiURL}/warehouses/:warehouseId/product/:productId`, async (req) => {
        const { warehouseId, productId } = req.params;

        const warehouse = warehouses.find(wh => wh.id === warehouseId);
        if (!warehouse) return HttpResponse.json({ message: 'Warehouse not found' }, { status: 404 });
        
        warehouse.products = warehouse.products.filter(product => product.id !== productId);
        store();

        return HttpResponse.json({ message: 'Product successfully removed from the warehouse' }, {status: 200});
    });