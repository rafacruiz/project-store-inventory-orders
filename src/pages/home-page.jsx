import { PageLayout } from '../components/layouts';
import { Dashboard } from '../components/ui';

function HomePage () {
    const jumbotron = {
        title: 'ShopManager',
        subTitle: 'Home'
    }

    return (
        <PageLayout jumbotron={ jumbotron }>
            <Dashboard />
        </PageLayout>
    );
}

export default HomePage;