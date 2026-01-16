import boxIcon from '../../../assets/img/icons/box-icon.png';
import { Link } from "react-router-dom";

function Navbar () {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to='/'>
                    <img src={ boxIcon }
                        alt="Logo" 
                        width="35" 
                        height="35" className="me-2" />
                        ShopManager
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;