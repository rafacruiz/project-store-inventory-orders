
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import * as ShopManager from '../../../../services/shopManager-service';

function OrdersItem ({ product, orderId }) {

    const isOutOfStock = product.stock === 0;
    const isLowStock = product.stock <= product.minStock;

    const [orderLines, setOrderLines] = useState(null);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        const fetchOrderLines = async () => {
            try {
                const orderLines = await ShopManager.getOrdersById(orderId);
                setOrderLines(orderLines);    
            } catch (error) {
                const message = error?.message || 'Error fetching order lines';
                console.error(message);
                toast.error(message);
            }
        };

        fetchOrderLines();
    }, [reload]);

    const fetchOrdersByStore = async (productId, quantity) => {
        if (product.stock < quantity) {
            const message = 'Out of stock';
            console.log(message);
            toast.error(message);
            return;
        }

        try {
            const { message } = await ShopManager.getOrdersLinesUpdate(
                orderId, 
                { lines: [{productId, quantity}] });

            setReload(prev => !prev);
            console.log(message);
            toast.success(message);
        } catch (error) {
            const message = error?.message || 'Error fetching orders close';
            console.error(message);
            toast.error(message);
        }
    };

    const line = orderLines?.lines?.find(line => line.productId === product.id) || { quantity: 0 };

    return (
        <li className={`list-group-item `} >
            <div className="row align-items-center g-2">

                <div className="col-12 col-md-4">
                    <div className="fw-bold">{product.name}</div>
                    <small className="text-muted">SKU: {product.sku}
                    { isOutOfStock
                        ? ( <span className="badge bg-danger text-dark ms-2"> Out of stock</span> )
                        : isLowStock 
                        ? ( <span className="badge bg-warning text-dark ms-2"> Low stock</span> )
                        : ''
                    }</small>
                </div> 

                <div className="col-6 col-md-4">
                    <small className="text-muted">Stock Warehouse</small>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        value={ product.stock }
                        disabled
                    />
                </div>

                <div className="col-6 col-md-4">
                    <small className="text-muted">Quantity order</small>
                    
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        value={ line?.quantity }
                        onChange={(e) => fetchOrdersByStore(product.id, e.target.value) }
                    />                    
                </div>
            </div>
        </li>
    );
}

export default OrdersItem;