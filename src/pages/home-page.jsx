import { PageLayout } from '../components/layouts';
import { Dashboard } from '../components/ui';

function HomePage () {
    const jumbotron = {
        title: 'ShopManager',
        subTitle: 'Dashboard'
    }

    return (
        <PageLayout jumbotron={ jumbotron }>
            <Dashboard />
        </PageLayout>
    );
}

export default HomePage;