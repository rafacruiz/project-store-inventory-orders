import { http, HttpResponse } from 'msw';
import DefaultWarehouse from './data/warehouses.json';
import { products } from './products';

const baseApiURL = 'https://fruitproducts.org/api/v1';

const WAREHOUSE_LS_KEY = 'warehouse-db';

let warehouses = localStorage.getItem(WAREHOUSE_LS_KEY) ? JSON.parse(localStorage.getItem(WAREHOUSE_LS_KEY)) : DefaultWarehouse;

const store = () => localStorage.setItem(WAREHOUSE_LS_KEY, JSON.stringify(warehouses));

export const handleWarehouses = http.get(`${baseApiURL}/warehouses`, () => 
    HttpResponse.json(warehouses, { status: 200 } ));

export const handleWarehouse = http.get(`${baseApiURL}/warehouses/:id`, (req) => {
    const { id } = req.params;
    const warehouse = warehouses.find(wh => wh.id === id);
    
    return HttpResponse.json(warehouse, { status: 200 });
});

export const handleProductsWarehouse = http.get(`${baseApiURL}/warehouses/:id`, (req) => {
    const { id } = req.params;
    const warehouse = warehouses.find(wh => wh.id === id);

    return HttpResponse.json(warehouse.products, { status: 200 });
});

export const handleAddProductWarehouse = http.post(`${baseApiURL}/warehouses/:warehouseId/product`, async (req) => {
    const { warehouseId } = req.params;
    const { id } = await req.request.clone().json();

    const warehouse = warehouses.find(wh => wh.id === warehouseId);

    //const warehouseProduct = warehouses.find(wh => wh.product.id === id);

    //if (!warehouseProduct) {
        const product = products.find((product) => product.id === id);
        warehouse.products.push(product);
        store();

        return HttpResponse.json(warehouse, { status: 201 });
});

export const handleUpdateProductWarehouse = 
    http.patch(`${baseApiURL}/warehouses/:warehouseId/product/:productId`, async (req) => {
        const { warehouseId, productId } = req.params;
        const { active } = await req.request.clone().json();

        const warehouse = warehouses.find(wh => wh.id === warehouseId);
        if (!warehouse) {
          return HttpResponse.json({ message: 'Warehouse not found' }, { status: 404 });
        }

        const product = warehouse.products.find(product => product.id === productId);
        if (!product) {
            return HttpResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        if (active) product.active = !product.active;

        store();

        return HttpResponse.json(product, {status: 200});
    });

