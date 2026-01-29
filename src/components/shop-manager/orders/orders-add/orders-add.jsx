import { useLocation } from "react-router-dom";
import { OrdersProducts } from "../../orders";

function OrdersAdd () {

    const { state } = useLocation();
    
    return (<>
            { state?.order?.id }
            
            <OrdersProducts />
        </>);

}

export default OrdersAdd;