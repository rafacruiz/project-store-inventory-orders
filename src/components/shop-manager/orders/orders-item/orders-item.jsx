
import './orders-item.css';
import toast from "react-hot-toast";
import { useState } from "react";
import * as ShopManager from '../../../../services/shopManager-service';

function OrdersItem ({ order, product }) {

    const initialLine = order?.lines?.find(line => line.id === product.id) || { quantity: 0 };

    const [quantity, setQuantity] = useState(initialLine?.quantity || 0);

    const fetchOrdersUpdateByLine = async (product, quantity) => {
        if (product.stock < quantity) {
            const message = 'Out of stock';
            console.log(message);
            toast.error(message);
            return;
        }

        const previous = quantity;
        
        try {
            const { message } = await ShopManager.setOrdersLinesUpdate(
                order.id, 
                [{...product, quantity}]);
                
            console.log(message);
            toast.success(message);
        } catch (error) {
            setQuantity(previous);
            const message = error?.message || 'Error fetching orders close';
            console.error(message);
            toast.error(message);
        }
    };

    const isOutOfStock = product.stock === 0;
    const isLowStock = product.stock <= product.minStock;
    const isChange = quantity !== 0;

    return (
        <li className="list-group-item border-0 mb-3 p-0">
            <div className={`card shadow-sm order-line ${isChange ? 'is-dirty' : ''}`}>
                <div className="card-body">
                    <div className="row align-items-center g-3">
                        <div className="col-12 col-md-4">
                            <div className="d-flex align-items-center gap-3">
                                <img
                                    src={ product.imageUrl }
                                    alt={ product.name }
                                    width="48"
                                    height="48"
                                    className="rounded border"
                                />

                                <div>
                                    <div className="fw-semibold">{ product.name }</div>
                                    <small className="text-muted"> SKU: { product.sku }
                                        {isOutOfStock && (
                                            <span className="badge bg-danger ms-2">Out of stock</span>
                                        )}

                                        {!isOutOfStock && isLowStock && (
                                            <span className="badge bg-warning text-dark ms-2">Low stock</span>
                                        )}
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="col-6 col-md-2 text-md-center">
                            <small className="text-muted d-block">Price</small>
                            <span className="fw-semibold">{ product.price.toFixed(2) } €</span>
                        </div>

                        <div className="col-6 col-md-2 text-md-center">
                            <small className="text-muted d-block">Stock</small>
                            <span>{product.stock}</span>
                        </div>

                        <div className="col-12 col-md-4">
                            <small className="text-muted d-block mb-1">Quantity order</small>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                value={quantity}
                                min={0}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                onBlur={() => fetchOrdersUpdateByLine(product, quantity)}/>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default OrdersItem;