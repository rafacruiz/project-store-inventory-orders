import { useEffect, useState } from "react";
import { ButtonAdd, InputFinder } from '../../../ui';
import { useAuth } from '../../../../contexts';
import ProductItem from "../product-item/product-item";
import * as ShopManager from '../../../../services/shopManager-service';

function ProductList () {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [reload, setReload] = useState(true);

    const { user } = useAuth();

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

    const btnAddOption = {
        'mode': 'success',
        'placement': 'left',
        'title': 'Add product',
        'to': '/products/add',
    }

    const inpFinderOption = {
        'id': 'product',
        'placeholder': 'Finder products...'
    }

    return (
        <>
            <div className="d-flex py-3">
                { user.role === 'admin' &&  
                    (<div className="me-2">
                        <ButtonAdd buttonOption={ btnAddOption } /> 
                    </div>)}
                <div className="mx-auto w-100">
                    <InputFinder onChange={ handleFinderItem } inputOption={ inpFinderOption } />
                </div>                
            </div>
            
            <ol className="list-group">
                { products && 
                    (products
                    .filter((product) => 
                        product.name.toLowerCase().includes(search.toLowerCase()))
                    .map((product) => 
                        <ProductItem key={ product.uuid } product={ product } onDelete={ handleDeleteItem }/> )) }
            </ol>
        </>
    );
}

export default ProductList;