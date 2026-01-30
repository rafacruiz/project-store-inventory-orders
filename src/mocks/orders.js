
import { http, HttpResponse } from 'msw';

const baseApiURL = 'https://fruitproducts.org/api/v1';

const ORDERS_LS_KEY = 'orders-db';

let orders = localStorage.getItem(ORDERS_LS_KEY) ? JSON.parse(localStorage.getItem(ORDERS_LS_KEY)) : [];

const store = () => localStorage.setItem(ORDERS_LS_KEY, JSON.stringify(orders));

export const handleOrders = 
    http.get(`${baseApiURL}/orders`, () => 
        HttpResponse.json(orders.toSorted((a, b) => a.status.localeCompare(b.status)), { status: 200 }));

export const handleOrderByStore = 
    http.get(`${baseApiURL}/orders/store/:storeId`, (req) => {
        const { storeId } = req.params;

        const storeOrders  = orders
            .filter((order) => String(order.storeId) === String(storeId))
            .toSorted((a, b) => b.status.localeCompare(a.status));
        
        return HttpResponse.json(storeOrders , { status: 200 });
    });

export const handleOrdersOpen = 
    http.post(`${baseApiURL}/orders/open`, async (req) => {
        const { storeId, warehouseId } = await req.request.clone().json();

        if (!storeId || !warehouseId) return HttpResponse.json(
            { message: 'storeId and warehouseId are required' }, { status: 400 } );
        
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

export const handleOrdersById = 
    http.get(`${baseApiURL}/orders/:orderId`, (req) => {
        const { orderId } = req.params;

        if (!orderId) return HttpResponse.json(
            { message: 'orderId are required' }, { status: 400 } );

        const order = orders.find((order) => order.id === orderId);
        if (!order) return HttpResponse.json( 
            { message: 'Order not found' }, { status: 400 } );
        
        return HttpResponse.json(order, { status: 201 });
    });

export const handleOrdersLinesUpdate = 
    http.patch(`${baseApiURL}/orders/:orderId/lines`, async (req) => {
        const { orderId } = req.params;
        const updates = await req.request.clone().json();

        if (!orderId) return HttpResponse.json(
            { message: 'orderId are required' }, { status: 400 } );
        
        const order = orders.find((order) => 
            order.id === orderId
            && order.status === 'open');

        if (!order) return HttpResponse.json( 
            { message: 'Order lines not found' }, { status: 400 } );

        updates.forEach(({ id, quantity }) => {
            const line = order.lines.find(line => line.id === id);
            if (line) line.quantity = quantity
            else order.lines.push(...updates);
        });

        order.total = order.lines.reduce((sum, line) => sum + (line.quantity * (line.price.toFixed(2) || 0)), 0);
        
        store();

        return HttpResponse.json({order, message: 'Order line updated'}, { status: 201 });
    });

export const handleOrdersUpdate = 
    http.patch(`${baseApiURL}/orders/:orderId/warehouse/:warehouseId`, async (req) => {
        const { orderId, warehouseId } = req.params;
        const updates = await req.request.clone().json();

        if (!orderId || !warehouseId) return HttpResponse.json(
            { message: 'orderId and warehouseId are required' }, { status: 400 } ); 

        const orderUpdate = orders.find((order) => 
            order.id === orderId
            && order.warehouseId === warehouseId 
            && order.status === 'open');

        if (!orderUpdate) return HttpResponse.json( 
            { message: 'Order not found' }, { status: 400 } );

        Object.assign(orderUpdate, updates);
        store();

        return HttpResponse.json({ 
            updates, 
            message: (updates?.status === 'closed') 
                ? 'Order closed successfully' 
                : 'Order modified successfully' 
            }, 
            { status: 201 }
        );
    });