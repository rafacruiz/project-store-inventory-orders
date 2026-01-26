import { http, HttpResponse } from 'msw';
import DefaultStores from './data/users.json';

const baseApiURL = 'https://fruitproducts.org/api/v1';

const STORES_LS_KEY = 'stores-db';

let stores = localStorage.getItem(STORES_LS_KEY) ? JSON.parse(localStorage.getItem(STORES_LS_KEY)) : DefaultStores;

const store = () => localStorage.setItem(STORES_LS_KEY, JSON.stringify(stores));

export const handleStores = http.get(`${baseApiURL}/stores`, () => {

    const storesShop = stores.filter((shop) => shop.role !== 'admin');
    if (!storesShop) {
        return HttpResponse.json({ message: 'Stores not found' }, { status: 404 });
    }

    return HttpResponse.json(storesShop, { status: 200 } );
});