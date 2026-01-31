
function WarehouseItem({ product, onUpdatePrice, onUpdateMinStock, onUpdateStock, onToggleActiveWare, onDeleteWare }) {

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

        <div className="col-6 col-md-1">
          <small className="text-muted">Price</small>
          <input
            type="number"
            className="form-control form-control-sm"
            value={ product.price }
            min={0}
            onChange={(e) => onUpdatePrice(product.id, Number(e.target.value))}
          />
        </div>

        <div className="col-6 col-md-1">
          <small className="text-muted">Min</small>
          <input
            type="number"
            className="form-control form-control-sm"
            value={ product.minStock }
            min={0}
            onChange={(e) => onUpdateMinStock(product.id,  Number(e.target.value))}
          />
        </div>

        <div className="col-6 col-md-2">
          <small className="text-muted">Stock</small>
          <input
            type="number"
            className="form-control form-control-sm"
            value={ product.stock }
            min={0}
            onChange={(e) => onUpdateStock(product.id, Number(e.target.value))}
          />
        </div>

        <div className="col-6 col-md-2">
          <small className="text-muted">&nbsp;</small>
          <button
            className={`btn btn-sm w-100 ${ product.active ? 'btn-success' : 'btn-danger' }`}
            onClick={() => onToggleActiveWare(product.id, !product.active, Number(product.stock), Number(product.price))} >
            {product.active ? 'Active' : 'Inactive'}
          </button>
        </div>

        <div className="col-12 col-md-2 text-end">
          <small className="text-muted">&nbsp;</small>
          <button className="btn btn-outline-danger btn-sm w-100"
            onClick={() => onDeleteWare(product.id, product.active)} >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default WarehouseItem;
