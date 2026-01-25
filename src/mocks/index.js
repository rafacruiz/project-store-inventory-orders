
import { setupWorker } from 'msw/browser';
import { handleLoginUser } from './auth';
import { handleListProducts, handleDetailsProduct, handleDeleteProduct, handleCreateProduct } from './products';
import { handleWarehouses, handleWarehouse, handleProductsWarehouse, handleAddProductWarehouse, handleUpdateProductWarehouse } from './warehouse';

const worker = setupWorker(
    handleListProducts, 
    handleDetailsProduct, 
    handleDeleteProduct, 
    handleCreateProduct, 
    handleLoginUser, 
    handleWarehouses,
    handleWarehouse, 
    handleProductsWarehouse,
    handleAddProductWarehouse,
    handleUpdateProductWarehouse);

export default worker;