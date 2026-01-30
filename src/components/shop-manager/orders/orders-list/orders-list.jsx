
import { BounceLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useAuth } from '../../../../contexts';
import toast, { Toaster } from "react-hot-toast";
import { InputFinder } from "../../../ui";
import * as ShopManager from '../../../../services/shopManager-service';
import { Link, useNavigate } from "react-router-dom";

const inpFinderOption = {
    'id': 'orders',
    'placeholder': 'Finder orders...'
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

function OrdersList () {

    const { user } = useAuth();

    const navigate = useNavigate();

    const [orders, setOrders] = useState(null);
    const [search, setSearch] = useState('');
    const [reload, setReload] = useState(true);
    
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersData = await ShopManager.getOrderByStore(user?.id);
                setOrders(ordersData);
                console.log('Orders loading successfully');
            } catch (error) {
                console.error(error?.message || 'Error fetching orders');
            }
        }

        if (user?.id) fetchOrders(user?.id);
    }, [user?.id, reload]);

    const handleStatusOrder = (isOpen, orderId = null, warehouseId = null) => {
        if (isOpen) {
            const fetchOrdersByStore = async () => {
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

            fetchOrdersByStore();
        } else {
            const fetchOrdersByStore = async () => {
                try {
                    const { message } = await ShopManager.setOrdersUpdate(
                        orderId, 
                        warehouseId,
                        { status: 'closed', closedAt: new Date().toISOString() });

                    setReload(prev => !prev);
                    console.log(message);
                    toast.success(message);
                } catch (error) {
                    const message = error?.message || 'Error fetching orders close';
                    console.error(message);
                    toast.error(message);
                }
            };

            fetchOrdersByStore();
        }
    }
    
    // Funcion de ordenacion

    if (orders === null) return <Loader />;

    return (
        <div className="d-flex flex-column py-2">
            <Toaster position="top-center" reverseOrder={false} />
            <small className="fw-semibold text-secondary"> Orders </small>

            <div className="py-2">
                <button className="btn btn-primary w-100" onClick={() => handleStatusOrder(true) }>
                    <i className="fa fa-pencil-square-o me-1"></i>
                    Open order
                </button>
            </div>
            
            {orders?.length ? (
                <>                                
                    <div className="mx-auto w-100 py-3">
                        <InputFinder onChange={ setSearch } inputOption={ inpFinderOption } />
                    </div>

                    <div className="btn-group mb-3">
                        <button
                            type="button"
                            className="btn btn-outline-dark"
                            onClick={() => handleSort('date')} >
                                <i className="fa fa-calendar me-1"></i>
                                Date
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={() => handleSort('open')} >
                                <i className="fa fa-folder-open me-1"></i>
                                Open
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => handleSort('closed')} >
                                <i className="fa fa-check-circle me-1"></i>
                                Closed
                        </button>
                    </div>

                    <ol className="list-group pt-3">
                        {orders
                        .filter((order) => order.id.toLowerCase().includes(search.toLowerCase()))
                        .toSorted((a, b) => b.status.localeCompare(a.status))
                        .map((order) => (
                            <li 
                                key={order.id} 
                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center gap-3">
                                    
                                <div className="d-flex flex-column">
                                    <span className="fw-semibold"> Order #{order.id.slice(0, 8)} </span>

                                    <small className="text-muted">
                                        { new Date(order.createdAt).toLocaleString() }
                                    </small>

                                    <span
                                        className={`badge rounded-pill mt-1 ${
                                            order.status === 'open'
                                            ? 'bg-success'
                                            : order.status === 'pending'
                                            ? 'bg-warning text-dark'
                                            : 'bg-secondary'
                                        }`} >
                                        {order.status.toUpperCase()}
                                    </span>
                                </div>

                                <div className="d-flex gap-2">
                                    {(order.status !== 'closed') &&
                                        <Link
                                            to={`/stores/order/${order.id}/warehouse/${order.warehouseId}`} 
                                            className="btn btn-outline-primary btn-sm">
                                                <i className="fa fa-pencil me-1"></i>
                                                Edit order
                                        </Link>
                                    }
                                    {(order.status === 'closed') &&
                                        <Link
                                            to={`/stores/order/${order.id}/details`} 
                                            className="btn btn-outline-primary btn-sm">
                                                <i className="fa fa-search me-1"></i>
                                                Order details
                                        </Link>
                                    }
                                    <button 
                                        className="btn btn-success btn-sm" 
                                        disabled={ order.status !== 'open' } 
                                        onClick={ () => handleStatusOrder(false, order.id, order.warehouseId) } >
                                            <i className="fa fa-paper-plane-o me-1"></i>
                                            Send
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ol>
                </>
            ) : ( <AlertMessage message='No orders available' /> )}   
        </div>
    );
}

export default OrdersList;