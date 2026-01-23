import { Link } from "react-router-dom";
import { useAuth } from '../../../contexts';

function Sidebar () {

    const { user } = useAuth();

    return (
        <nav className="col-3 col-md-2 col-sm-1 bg-body-tertiary vh-100 d-flex flex-column p-3">
            <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                    <Link className="nav-link text-black d-flex align-items-center gap-2" to={'/dashboard'}>
                        <i className="fa fa-home fa-fw"></i>
                        <span className="d-none d-md-inline">Dashboard</span>
                    </Link>
                </li>
                { user.role === 'admin' && (
                    <li className="nav-item">
                        <Link className="nav-link text-black d-flex align-items-center gap-2" to={''}>
                            <i className="fa fa-cubes fa-fw"></i>
                            <span className="d-none d-md-inline">Warehouse</span>
                        </Link>
                    </li>
                )}
                <li className="nav-item">
                    <Link className="nav-link text-black d-flex align-items-center gap-2" to={''}>
                        <i className="fa fa-building fa-fw"></i>
                        <span className="d-none d-md-inline">Store</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-black d-flex align-items-center gap-2" to={'/products'}>
                        <i className="fa fa-apple fa-fw"></i>
                        <span className="d-none d-md-inline">Products</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;