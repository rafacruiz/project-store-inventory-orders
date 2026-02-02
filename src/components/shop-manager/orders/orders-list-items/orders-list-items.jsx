
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import * as ShopManager from '../../../../services/shopManager-service';

function OrdersListItems ({ order, setReload }) {

    const fetchOrdersByClosed = async (orderId, warehouseId) => {
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

    const handleDeleteOrder = async (orderId, warehouseId) => {
        try {
            const { message } = await ShopManager.setOrdersDelete(orderId, warehouseId);
            setReload(prev => !prev);
            console.info(message);
            toast.success(message);
        } catch (error) {
            const message = error?.message || 'Error fetching orders delete';
            console.error(message);
            toast.error(message);
        }
    };

    return (
        <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center gap-3">
                
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
                <button 
                    className="btn btn-success btn-sm" 
                    disabled={ order.status !== 'open' } 
                    onClick={ () => fetchOrdersByClosed(order.id, order.warehouseId) } >
                        <i className="fa fa-paper-plane-o me-1"></i>
                        Send
                </button>
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
                    className="btn btn-danger btn-sm" 
                    disabled={ order.status !== 'open' } 
                    onClick={ () => handleDeleteOrder(order.id, order.warehouseId) } >
                        <i className="fa fa-trash me-1"></i>
                        Delete
                </button>
            </div>
        </li>
    );
}

export default OrdersListItems;