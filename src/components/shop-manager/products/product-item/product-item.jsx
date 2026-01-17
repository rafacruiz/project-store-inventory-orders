import { Link } from "react-router-dom";

function ProductItem ({ product, onDelete }) {
    
    function strUpperCapital(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleDeleteItem = (uuid) => onDelete(uuid);

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center" >
            <div className="ms-2 me-auto">
                <div className="fw-bold">{ product.name }</div>
                { strUpperCapital(product.category) }
            </div>

            <Link to={'/products/' + product.uuid }
                type="button" 
                className="btn btn-outline-secondary btn-sm me-2">
                Details
            </Link>

            <button className="btn btn-outline-danger btn-sm me-2"
                onClick={ () => handleDeleteItem(product.uuid) }>
                Delete
            </button>
        </li>
    );
}

export default ProductItem;