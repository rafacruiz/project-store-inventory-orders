import { useEffect, useState } from "react";
import * as ShopManager from '../../../../services/shopManager-services';

function ProductList () {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await ShopManager.getProducts();
            setProducts(products);
        };

        fetchProducts();
    }, []);

    if (!products) {
        return (<div className="mx-auto py-2">cargando...</div>)
    } else {
        return (
            <div>
                {products.map((product) => (
                    product.name
                ))}
            </div>
        );
    }
}

export default ProductList;