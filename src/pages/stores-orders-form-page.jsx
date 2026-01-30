
import { PageLayout } from '../components/layouts';
import { OrdersForm } from "../components/shop-manager/orders";

function StoresOrderFormPage() {
    
    const jumbotron = {
        title: 'ShopManager',
        subTitle: 'Stores order details'
    }

    return (
        <PageLayout jumbotron={ jumbotron }>
            <OrdersForm />
        </PageLayout>
    );
}

export default StoresOrderFormPage;