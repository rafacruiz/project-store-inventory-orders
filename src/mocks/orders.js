
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
    http.get(`${baseApiURL}/orders/:orderId/lines`, (req) => {
        const { orderId } = req.params;

        if (!orderId) return HttpResponse.json(
            { message: 'orderId are required' }, { status: 400 } );

        const orderLines = orders.find((order) => 
            order.id === orderId
            && order.status === 'open');

        if (!orderLines) return HttpResponse.json( 
            { message: 'Order lines not found' }, { status: 400 } );
        
        return HttpResponse.json(orderLines, { status: 201 });
    });

export const handleOrdersLinesUpdate = 
    http.patch(`${baseApiURL}/orders/:orderId/lines`, async (req) => {
        const { orderId } = req.params;
        const updates = await req.request.clone().json();

        if (!orderId) return HttpResponse.json(
            { message: 'orderId are required' }, { status: 400 } );
        
        if (!Array.isArray(updates.lines)) return HttpResponse.json( 
            { message: 'Lines must be an array' }, { status: 400 } );
        
        const order = orders.find((order) => 
            order.id === orderId
            && order.status === 'open');

        if (!order) return HttpResponse.json( 
            { message: 'Order lines not found' }, { status: 400 } );

        updates.lines.forEach(({ productId, quantity }) => {
            const line = order.lines.find(l => l.productId === productId);
            if (line) line.quantity = quantity;
            else order.lines.push({ productId, quantity });
        });
        
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