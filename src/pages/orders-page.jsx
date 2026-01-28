import { PageLayout } from '../components/layouts';
import { OrdersList } from '../components/shop-manager/orders';

function OrdersPage () {

    const jumbotron = {
        title: 'ShopManager',
        subTitle: `Orders`
    }

    return (
        <PageLayout jumbotron={jumbotron}>
            <OrdersList />
        </PageLayout>
    );
}

export default OrdersPage;