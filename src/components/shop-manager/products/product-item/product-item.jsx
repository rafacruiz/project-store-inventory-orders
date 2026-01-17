import { Link } from "react-router-dom";

function ProductItem ({ product }) {
    
    function strUpperCapital(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center" >
            <div className="ms-2 me-auto">
                <div className="fw-bold">{ product.name }</div>
                { strUpperCapital(product.category) }
            </div>            
            <Link 
                to={'/products/' + product.uuid }
                type="button" 
                className="btn btn-outline-secondary btn-sm">
                Details
            </Link>
        </li>
    );
}

export default ProductItem;