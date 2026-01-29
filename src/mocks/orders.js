
import { http, HttpResponse } from 'msw';

const baseApiURL = 'https://fruitproducts.org/api/v1';

const ORDERS_LS_KEY = 'orders-db';

let orders = localStorage.getItem(ORDERS_LS_KEY) ? JSON.parse(localStorage.getItem(ORDERS_LS_KEY)) : [];

const store = () => localStorage.setItem(ORDERS_LS_KEY, JSON.stringify(orders));

export const handleOrders = 
    http.get(`${baseApiURL}/orders`, () => HttpResponse.json(orders, { status: 200 }));

export const handleOrderByStore = 
    http.get(`${baseApiURL}/orders/store/:storeId`, (req) => {
        const { storeId } = req.params;

        const storeOrders  = orders.filter((order) => String(order.storeId) === String(storeId));
        
        return HttpResponse.json(storeOrders , { status: 200 });
    });

export const handleOrdersOpen = 
    http.post(`${baseApiURL}/orders/open`, async (req) => {
        const { storeId, warehouseId } = await req.request.clone().json();

        if (!storeId || !warehouseId) {
            return HttpResponse.json(
                { message: 'storeId and warehouseId are required' },
                { status: 400 }
            );
        }

        const order = {
            id: crypto.randomUUID(),
            storeId,
            warehouseId,
            status: 'open',
            createdAt: new Date().toISOString(),
            lines: [],
            total: 0
        };

        orders.push(order);
        store();

        return HttpResponse.json(order, { status: 201 });
    });

export const handleOrdersAddProduct = 
    http.patch(`${baseApiURL}/orders`, async (req) => {
        const updates = await req.request.clone().json();
        
        if (!updates) return HttpResponse.json({ message: 'Orders empty' }, { status: 400 });

        // hay que buscar el pedido y actualizarlo

        Object.assign(orders, updates);
        store();

        return HttpResponse.json(updates, {status: 200});
    });