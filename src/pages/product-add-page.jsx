import { PageLayout } from "../components/layouts";
import { ProductAdd } from "../components/shop-manager/products";

function ProductAddPage () {

    const jumbotron = {
        'title': 'Products',
        'subTitle': 'Product Add'
    }

    return (
        <PageLayout jumbotron={ jumbotron }>
            <ProductAdd />
        </PageLayout>
    );
}

export default ProductAddPage;