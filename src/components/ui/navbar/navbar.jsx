import boxIcon from '../../../assets/img/icons/box-icon.png';
import { Link } from "react-router-dom";
import { useAuth } from '../../../contexts/auth-context';

function Navbar () {

    const { user, logout } = useAuth();

    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to='/dashboard'>
                    <img src={ boxIcon }
                        alt="Logo" 
                        width="35" 
                        height="35" 
                        className="me-2" />
                        ShopManager
                </Link>
                
                {user && (
                    <div className='d-flex justify-content-end align-items-center gap-2'>
                        <span className='text-body-secondary'>{ user.email }</span>
                        <button 
                            type="button" 
                            className="btn btn-outline-secondary btn-sm" 
                            onClick={() => logout()}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;