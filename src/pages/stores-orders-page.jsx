import { PageLayout } from '../components/layouts';
import { OrdersList } from '../components/shop-manager/orders';

function StoresOrdersPage () {

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

export default StoresOrdersPage;