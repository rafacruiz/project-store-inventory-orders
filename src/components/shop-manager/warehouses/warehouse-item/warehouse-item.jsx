
function WarehouseItem({ product, onUpdateStock, onToggleActiveWare, onDeleteWare }) {

  const handleStockProduct = (productId, value) => onUpdateStock(productId, value);

  const handleToggleProduct = (productId, newActive) => onToggleActiveWare(productId, newActive);

  const handleDeleteItem = (productId) => onDeleteWare(productId);

  return (
    <li className="list-group-item">
      <div className="row align-items-center g-2">

        <div className="col-12 col-md-4">
          <div className="fw-bold">{product.name}</div>
          <small className="text-muted">SKU: {product.sku}</small>
        </div>

        <div className="col-6 col-md-2">
          <input
            type="number"
            className="form-control form-control-sm"
            value={product.stock}
            onChange={(e) => handleStockProduct(product.id, e.target.value)}
          />
        </div>

        <div className="col-6 col-md-2">
          <button
            className={`btn btn-sm w-100 ${ product.active ? 'btn-success' : 'btn-danger' }`}
            onClick={() => handleToggleProduct(product.id, !product.active)} >
            {product.active ? 'Active' : 'Inactive'}
          </button>
        </div>

        <div className="col-12 col-md-2 text-end">
          <button className="btn btn-outline-danger btn-sm w-100"
            onClick={() => handleDeleteItem(product.id)} >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default WarehouseItem;
