
import { http, HttpResponse } from 'msw';
import DEFAULT_STORES from './data/users.json';

import { orders } from './orders';

const baseApiURL = 'https://fruitproducts.org/api/v1';

const STORES_CURRENT_LS_KEY = 'userCurrent-db';
const STORES_LS_KEY = 'stores-db';

export let storesCurrent = localStorage.getItem(STORES_CURRENT_LS_KEY) && JSON.parse(localStorage.getItem(STORES_CURRENT_LS_KEY));
export let stores = localStorage.getItem(STORES_LS_KEY) ? JSON.parse(localStorage.getItem(STORES_LS_KEY)) : DEFAULT_STORES;

const storeCurrent = () => localStorage.setItem(STORES_CURRENT_LS_KEY, JSON.stringify(storesCurrent));
const store = () => localStorage.setItem(STORES_LS_KEY, JSON.stringify(stores));

export const handleStores = 
    http.get(`${baseApiURL}/stores`, () => {
        const storesData = stores.filter((store) => store.role !== 'admin');
        
        if (!storesData) return HttpResponse.json({ message: 'Stores not found' }, { status: 400 });
        
        store();

        return HttpResponse.json(storesData, { status: 200 } );
    });

export const handleStoresOrders = 
    http.get(`${baseApiURL}/stores/:storeId/orders`, (req) => {
        const { storeId } = req.params;

        if (storesCurrent.id !== storeId) return HttpResponse.json({ message: 'Orders store not found' }, { status: 400 });

        return HttpResponse.json(storesCurrent.order, { status: 200 });
    });

export const handleStoreOrderOpen = 
    http.post(`${baseApiURL}/stores/:storeId/open`, async (req) => {
        const { storeId } = req.params;

        const warehouse = await req.request.clone().json();

        const now = new Date().toISOString();

        if (!storesCurrent) return HttpResponse.json({ message: 'Store not found' }, { status: 400 });
        
        storesCurrent.order.push({
            'id': crypto.randomUUID(),
            'storeId': storeId,
            'warehouseId': warehouse.warehouseId,
            'date': now,
            'status': 'pending',
            'lines': [],
            'total': 0
        });

        storeCurrent();

        return HttpResponse.json(store, { status: 201 });
    });