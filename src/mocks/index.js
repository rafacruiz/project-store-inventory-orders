
import { setupWorker } from 'msw/browser';
import { handleLoginUser } from './auth';
import { handleListProducts, handleDetailsProduct, handleDeleteProduct, handleCreateProduct } from './products';
import { handleWarehouses, handleWarehouse, handleProductsWarehouse, handleAddProductWarehouse, handleUpdateProductWarehouse, handleDeleteProductWarehouse } from './warehouse';
import { handleStores } from './stores';
import { handleOrders, handleOrderByStore, handleOrdersOpen } from './orders';

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
    handleStores,
    handleOrders,
    handleOrderByStore,
    handleOrdersOpen);

export default worker;