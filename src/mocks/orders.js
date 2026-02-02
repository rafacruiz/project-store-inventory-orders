
import { http, HttpResponse } from 'msw';

const baseApiURL = 'https://fruitproducts.org/api/v1';

const ORDERS_LS_KEY = 'orders-db';

let orders = localStorage.getItem(ORDERS_LS_KEY) ? JSON.parse(localStorage.getItem(ORDERS_LS_KEY)) : [];

const store = () => localStorage.setItem(ORDERS_LS_KEY, JSON.stringify(orders));

export const handleOrders = 
    http.get(`${baseApiURL}/orders`, (req) => {
        if (!orders) return HttpResponse.json({ message: 'Orders not found' }, { status: 400 } );

        const url = new URL(req.request.url)
        const statusOrders = url?.searchParams.get('status');
        const sortOrders = url?.searchParams.get('sort') || 'asc';

        let filterOrders = orders;
        if (statusOrders) {
            filterOrders = orders.filter((order) => order.status === statusOrders);
        }

        if (sortOrders === 'asc') filterOrders.toSorted((a, b) => a.id.localeCompare(b.id))
        else if (sortOrders === 'desc') filterOrders.toSorted((a, b) => b.id.localeCompare(a.id));

        return HttpResponse.json(filterOrders, { status: 200 });
    });
        
export const handleOrdersByStore = 
    http.get(`${baseApiURL}/orders/store/:storeId`, (req) => {
        const { storeId } = req.params;

        let storeOrders = orders
            .filter((order) => String(order.storeId) === String(storeId));

        const url = new URL(req.request.url)
        const sortBy = url?.searchParams.get('sortBy') || 'status';
        const orderBy = url?.searchParams.get('orderBy') || 'desc';

        const allowedFields = ['status', 'createdAt']
        const allowedOrders = ['ASC', 'DESC']

        if (!allowedFields.includes(sortBy)) {
            return HttpResponse.json({message: 'Invalid sort field'}, { status: 400 });
        }

        if (!allowedOrders.includes(orderBy.toUpperCase())) {
            return HttpResponse.json({message: 'Invalid sort order'}, { status: 400 });
        }

        if (sortBy === 'status') {
            storeOrders = storeOrders.toSorted((a, b) => {
                if (orderBy === 'asc') return a.status.localeCompare(b.status);
                return b.status.localeCompare(a.status);
            });
        } else if (sortBy === 'createdAt') {
            storeOrders = storeOrders.toSorted((a, b) => {
                if (orderBy === 'asc') return new Date(a.createdAt) - new Date(b.createdAt);
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        }
        
        return HttpResponse.json(storeOrders, { status: 200 });
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

export const handleOrdersDelete = 
    http.delete(`${baseApiURL}/orders/:orderId/warehouses/:warehouseId`, (req) => {
        const { orderId, warehouseId } = req.params;

        if (!orderId || !warehouseId) return HttpResponse.json(
            { message: 'orderId and warehouseId are required' }, { status: 400 } );

        orders = orders.filter((order) => !order.id.includes(orderId) && order.warehouseId.includes(warehouseId));
        store();

        return HttpResponse.json({orders, message: 'Order deleted'}, {status: 200});
    });