import { Outlet } from "react-router-dom";
import { PageLayout } from "../components/layouts";

function WarehousePage () {

    const jumbotron = {
        title: 'ShopManager',
        subTitle: 'Warehouses'
    }
    
    return (
        <PageLayout jumbotron={ jumbotron }>
            <Outlet/>
        </PageLayout>
    );
}

export default WarehousePage;