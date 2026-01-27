import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import { InputFinder } from "../../../ui";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { ProductList } from '../../products';
import { WarehouseItem } from '../../warehouses';
import * as ShopManager from '../../../../services/shopManager-service';

const inpFinderOption = {
    'id': 'product',
    'placeholder': 'Finder products...'
}

function WarehouseList () {

    const { warehouseId } = useParams();

    const [warehouses, setWarehouses] = useState(null);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        const handleWarehouse = async (warehouseId) => {
            try {
                const warehouse = await ShopManager.getWarehouse(warehouseId);
                setWarehouses(warehouse);    
            } catch (error) {
                console.error(error.message || error);
            }
        };

        handleWarehouse(warehouseId);
    }, [reload, warehouseId]);

    const handleAddItemWarehouse = async (productId) => {
        try {
            await ShopManager.setProductWarehouses(warehouseId, {id: productId});
            const successMessage = 'Product added to the warehouse';
            console.info(successMessage);
            toast.success(successMessage);
            setReload(prev => !prev);
        } catch (error) {
            const errorMessage = error?.message || 'Error added product';;
            console.error(errorMessage);
            toast.error(errorMessage);
        }
    };

    const handleUpdatePriceWarehouse = async (productId, value) => {
        try {
            await ShopManager.setProductUpdateWarehouses(warehouseId, productId, { price: value });
            const successMessage = 'Product price stock updated';
            console.info(successMessage);
            toast.success(successMessage);
            setReload(prev => !prev);
        } catch (error) {
            const errorMessage = error?.message || 'Error price updated product';;
            console.error(errorMessage);
            toast.error(errorMessage);
        }
    }

    const handleUpdateMinStockWarehouse = async (productId, value) => {
        try {
            await ShopManager.setProductUpdateWarehouses(warehouseId, productId, { minStock: value });
            const successMessage = 'Product min. stock updated';
            console.info(successMessage);
            toast.success(successMessage);
            setReload(prev => !prev);
        } catch (error) {
            const errorMessage = error?.message || 'Error min. stock updated product';;
            console.error(errorMessage);
            toast.error(errorMessage);
        }
    }

    const handleUpdateStockWarehouse = async (productId, value) => {
        try {
            await ShopManager.setProductUpdateWarehouses(warehouseId, productId, { stock: value });
            const successMessage = 'Product stock updated!';
            console.info(successMessage);
            toast.success(successMessage);
            setReload(prev => !prev);
        } catch (error) {
            const errorMessage = error?.message || 'Error stock updated product';;
            console.error(errorMessage);
            toast.error(errorMessage);
        }
    };

    const handleToggleActiveWarehouse = async (productId, newActive) => {
        try {
            await ShopManager.setProductUpdateWarehouses(warehouseId, productId, { active: newActive });
            const successMessage = 'Product active status updated!';
            console.info(successMessage);
            toast.success(successMessage);
            setReload(prev => !prev);
        } catch (error) {
            const errorMessage = error?.message || 'Error active status updated product';;
            console.error(errorMessage);
            toast.error(errorMessage);
        }
    };

    const handleDeleteWarehouse = async (productId, active) => {
        if (active) {
            const message = 'Active product cannot be deleted!'
            toast.error(message);
            console.info(message);
            return;
        }

        try {
            await ShopManager.setProductDeleteWarehouses(warehouseId, productId);
            const successMessage = 'Product removed successfully!';
            console.info(successMessage);
            toast.success(successMessage);
            setReload(prev => !prev);
        } catch (error) {
            const errorMessage = error?.message || 'Error deleting product';;
            console.error(errorMessage);
            toast.error(errorMessage);
        }
    };
    
    if (warehouses === null) {
        return (
            <div className="d-flex justify-content-center align-items-center py-4">
                <BounceLoader color="#030404" size={ 35 }  />
            </div>);
    } 
    
    if(warehouses.length === 0){
        return (
            <div className="alert alert-primary d-flex justify-content-center align-items-center gap-2">
                <i className="fa fa-info-circle"></i>
                <span> No warehouses available </span>
            </div>
        );
    }
     
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <small className="fw-semibold text-secondary"> Products in {warehouses.name} Warehouse </small>
            
            <div className="d-flex py-3">                
                <div className="mx-auto w-100">
                    <InputFinder />
                </div>                
            </div>

            <ol className="list-group pt-3">
                { (warehouses.products.length !== 0) 
                    ? warehouses.products
                        .toSorted((a, b) => a.name.localeCompare(b.name))
                        .map((product) => ( 
                        <WarehouseItem 
                            key={ product.id }
                            product={ product }
                            onUpdatePrice={ handleUpdatePriceWarehouse }
                            onUpdateMinStock={ handleUpdateMinStockWarehouse }
                            onUpdateStock= { handleUpdateStockWarehouse } 
                            onToggleActiveWare={ handleToggleActiveWarehouse } 
                            onDeleteWare={ handleDeleteWarehouse }/>
                    )) 
                    : <div className="alert alert-primary d-flex justify-content-center align-items-center gap-2">
                        <i className="fa fa-info-circle"></i>
                        <span> No products found in warehouse "{ warehouses.name }" </span>
                    </div>
                }
            </ol>

            <hr className="border border-secondary" />

            <small className="fw-semibold text-secondary"> Add Products to Inventory </small>
            <ProductList warehouse={ true } addItemWarehouse={ handleAddItemWarehouse }/>
        </>);
    
}

export default WarehouseList;