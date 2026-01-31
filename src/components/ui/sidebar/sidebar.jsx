import { Link } from "react-router-dom";
import { useAuth } from '../../../contexts';

function Sidebar () {

    const { user } = useAuth();

    return (
        <nav className="col-3 col-md-2 col-sm-2 bg-body-tertiary vh-100 d-flex flex-column p-3">
            <ul className="nav nav-pills flex-column">
                { user.role === 'admin' && (
                    <>
                        <li className="nav-item">
                            <Link 
                                className="nav-link text-black d-flex align-items-center justify-content-center justify-content-md-start gap-2" 
                                to={'/dashboard'}>
                                <i className="fa fa-home fa-fw"></i>
                                <span className="d-none d-md-inline">Dashboard</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link 
                                className="nav-link text-black d-flex align-items-center justify-content-center justify-content-md-start gap-2" 
                                to={'/orders/summary'}>
                                <i className="fa fa-list-alt fa-fw"></i>
                                <span className="d-none d-md-inline">Orders</span>
                            </Link>
                        </li>
                
                        <li className="nav-item">
                            <Link 
                                className="nav-link text-black d-flex align-items-center justify-content-center justify-content-md-start gap-2" 
                                to={'/warehouse'}>
                                <i className="fa fa-cubes fa-fw"></i>
                                <span className="d-none d-md-inline">Warehouse</span>
                            </Link>
                        </li>
                    
                        <li className="nav-item">
                            <Link 
                                className="nav-link text-black d-flex align-items-center justify-content-center justify-content-md-start gap-2" 
                                to={'/stores'}>
                                <i className="fa fa-building fa-fw"></i>
                                <span className="d-none d-md-inline">Store</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link text-black d-flex align-items-center justify-content-center justify-content-md-start gap-2" 
                                to={'/products'}>
                                <i className="fa fa-apple fa-fw"></i>
                                <span className="d-none d-md-inline">Products</span>
                            </Link>
                        </li>
                    </>
                )}

                { user.role === 'shop' && (
                    <li className="nav-item">
                        <Link 
                            className="nav-link text-black d-flex align-items-center justify-content-center justify-content-md-start gap-2" 
                            to={'/stores/orders'}>
                            <i className="fa fa-shopping-basket"> </i>
                            <span className="d-none d-md-inline">Orders</span>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Sidebar;