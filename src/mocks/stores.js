
import { http, HttpResponse } from 'msw';
import DEFAULT_STORES from './data/users.json';


const baseApiURL = 'https://fruitproducts.org/api/v1';

const STORES_LS_KEY = 'stores-db';

export let stores = localStorage.getItem(STORES_LS_KEY) ? JSON.parse(localStorage.getItem(STORES_LS_KEY)) : DEFAULT_STORES;

const store = () => localStorage.setItem(STORES_LS_KEY, JSON.stringify(stores));

export const handleStores = 
    http.get(`${baseApiURL}/stores`, () => {
        const storesData = stores.filter((store) => store.role !== 'admin');
        
        if (!storesData) return HttpResponse.json({ message: 'Stores not found' }, { status: 400 });
        
        store();

        return HttpResponse.json(storesData, { status: 200 } );
    });