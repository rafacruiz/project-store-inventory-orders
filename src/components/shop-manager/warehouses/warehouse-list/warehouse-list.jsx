import { BounceLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { ProductList } from '../../products';
import { WarehouseItem } from '../../warehouses';
import * as ShopManager from '../../../../services/shopManager-service';
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

function WarehouseList () {

    const { warehouseId } = useParams();
    const [warehouses, setWarehouses] = useState([]);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        const handleWarehouse = async (warehouseId) => {
            const warehouse = await ShopManager.getWarehouse(warehouseId);
            setWarehouses(warehouse);
        };

        handleWarehouse(warehouseId);
    }, [reload]);

    const handleAddItemWarehouse = async (productId) => {
        try {
            await ShopManager.setProductWarehouses(warehouseId, {id: productId});
            console.info('Product added to the warehouse');
            toast.success('Product added to the warehouse!');
            setReload(prev => !prev);
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    };

    const handleUpdateStockWarehouse = async (productId, value) => {
        try {
            await ShopManager.setProductUpdateWarehouses(warehouseId, productId, { stock: value });
            console.log('Product stock updated');
            toast.success('Product stock updated!');
            setReload(prev => !prev);
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    };

    const handleToggleActiveWarehouse = async (productId, newActive) => {
        try {
            await ShopManager.setProductUpdateWarehouses(warehouseId, productId, { active: newActive });
            console.info('Product active status updated');
            toast.success('Product active status updated!');
            setReload(prev => !prev);
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    };

    const handleDeleteWarehouse = async (productId) => {
        try {
            await ShopManager.setProductDeleteWarehouses(warehouseId, productId);
            console.info('Product removed successfully');
            toast.success('Product removed successfully!');
            setReload(prev => !prev);
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    };
    
    if (!warehouses || warehouses.length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center py-4">
                <BounceLoader color="#030404" size={ 35 }  />
            </div>);
    } else {
        return (
            <>
                <Toaster position="top-center" reverseOrder={false} />
                <small className="fw-semibold text-secondary"> Products in {warehouses.name} Warehouse </small>
                <ol className="list-group pt-3">
                    { (warehouses.products.length !== 0) 
                        ? warehouses.products
                            .toSorted((a, b) => a.name.localeCompare(b.name))
                            .map((product) => ( 
                            <WarehouseItem 
                                key={ product.id }
                                product={ product }
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
}

export default WarehouseList;