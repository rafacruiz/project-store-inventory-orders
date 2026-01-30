import { PageLayout } from '../components/layouts';
import { OrderDetails } from '../components/shop-manager/orders';

function StoresOrdersDetailsPage() {

    const jumbotron = {
        title: 'Order Details',
        subTitle: 'Detailed information about the order',
    };

    return (
        <PageLayout jumbotron={ jumbotron} >
            <OrderDetails />
        </PageLayout>
    );
}

export default StoresOrdersDetailsPage;