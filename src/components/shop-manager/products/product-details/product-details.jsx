import { Link } from "react-router-dom";

function ProductDetails ({ product }) {

    return (
        <div className="container py-2">
            <div className="d-flex flex-column justify-content-center align-items-center py-4">
                <div className="card mb-3 w-100">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={ product.imageUrl } 
                                className="img-fluid rounded-start" 
                                style={{ width: '180px', height: '180px', objectFit: 'cover' }} 
                                alt={ product.name } />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{ product.name }</h5>
                                <p className="card-text">{ product.description }</p>
                                <p className="card-text"><small className="text-body-secondary">{ product.uuid }</small></p>
                            </div>
                        </div>
                    </div>
                </div>
                <Link className="btn btn-outline-dark w-100" to={-1}>Back</Link>
            </div>
        </div>
    );
}

export default ProductDetails;