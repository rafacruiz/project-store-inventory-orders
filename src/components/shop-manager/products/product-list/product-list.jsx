import { useEffect, useState } from "react";
import ProductItem from "../product-item/product-item";
import ProductFinder from "../product-finder/product-finder";
import * as ShopManager from '../../../../services/shopManager-services';

function ProductList () {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const AllProducts = await ShopManager.getProducts();
            setProducts(AllProducts);
        };

        fetchProducts();
    }, []);

    const handleFinder = (value) => {
       setSearch(value); 
    };

    return (
        <div>
            <ProductFinder onChange={ handleFinder }/>
            <ol className="list-group">
                { products && 
                    (products
                    .filter((product) => 
                        product.name.toLowerCase().includes(search.toLowerCase()))
                    .map((product) => 
                        <ProductItem key={ product.uuid } product={ product } /> )) }
            </ol>
        </div>
    );
}

export default ProductList;