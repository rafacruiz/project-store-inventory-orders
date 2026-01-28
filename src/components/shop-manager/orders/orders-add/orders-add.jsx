
import { useEffect, useState } from "react";

function OrdersAdd ({ status }) {

    const [orderCurrent, setOrderCurrent] = useState(null);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        
    }, [load]);

    const handleOpenOrder = () => setLoad(prev => !prev);

    return (
        <div className="py-2"> 
            {status 
                ? <button className="btn btn-primary w-100" onClick={() => handleOpenOrder }>Open order</button>
                : <button className="btn btn-success w-100">Open order</button>
            }
        </div>);
}

export default OrdersAdd;