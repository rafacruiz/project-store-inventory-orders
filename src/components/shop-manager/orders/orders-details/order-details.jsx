
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from '../../../../contexts/auth-context';
import * as ShopManager from "../../../../services/shopManager-service";

function OrderDetails() {

    const { orderId } = useParams();

    const { user } = useAuth();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        async function fetchOrderDetails() {
            try {
                const response = await ShopManager.getOrdersById(orderId);
                setOrder(response);
            } catch (error) {
                const message = error?.message || 'Error fetching order details';
                console.error(message);
                toast.error(message);
            }
        }
        
        fetchOrderDetails();
    }, [orderId]);

    return (
        
        <div className="container py-4">
            <div className="card shadow-sm mb-4">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                        <h5 className="mb-1"> Order <span className="text-muted">#{ order?.id.slice(0, 8) }..</span> </h5>
                        <small className="text-muted"> Created at: { order?.createdAt } </small>
                    </div>
                    <span 
                        className={`badge bg-${ order?.status === 'open' ? 'success' : 'secondary'} text-uppercase px-3 py-2`}> 
                        { order?.status } 
                    </span>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h6 className="text-muted mb-2">Store</h6>
                            <div className="fw-semibold">{ user?.nameShop ?? order?.storeId ?? 'Unknown' }</div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h6 className="text-muted mb-2">Warehouse</h6>
                            <div className="fw-semibold">{ order?.warehouseId ?? 'Unknown' }</div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 bg-light">
                        <div className="card-body text-end">
                            <h6 className="text-muted mb-2">Total</h6>
                            <div className="fs-3 fw-bold">{ order?.total ?? 0 }€</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-header bg-white">
                    <h6 className="mb-0">Order lines</h6>
                </div>

                <div className="table-responsive">
                    <table className="table align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>Product</th>
                                    <th>SKU</th>
                                    <th className="text-end">Price</th>
                                    <th className="text-end">Quantity</th>
                                    <th className="text-end">Subtotal</th>
                                </tr>
                            </thead>
                        <tbody>
                            {order?.lines && 
                                order.lines.map((line) => (
                                    <tr key={ line.id }>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <img
                                                    src={`${line?.imageUrl}`}
                                                    className="rounded"
                                                    width="48"
                                                    height="48" />
                                                <div>
                                                    <div className="fw-semibold">{ line?.name ?? 'Unknown' }</div>
                                                    <small className="text-muted">{ line?.category ?? 'Unknown' }</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-muted">{ line?.sku ?? 'Unknown' }</td>
                                        <td className="text-end">{ line?.price.toFixed(2) ?? 0 } €</td>
                                        <td className="text-end">{ line?.quantity ?? 'Unknown' }</td>
                                        <td className="text-end fw-semibold">{ (line?.quantity * line?.price).toFixed(2) ?? 0 } €</td>
                                    </tr>
                                ))}
                        </tbody>
                        <tfoot className="table-light">
                            <tr>
                                <td colspan="4" className="text-end fw-semibold"> Total</td>
                                <td className="text-end fs-5 fw-bold">{ order?.total ?? 0 }€</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails