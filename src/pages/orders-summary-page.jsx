
import { PageLayout } from '../components/layouts';
import { OrdersSummary } from "../components/shop-manager/orders";

function OrdersSummaryPage () {
    
    const jumbotron = {
        title: 'ShopManager',
        subTitle: 'Orders Summary'
    };

    return (
        <PageLayout jumbotron={ jumbotron }>
            <OrdersSummary />
        </PageLayout>
    );
}

export default OrdersSummaryPage;