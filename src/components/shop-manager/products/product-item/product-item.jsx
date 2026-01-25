import { Link } from "react-router-dom";

function ProductItem ({ product, onDelete, showWarehouse, handleAddItemWarehouse }) {
    
    function strUpperCapital(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleDeleteItem = (id) => onDelete(id);

    const handleAddItem = (id) => handleAddItemWarehouse(id);

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center" >
            <div className="ms-2 me-auto">
                <div className="fw-bold">{ product.name }</div>
                { strUpperCapital(product.category) }
            </div>

            {!showWarehouse && (
                <div>
                    <Link to={'/products/' + product.id }
                        type="button" 
                        className="btn btn-outline-secondary btn-sm me-2">
                        Details
                    </Link>

                    <button className="btn btn-outline-danger btn-sm me-2"
                        onClick={ () => handleDeleteItem(product.id) }> Delete
                    </button>
                </div>
            )}

            { showWarehouse && (
                <button className="btn btn-outline-success btn-sm me-2"
                    onClick={ () => handleAddItem(product.id) }> Add
                </button>
            )}
            
        </li>
    );
}

export default ProductItem;