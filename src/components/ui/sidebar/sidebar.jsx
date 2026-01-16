import { Link } from "react-router-dom";

function Sidebar () {
    return (
        <nav className="col-3 col-md-2 bg-body-tertiary vh-100 d-flex flex-column p-3">
            <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                    <Link className="nav-link text-black" to={'/'}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-black" to={''}>Warehouse</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-black" to={''}>Stores</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-black" to={'/products'}>Products</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;