import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PageLayout } from "../components/layouts";
import { ProductDetails } from "../components/shop-manager/products";
import * as ShopManager from '../services/shopManager-services';

function ProductsDetailsPage () {

    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductId = async (id) => {
            const product = await ShopManager.getProductId(id);
            setProduct(product);
        };

        fetchProductId(id);
    }, [id]);
    
    const jumbotron = {
        'title': 'Product',
        'subTitle': product?.name
    }

    return (
        <PageLayout jumbotron={ jumbotron }>
            { product && (<ProductDetails product={ product } /> ) }
        </PageLayout>
    );
}

export default ProductsDetailsPage;