
import { setupWorker } from 'msw/browser';
import { handlerNoImage } from './images';
import { handleLoginUser } from './auth';
import { handleListProducts, handleDetailsProduct, handleDeleteProduct, handleCreateProduct } from './products';
import { 
    handleWarehouses, 
    handleWarehouse, 
    handleProductsWarehouse, 
    handleAddProductWarehouse, 
    handleUpdateProductWarehouse, 
    handleDeleteProductWarehouse } from './warehouse';
import { handleStores } from './stores';
import { handleOrders, handleOrdersByStore, handleOrdersOpen, handleOrdersById, handleOrdersUpdate, handleOrdersLinesUpdate } from './orders';

const worker = setupWorker(
    handlerNoImage,
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
    handleOrdersByStore,
    handleOrdersOpen,
    handleOrdersById,
    handleOrdersUpdate,
    handleOrdersLinesUpdate);

export default worker;