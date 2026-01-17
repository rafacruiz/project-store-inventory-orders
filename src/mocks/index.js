
import { setupWorker } from 'msw/browser';
import { handleListProducts, handleDetailsProduct, handleDeleteProduct } from './products';

const worker = setupWorker(handleListProducts, handleDetailsProduct, handleDeleteProduct);

export default worker;