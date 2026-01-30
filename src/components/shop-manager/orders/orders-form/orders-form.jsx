
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { InputFinder } from "../../../ui";
import { useEffect, useState } from "react";
import OrdersItem from "../orders-item/orders-item";
import * as ShopManager from '../../../../services/shopManager-service';

const inpFinderOption = {
    'id': 'ordersProducts',
    'placeholder': 'Finder products...'
}

const Loader = () => (
    <div className="d-flex justify-content-center align-items-center py-4">
        <BounceLoader color="#030404" size={ 35 } />
    </div>
);

const AlertMessage = ({ message }) => (
    <div className="alert alert-primary d-flex justify-content-center align-items-center gap-2">
        <i className="fa fa-info-circle"></i>
        <span> { message } </span>
    </div>
);

function useOrderNavigation() {
    const { state } = useLocation();
    const params = useParams();

    return {
        orderId: state?.order?.id ?? params.detailOrderId,
        warehouseId: state?.order?.warehouseId ?? params.detailWarehouseId
    };
}

function OrdersForm () {

    const { orderId, warehouseId } = useOrderNavigation();
    
    const [products, setProduct] = useState(null);
    const [order, setOrder] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchProductStore = async (warehouseId) => {
            try {
                const products = await ShopManager.getProductsWarehouses(warehouseId);
                setProduct(products);
            } catch (error) {
                const message = error?.message || 'Error fetching products';
                console.error(message);
                toast.error(message);
            }
        }

        if (warehouseId) fetchProductStore(warehouseId);
    }, [warehouseId]);

    useEffect(() => {
        const fetchOrderLines = async () => {
            try {
                const order = await ShopManager.getOrdersById(orderId);
                setOrder(order);    
            } catch (error) {
                const message = error?.message || 'Error fetching order lines';
                console.error(message);
                toast.error(message);
            }
        };

        fetchOrderLines();
    }, []);

    if (products === null) return <Loader />;

    return (
        <div className="d-flex flex-column py-3">
            <Toaster position="top-center" reverseOrder={false} />
            <small className="fw-semibold text-secondary mb-2"> Orders { orderId } </small>

            { order.status === 'closed' 
            ? ( <AlertMessage message='The order is closed. You cannot add products.' /> )
            : products?.length ? (
                <>
                    <div className="mx-auto w-100 py-3">
                        <InputFinder onChange={ setSearch } inputOption={ inpFinderOption } />
                    </div>                
                
                    <ol className="list-group pt-3">
                        {products
                            ?.filter((product) => product.active && product.name.toLowerCase().includes(search.toLowerCase()))
                            .map((product) => (
                                <OrdersItem
                                    key={ product.id }
                                    order={ order }
                                    product={ product }
                                />                        
                            ))
                        }
                    </ol>
                </>      
            ) : ( <AlertMessage message='No products orders available' /> )}
        </div>
    );
}

export default OrdersForm;