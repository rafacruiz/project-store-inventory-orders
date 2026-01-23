import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as AuthUsers from '../../../services/auth-service';
import { useAuth } from '../../../contexts/auth-context';

function LoginForm () {
    
    const navigate = useNavigate();
    const { login } = useAuth();

    const validations = {
        emailUser: { required: 'Email is required' },
        passwordUser: { required: 'Password is required' }
    }

    const { register, 
            handleSubmit,
            reset,
            setError,
            clearErrors,
            formState: { isSubmitting, errors } 
        } = useForm({ mode: 'onChange' });

    const handleLogin = async (userData) => {
        try {
            const response = await AuthUsers.getUserLogin(userData);
            console.info(response);
            reset();
            login(response);
            navigate('/dashboard');
        } catch (error) {
            const { status, message } = error;

            if (status === 401) {
                console.error(message || {});

                setError('user', {
                    message: message || 'Unauthorized access'
                });
            }
        }
    }

    return (
        <form onSubmit={ handleSubmit(handleLogin) }>
            {errors.user && (
                <div className="alert alert-danger text-center">
                    {errors.user.message}
                </div>
            )}
            
            <div className="form-floating mb-3">
                <input 
                    type="email" 
                    className={`form-control ${errors.emailUser ? 'is-invalid' : ''}`}
                    id="emailUser" 
                    placeholder="name@example.com" 
                    { ...register('emailUser', validations.emailUser) } 
                    onChange={() => clearErrors('user')} />
                {errors.emailUser && (<div className="invalid-feedback">{errors.emailUser.message}</div>)}
                <label>Email</label>
            </div>

            <div className="form-floating mb-3">
                <input 
                    type="password" 
                    className={`form-control ${ errors.passwordUser ? 'is-invalid' : ''}`} 
                    id="passwordUser" 
                    placeholder="Password" 
                    { ...register('passwordUser', validations.passwordUser) }
                    onChange={() => clearErrors('user')} />
                {errors.passwordUser && (<div className="invalid-feedback">{errors.passwordUser.message}</div>)}
                <label>Password</label>
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting} >
                {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
}

export default LoginForm;