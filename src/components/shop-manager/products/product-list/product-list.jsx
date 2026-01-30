
import { useEffect, useState } from "react";
import { ButtonAdd, InputFinder, Loader } from '../../../ui';
import { useAuth } from '../../../../contexts';
import ProductItem from "../product-item/product-item";
import * as ShopManager from '../../../../services/shopManager-service';

const inpFinderOption = {
    'id': 'product',
    'placeholder': 'Finder products...'
}

function ProductList ({ warehouse = false, addItemWarehouse = () => {}}) {

    const btnAddOption = {
        'mode': 'success',
        'placement': 'left',
        'title': 'Add product',
        'to': '/products/add',
    }
    
    const [products, setProducts] = useState(null);
    const [search, setSearch] = useState('');
    const [reload, setReload] = useState(true);

    const { user } = useAuth();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const AllProducts = await ShopManager.getProducts();
                setProducts(AllProducts);    
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [reload]);

    const handleDeleteItem = async (id) => {
        try {
            await ShopManager.setProductDelete(id);
            setReload(prev => !prev);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    if (products === null) return <Loader />;
    
    if (!products?.length) return <AlertMessage message='No products available' />;
        
    return (
        <>
            <div className="d-flex py-3">
                {(user.role === 'admin' && !warehouse) && (
                    <div className="me-2"><ButtonAdd buttonOption={ btnAddOption } /> </div>
                )}
                <div className="mx-auto w-100">
                    <InputFinder onChange={ setSearch } inputOption={ inpFinderOption } />
                </div>                
            </div>
            
            <ol className="list-group">
                {products
                ?.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
                .map((product) => 
                    <ProductItem 
                        key={ product.id } 
                        product={ product } 
                        showWarehouse={ warehouse }
                        onDelete={ handleDeleteItem } 
                        handleAddItemWarehouse={ addItemWarehouse } /> 
                    )}
            </ol>
        </>
    );
}

export default ProductList;