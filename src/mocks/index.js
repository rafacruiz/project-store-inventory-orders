
import { setupWorker } from 'msw/browser';
import { handleListProducts, handleDetailsProduct, handleDeleteProduct, handleCreateProduct } from './products';

const worker = setupWorker(handleListProducts, handleDetailsProduct, handleDeleteProduct, handleCreateProduct);

export default worker;