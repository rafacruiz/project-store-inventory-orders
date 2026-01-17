import { useEffect, useState } from "react";
import ProductItem from "../product-item/product-item";
import ProductFinder from "../product-finder/product-finder";
import * as ShopManager from '../../../../services/shopManager-services';

function ProductList () {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [reload, setReload] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const AllProducts = await ShopManager.getProducts();
            setProducts(AllProducts);
        };

        fetchProducts();
    }, [reload]);

    const handleFinderItem = (title) => setSearch(title);

    const handleDeleteItem = async (uuid) => {
        await ShopManager.setProductDelete(uuid);
        setReload(prev => !prev);
    };

    return (
        <div>
            <ProductFinder onChange={ handleFinderItem }/>
            <ol className="list-group">
                { products && 
                    (products
                    .filter((product) => 
                        product.name.toLowerCase().includes(search.toLowerCase()))
                    .map((product) => 
                        <ProductItem key={ product.uuid } product={ product } onDelete={ handleDeleteItem }/> )) }
            </ol>
        </div>
    );
}

export default ProductList;