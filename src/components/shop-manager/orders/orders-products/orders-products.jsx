
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BounceLoader } from "react-spinners";
import { InputFinder } from "../../../ui";
import { useAuth } from '../../../../contexts';
import * as ShopManager from '../../../../services/shopManager-service';
import OrdersItem from "../orders-item/orders-item";

const inpFinderOption = {
    'id': 'ordersProducts',
    'placeholder': 'Finder products...'
}

function OrdersProducts () {

    const { user } = useAuth();

    const [products, setProduct] = useState(null);
    const [search, setSearch] = useState('');
    const [reload, setReload] = useState(true);

    useEffect(() => {
        const fetchProductStore = async (warehouseId) => {
            const products = await ShopManager.getProductsWarehouses(warehouseId);
            setProduct(products);
        }

        if (user?.warehouseId) fetchProductStore(user?.warehouseId);
    }, [user?.warehouseId]);

    if (products === null) {
        return (
            <div className="d-flex justify-content-center align-items-center py-4">
                <BounceLoader color="#030404" size={ 35 }  />
            </div>);
    }

    if (products.length === 0) {
        return (
            <div className="alert alert-primary d-flex justify-content-center align-items-center gap-2">
                <i className="fa fa-info-circle"></i>
                <span> No products orders available </span>
            </div>
        );
    }
    
    return (
        <>
            <div className="d-flex flex-column py-3">
                <Toaster position="top-center" reverseOrder={false} />
                
                <small className="fw-semibold text-secondary mb-2"> Orders products </small>
            
                <div className="mx-auto w-100">
                    <InputFinder onChange={ setSearch } inputOption={ inpFinderOption } />
                </div>                
            
                <ol className="list-group pt-3">
                    {products
                        ?.filter((product) => product.active && product.name.toLowerCase().includes(search.toLowerCase()))
                        .toSorted((a, b) => a.name.localeCompare(b.name))
                        .map((product) => (
                            <OrdersItem
                                key={ product.id }
                                product={ product }
                            />                        
                        ))
                    }
                </ol>
            </div>
        </>);
}

export default OrdersProducts;