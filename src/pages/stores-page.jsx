
import { PageLayout } from '../components/layouts';
import { StoreList } from '../components/shop-manager/stores';

function StoresPage () {

    const jumbotron = {
        title: 'ShopManager',
        subTitle: 'Stores'
    }

    return (
        <PageLayout jumbotron={ jumbotron }>
            <StoreList />
        </PageLayout>
    );
}

export default StoresPage;