import { useEffect, useState } from "react";
import * as ShopManagerServices from '../../../../services/shopManager-services';

function WarehouseList () {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await ShopManagerServices.getWarehouseProducts();
            setProducts(products) 
        };

        fetchProducts();
    }, []);

    if (!products) {
        return (<div className="d-flex justify-content-center py-4">Cargando...</div>);
    } else {
        return (
            <>{
                products.map((product) => (
                    <div className="card mb-3" style={{maxWidth:`540px`}} key={product.id}>
                        <div className="row g-0">
                            <div className="col-md-4">
                            <img src={product.image} className="img-fluid rounded-start" alt={product.image} />
                            </div>
                            <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">This is a wider card with supporting text.</p>
                                <p className="card-text"><small className="text-body-secondary">{product.id}</small></p>
                            </div>
                            </div>
                        </div>
                    </div>
                ))
            }</>);
    }
}

export default WarehouseList;