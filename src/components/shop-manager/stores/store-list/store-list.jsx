import { useEffect, useState } from "react";
import { AlertMessage, ButtonAdd, InputFinder, Loader } from "../../../ui";
import * as ShopManager from '../../../../services/shopManager-service';

const inpFinderOption = {
    'id': 'stores',
    'placeholder': 'Finder name stores...'
}

function StoreList () {

    const btnAddOption = {
        'mode': 'success',
        'placement': 'left',
        'title': 'Add store',
        'to': '',
    }

    const [stores, setStores] = useState(null);
    const [search, setSearch] = useState('');
    
    useEffect(() => {
        const fetchStores = async () => {
            try {
                const stores = await ShopManager.getStores();
                setStores(stores);
            } catch (error) {
                console.error(error?.message || error);
            }
        };

        fetchStores();
    }, []);

    if (stores === null) return <Loader />;
        
    if (!stores?.length) return <AlertMessage message='No stores available' />;
         
    return (
        <>
            <div className="d-flex py-3">
                <div className="me-2"> <ButtonAdd buttonOption={ btnAddOption } /> </div>
                
                <div className="mx-auto w-100">
                    <InputFinder onChange={ setSearch } inputOption={ inpFinderOption } />
                </div>                
            </div>

            <div className="list-group">
                {stores
                    ?.filter((store) => store.nameShop.toLowerCase().includes(search.toLowerCase()))
                    .map((store) => (
                    <div className="card shadow-sm mb-3" key={ store.id }>
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">{ store.nameShop }</h5>
                            <small className="text-light">Role: { store.role }</small>
                        </div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush mb-2">
                                <li className="list-group-item">
                                    <strong>ID:</strong> { store.id }
                                </li>
                                <li className="list-group-item">
                                    <strong>Email:</strong> { store.email }
                                </li>
                                <li className="list-group-item">
                                    <strong>Warehouse ID:</strong> { store.warehouseId }
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default StoreList;
