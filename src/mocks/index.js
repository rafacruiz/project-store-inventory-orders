
import { setupWorker } from 'msw/browser';
import { handleListProducts, handleDetailsProduct, handleDeleteProduct, handleCreateProduct } from './products';
import { handleLoginUser } from './auth';

const worker = setupWorker(handleListProducts, handleDetailsProduct, handleDeleteProduct, handleCreateProduct, handleLoginUser);

export default worker;