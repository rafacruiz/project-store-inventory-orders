import { PageLayout } from '../components/layouts';
import { ProductList } from '../components/shop-manager/products';

function ProductsPage() {
    const jumbotron = {
        title: 'ShopManager',
        subTitle: 'Products'
    }

    return (
        <PageLayout jumbotron={ jumbotron }>
            <ProductList />
        </PageLayout>
    );
}

export default ProductsPage;