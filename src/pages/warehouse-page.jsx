import { PageLayout } from "../components/layouts";
import { WarehouseList } from "../components/shop-manager/warehouses";

function WarehousePage () {

    const jumbotron = {
        title: 'ShopManager',
        subTitle: 'Warehouse'
    }
    
    return (
        <PageLayout jumbotron={ jumbotron }>
            <WarehouseList />
        </PageLayout>
    );
}

export default WarehousePage;