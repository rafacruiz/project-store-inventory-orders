import { AlertMessage } from "../../../ui";

function OrdersSummaryDetails ({ orders, warehouseId, date  }) {

    const filteredOrders = orders.filter(item => item.warehouseId === warehouseId && item.date === date);

    if (!filteredOrders.length) return <AlertMessage message={'No items found'} />
    
    return (
        <>
            <div className="pb-3">
                <button
                    className="btn btn-outline-primary d-flex align-items-center gap-2">
                        <i className="fa fa-print"></i>
                </button>
            </div>
            <div className="row row-cols-1 row-cols-md-2 g-3">
                {filteredOrders.map(item => (
                    <div key={item.sku} className="col">
                        <div className="card shadow-sm h-100 border-0">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-title mb-1">{item.name}</h6>
                                    <small className="text-muted">SKU: {item.sku}</small>
                                </div>
                            <span className="badge bg-primary fs-6">{item.quantity}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>  
    );
}

export default OrdersSummaryDetails;