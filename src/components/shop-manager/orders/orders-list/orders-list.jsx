
import { BounceLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useAuth } from '../../../../contexts';
import toast, { Toaster } from "react-hot-toast";
import * as ShopManager from '../../../../services/shopManager-service';
import { pre } from "motion/react-client";

const inpFinderOption = {
    'id': 'orders',
    'placeholder': 'Finder orders...'
}

function OrdersList () {

    const { user } = useAuth();

    const [orderCurrent, setOrderCurrent] = useState(null);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchStoreOrders = async (id) => {
            const orders = await ShopManager.getStoresOrders(id);
            setOrderCurrent(orders);
        };

        fetchStoreOrders(user.id);
    }, []);

    if (orderCurrent === null) {
        return (
            <div className="d-flex justify-content-center align-items-center py-4">
                <BounceLoader color="#030404" size={ 35 }  />
            </div>);
    }

    const handleOrderOpen = async () => {
        try {
            const order = await ShopManager.setStoreOrderOpen(user.id, { warehouseId: user.warehouseId });
            setOrderCurrent(order);
            setReload(prev => !prev);
            const message = 'Order open!';
            console.info(message);
            toast.success(message);
        } catch (error) {
            const message = error?.message || 'Error open orders';
            console.error(message);
            toast.success(message);
        }
    };

    console.log(orderCurrent);

    if (orderCurrent.length === 0 ) {
        return (
            <div className="d-flex flex-column py-3">
                <Toaster position="top-center" reverseOrder={false} />
                
                <small className="fw-semibold text-secondary"> Orders store </small>

                <div className="py-2">
                    <button 
                        className="btn btn-success w-100"
                        onClick={() => handleOrderOpen() }
                        >Open order</button>
                </div>

                <div className="alert alert-primary d-flex justify-content-center align-items-center gap-2">
                    <i className="fa fa-info-circle"></i>
                    <span> No order open </span>
                </div>
            </div>
        );   
    } else {
        return (<>order current</>);
    }   
}

export default OrdersList;