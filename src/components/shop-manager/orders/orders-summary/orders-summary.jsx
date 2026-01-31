
import { useEffect, useState } from "react";
import { AlertMessage, InputFinder, Loader } from "../../../ui";
import { Toaster } from "react-hot-toast";
import OrdersSummaryDetails from "../orders-summary-details/orders-summary-details";
import * as OrdersUtils from './orders-summary-utils';
import * as ShopManager from '../../../../services/shopManager-service';

const inpFinderOption = {
    'id': 'ordersSummary',
    'placeholder': 'Finder orders...'
}

function OrdersSummary () {

    const [orders, setOrders] = useState(null);
    const [showOrders, setShowOrders] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            const orders = await ShopManager.getOrders({
                status: 'closed',
            });
            setOrders(orders);
        };

        fetchOrders();
    }, []);

    if (orders === null) return <Loader />;

    if (!orders?.length) return <AlertMessage message='Orders no available.' />

    const toggleAccordion = (id) => setShowOrders(showOrders === id ? 'null' : id);

    const ordersSummary = OrdersUtils.groupAndSumOrders(orders);
    
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <small className="fw-semibold text-secondary"> Orders date </small>
            
            <div className="d-flex py-3">                
                <div className="mx-auto w-100">
                    <InputFinder onChange={ setSearch } inputOption={ inpFinderOption } />
                </div>                
            </div>

            <div className="accordion pt-3">
                {OrdersUtils.uniqueByWarehouseAndDate(ordersSummary)
                    .filter(order => order.id.includes(search))
                    .map(order => {
                        const ordersSummaryDetails = ordersSummary.filter(
                        o => o.warehouseId === order.warehouseId && o.date === order.date);

                        const totalQuantity = ordersSummaryDetails.reduce(
                            (sum, item) => sum + item.quantity, 0);

                        return (
                            <div className="accordion-item mb-3 shadow-sm border rounded" key={order.id}>
                                <h2 className="accordion-header">
                                    <button
                                        className={`accordion-button ${showOrders === order.id ? '' : 'collapsed'}`}
                                        type="button"
                                        onClick={() => toggleAccordion(order.id)} >
                                    
                                        <div className="w-100">
                                            <div 
                                            className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                                                <div className="mb-1 mb-md-0">
                                                    <h6 className="fw-bold mb-0">{order.warehouseId}</h6>
                                                    <small className="text-muted">{order.date}</small>
                                                </div>

                                                <div className="d-flex flex-wrap gap-2 mt-2 mt-md-0">
                                                    <span className="badge bg-success">Total Qty: {totalQuantity}</span>
                                                    <span className="badge bg-secondary">ID: {order.id}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </h2>

                                <div className={`accordion-collapse collapse ${showOrders === order.id ? 'show' : ''}`}>
                                    <div className="accordion-body">
                                        <OrdersSummaryDetails
                                            warehouseId={order.warehouseId}
                                            date={order.date}
                                            orders={ordersSummary}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}

export default OrdersSummary;