
import { BounceLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useAuth } from '../../../../contexts';
import toast, { Toaster } from "react-hot-toast";
import * as ShopManager from '../../../../services/shopManager-service';

const inpFinderOption = {
    'id': 'orders',
    'placeholder': 'Finder orders...'
}

function OrdersList (storeId) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!storeId) return;

        const fetchOrderByStore = async ({storeId, warehouseId}) => {
            const order = ShopManager.setOrdersByStore({storeId, warehouseId});
            setOrders(order);
            setLoading(false);
        }

        fetchOrderByStore({storeId, warehouseId});
    }, [storeId]);

    return { orders, loading };
}

export default OrdersList;