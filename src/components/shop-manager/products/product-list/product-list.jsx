import { BounceLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { ButtonAdd, InputFinder } from '../../../ui';
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

    const handleFinderItem = (title) => setSearch(title);

    const handleDeleteItem = async (id) => {
        try {
            await ShopManager.setProductDelete(id);
            setReload(prev => !prev);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleAddItemWarehouse = (id) => addItemWarehouse(id);

    if (products === null) {
        return (
                <div className="d-flex justify-content-center align-items-center py-4">
                    <BounceLoader color="#030404" size={ 35 }  />
                </div>
            );
    } 
    
    if (products.length === 0) {
        return (
            <div className="alert alert-primary d-flex justify-content-center align-items-center gap-2">
                <i className="fa fa-info-circle"></i>
                <span> No products available </span>
            </div>
        );
    }
    
    return (
        <>
            <div className="d-flex py-3">
                {(user.role === 'admin' && !warehouse) && (
                    <div className="me-2"><ButtonAdd buttonOption={ btnAddOption } /> </div>
                )}
                <div className="mx-auto w-100">
                    <InputFinder onChange={ handleFinderItem } inputOption={ inpFinderOption } />
                </div>                
            </div>
            
            <ol className="list-group">
                {products && (products
                ?.filter((product) => 
                    product.name.toLowerCase().includes(search.toLowerCase()))
                .map((product) => 
                    <ProductItem 
                        key={ product.id } 
                        product={ product } 
                        showWarehouse={ warehouse }
                        onDelete={ handleDeleteItem } 
                        handleAddItemWarehouse={ handleAddItemWarehouse } /> 
                    ))}
            </ol>
        </>
    );
}

export default ProductList;