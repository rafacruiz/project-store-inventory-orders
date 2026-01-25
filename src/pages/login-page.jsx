import boxIcon from '../assets/img/icons/box-icon.png';
import { LoginForm } from "../components/users";

function LoginPage () {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="col-12 col-md-6">
                <div className="d-flex justify-content-center align-items-center py-3">
                    <img 
                        src={boxIcon} 
                        class="rounded mx-auto d-block" 
                        alt="ShopManager" 
                        style={{ width: '60px', height: '60px' }} />
                </div>
                <div className="card shadow">
                    <div className="card-body p-4">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;