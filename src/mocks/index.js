
import { setupWorker } from 'msw/browser';
import { handleListProducts, handleDetailsProduct } from './products';

const worker = setupWorker(handleListProducts, handleDetailsProduct);

export default worker;