
function OrdersItem ({ product }) {

    const isOutOfStock = product.stock === 0;
    const isLowStock = product.stock <= product.minStock;

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

                <div className="col-6 col-md-2">
                    <small className="text-muted">Stock Warehouse</small>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        value={ product.stock }
                        disabled
                    />
                </div>

                <div className="col-6 col-md-2">
                    <small className="text-muted">Quantity order</small>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        value={ product?.quantity }
                        onChange={(e) => handle(product.id, e.target.value)}
                    />
                </div>
            </div>
        </li>
    );
}

export default OrdersItem;