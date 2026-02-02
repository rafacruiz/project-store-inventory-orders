
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import { AlertMessage, ButtonBack, InputFinder, Loader } from "../../../ui";
import { useEffect, useState } from "react";
import OrdersItem from "../orders-item/orders-item";
import * as ShopManager from '../../../../services/shopManager-service';

const inpFinderOption = {
    'id': 'ordersProducts',
    'placeholder': 'Finder products...'
}

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
            <small className="fw-semibold text-secondary mb-2"> Order #{ orderId } </small>

            { order.status === 'closed' 
            ? ( <AlertMessage message='The order is closed. You cannot add products.' /> )
            : products?.length ? (
                <>
                    <div className="d-flex py-3">
                        <div className="me-2"> <ButtonBack to={'/stores/orders'} /> </div>
                        <div className="mx-auto w-100">
                            <InputFinder onChange={ setSearch } inputOption={ inpFinderOption } />
                        </div>                
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