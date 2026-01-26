import { BounceLoader } from "react-spinners";
import { useEffect, useState } from "react";
import * as ShopManager from '../../../../services/shopManager-service';

function StoreList () {

    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const stores = await ShopManager.getStores();
                setStores(stores);
            } catch (error) {
                console.error(error?.message || error);
            } finally {
                setLoading(false);
            }
        };

        fetchStores();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center py-4">
                <BounceLoader color="#030404" size={35} />
            </div>
        );
    }

    if (stores.length === 0) {
        return <div className="text-center py-4">No stores available</div>;
    }

    return (
        <div className="list-group">
            
            {stores.map((store) => (
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
    );
}

export default StoreList;
