
import { setupWorker } from 'msw/browser';
import { handleLoginUser } from './auth';
import { handleListProducts, handleDetailsProduct, handleDeleteProduct, handleCreateProduct } from './products';
import { handleWarehouses, handleWarehouse, handleProductsWarehouse, handleAddProductWarehouse, 
    handleUpdateProductWarehouse, handleDeleteProductWarehouse } from './warehouse';
import { handleStores } from './stores';
import { handleOrders, handleOrderByStore, handleOrdersOpen, handleOrdersById, handleOrdersUpdate, handleOrdersLinesUpdate } from './orders';

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
    handleOrdersOpen,
    handleOrdersById,
    handleOrdersUpdate,
    handleOrdersLinesUpdate);

export default worker;