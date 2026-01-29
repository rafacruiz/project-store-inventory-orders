
import { BounceLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useAuth } from '../../../../contexts';
import toast, { Toaster } from "react-hot-toast";
import { InputFinder } from "../../../ui";
import * as ShopManager from '../../../../services/shopManager-service';
import { useNavigate } from "react-router-dom";

const inpFinderOption = {
    'id': 'orders',
    'placeholder': 'Finder orders...'
}

function OrdersList () {

    const { user } = useAuth();

    const navigate = useNavigate();

    const [orders, setOrders] = useState(null);
    const [search, setSearch] = useState('');
    
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersData = await ShopManager.getOrderByStore(user?.id);
                setOrders(ordersData);
                const message = 'Orders loading successfully';
                console.log(message);
            } catch (error) {
                console.error(error?.message || 'Error fetching orders');
            }
        }

        if (user?.id) fetchOrders(user?.id);
    }, [user?.id]);

    if (orders === null) {
        return (
            <div className="d-flex justify-content-center align-items-center py-4">
                <BounceLoader color="#030404" size={ 35 }  />
            </div>);
    }

    const handleStatusOrder = (isOpen) => {
        if (isOpen) {
            const fetchOrdersByStore = async () => {
                try {
                    const newOrder = await ShopManager.setOrdersOpen({storeId: user?.id, warehouseId: user?.warehouseId});
                    const message = 'Order opened successfully';
                    console.log(message);
                    navigate('/stores/orders/new/' + newOrder.id, 
                        { state: { order: newOrder } });
                } catch (error) {
                    console.error(error?.message || 'Error fetching orders');
                    toast.error(error?.message || 'Error opening order');
                }
            };
            fetchOrdersByStore();
        } else {
            console.log('Close order');
        }
    }

    return (
        <div className="d-flex flex-column py-2">
            <Toaster position="top-right" reverseOrder={false} />
            <small className="fw-semibold text-secondary"> Orders </small>

            <div className="py-2">
                <button className="btn btn-primary w-100" onClick={() => handleStatusOrder(true) }>Open order</button>
            </div>
            
            {(orders.length !== 0) ? (
                <>
                    <div className="d-flex py-3">                
                        <div className="mx-auto w-100">
                            <InputFinder onChange={ setSearch } inputOption={ inpFinderOption } />
                        </div>                
                    </div>

                    <ol className="list-group pt-3">
                        {orders
                        .filter((order) => order.id.toLowerCase().includes(search.toLowerCase()))
                        .map((order) => (
                            <li key={ order.id } className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <span className="fw-semibold">Order ID:</span> {order.id}
                                </div>
                            </li>
                        ))}
                    </ol>
                </>)
            :   (<div className="alert alert-primary d-flex justify-content-center align-items-center gap-2">
                    <i className="fa fa-info-circle"></i>
                    <span> No orders available </span>
                </div>
            )}   
        </div>
    );
}

export default OrdersList;