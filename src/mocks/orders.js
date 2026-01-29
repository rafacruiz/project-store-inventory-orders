
import { http, HttpResponse } from 'msw';

const baseApiURL = 'https://fruitproducts.org/api/v1';

const ORDERS_LS_KEY = 'orders-db';

const DefaultOrders = [];

export let orders = localStorage.getItem(ORDERS_LS_KEY) ? JSON.parse(localStorage.getItem(ORDERS_LS_KEY)) : DefaultOrders;

const store = () => localStorage.setItem(ORDERS_LS_KEY, JSON.stringify(orders));


export const handleOrdersOpen = 
    http.post('/orders/open', async ({ request }) => {
        const { storeId, warehouseId } = await request.json();

        const order = {
            id: crypto.randomUUID(),
            storeId,
            warehouseId,
            status: 'open',
            createdAt: new Date().toISOString(),
            lines: []
        };

        orders.push(order);
        saveOrders();

        return HttpResponse.json(order, { status: 201 });
    });

export const handleOrders = 
    http.get(`${baseApiURL}/orders`, () => {

        return HttpResponse.json(orders, { status: 200 })
    });

export const handleOrder = 
    http.get(`${baseApiURL}/orders/:id`, (req) => {
        const { id } = req.params;

        const orderShop = orders.filter((order) => order.id === id);
        if (!orderShop) {
            return HttpResponse.json({ message: 'Orders not found' }, { status: 400 });
        }

        return HttpResponse.json(orderShop, { status: 200 })
    });

export const handleAddOrdersShop = 
    http.patch(`${baseApiURL}/orders`, async (req) => {
        const updates = await req.request.clone().json();
        
        if (!updates) {
            return HttpResponse.json({ message: 'Orders empty' }, { status: 400 });
        }

        Object.assign(orders, updates);
        store();

        return HttpResponse.json(update, {status: 200});
    });