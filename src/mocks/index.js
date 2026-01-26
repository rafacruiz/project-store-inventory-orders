
import { setupWorker } from 'msw/browser';
import { handleLoginUser } from './auth';
import { handleListProducts, handleDetailsProduct, handleDeleteProduct, handleCreateProduct } from './products';
import { handleWarehouses, handleWarehouse, handleProductsWarehouse, handleAddProductWarehouse, handleUpdateProductWarehouse, handleDeleteProductWarehouse } from './warehouse';
import { handleStores } from './stores';

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
    handleUpdateProductWarehouse,
    handleDeleteProductWarehouse,
    handleStores);

export default worker;