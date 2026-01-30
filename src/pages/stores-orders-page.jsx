
import { PageLayout } from '../components/layouts';
import { OrdersAdd } from "../components/shop-manager/orders";

function StoreOrdersPage() {
    
    const jumbotron = {
        title: 'ShopManager',
        subTitle: 'Stores order details'
    }

    return (
        <PageLayout jumbotron={ jumbotron }>
            <OrdersAdd />
        </PageLayout>
    );
}

export default StoreOrdersPage;