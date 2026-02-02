
import { useEffect, useState } from "react";
import { useAuth } from '../../../../contexts';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import OrdersListItems from "../orders-list-items/orders-list-items";
import { AlertMessage, InputFinder, Loader } from "../../../ui";
import * as ShopManager from '../../../../services/shopManager-service';

const inpFinderOption = {
    'id': 'orders',
    'placeholder': 'Finder orders id...'
}

function OrdersList () {

    const { user } = useAuth();

    const navigate = useNavigate();

    const [orders, setOrders] = useState(null);
    const [search, setSearch] = useState('');
    const [reload, setReload] = useState(true);
    const [orderBy, setOrderBy] = useState('asc');
    const [isActive, setIsActive] = useState('');

    const fetchOrders = async (options = {}) => {
        try {
            const ordersData = await ShopManager.getOrdersByStore(user?.id, options);
            setOrders(ordersData);
            console.log('Orders loading successfully');
        } catch (error) {
            const message = error?.message | 'Error fetching orders';
            console.error(message);
            toast.error(message);
        }
    }

    useEffect(() => {
        if (user?.id) fetchOrders(user?.id);
    }, [user?.id, reload]);
    
    const fetchOpenOrders = async () => {
        try {
            const newOrder = await ShopManager.setOrdersOpen(
                {storeId: user?.id, warehouseId: user?.warehouseId});

            const message = 'Order opened successfully';
            console.log(message);
            navigate('/stores/orders/new/' + newOrder.id, 
                { state: { order: newOrder } });
        } catch (error) {
            const message = error?.message || 'Error fetching orders open';
            console.error(message);
            toast.error(message);
        }
    };

    if (orders === null) return <Loader />;

    return (
        <div className="d-flex flex-column py-2">
            <Toaster position="top-center" reverseOrder={false} />
            <small className="fw-semibold text-secondary"> Orders </small>

            <div className="py-2">
                <button className="btn btn-primary w-100" onClick={() => fetchOpenOrders() }>
                    <i className="fa fa-pencil-square-o me-1"></i>
                    Open order
                </button>
            </div>
            
            {orders?.length ? (
                <>                                
                    <div className="mx-auto w-100 py-3">
                        <InputFinder onChange={ setSearch } inputOption={ inpFinderOption } />
                    </div>

                    <div className="btn-group btn-group-sm mb-3">
                        <button
                            type="button"
                            className={`btn btn-outline-dark ${isActive === 'date'? 'active': ''}`}
                            onClick={() => {
                                    setIsActive('date');
                                    const nextOrder = orderBy === 'asc' ? 'desc' : 'asc';
                                    fetchOrders({sortBy: 'date', orderBy: nextOrder});
                                    setOrderBy(nextOrder);
                                    
                                }} >
                                <i className="fa fa-calendar me-1"></i>
                                Date
                                <i className={`fa fa fa-long-arrow-${orderBy === 'asc' && isActive === 'date' ? 'down': 'up'} ms-2`}></i>
                        </button>

                        <button
                            type="button"
                            className={`btn btn-outline-${orderBy === 'desc' && isActive === 'status' ? 'success' : 'secondary'} 
                                ${isActive === 'status'? 'active': ''}`}
                            onClick={() => {
                                    setIsActive('status');
                                    const nextOrder = orderBy === 'asc' ? 'desc' : 'asc';
                                    fetchOrders({sortBy: 'status', orderBy: orderBy });
                                    setOrderBy(nextOrder);
                                    
                                }} >
                                <i className="fa fa-folder-open me-1"></i>
                                {orderBy === 'desc' && isActive === 'status' ? 'Open' : 'Closed'}
                        </button>
                    </div>

                    <ol className="list-group pt-3">
                        {orders
                        .filter((order) => order.id.toLowerCase().includes(search.toLowerCase()))
                        .map((order) => (
                            <OrdersListItems 
                                key={order.id} 
                                order={order}
                                setReload={setReload} />
                        ))}
                    </ol>
                </>
            ) : ( <AlertMessage message='No orders available' /> )}
        </div>
    );
}

export default OrdersList;