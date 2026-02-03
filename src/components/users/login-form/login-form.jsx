import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import * as AuthUsers from '../../../services/auth-service';
import { useAuth } from '../../../contexts/auth-context';

const validations = {
    emailUser: { 
        required: 'Email is required',
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format'
        }
    },
    passwordUser: { 
        required: 'Password is required',
        minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long'
        },
    }
}

function LoginForm () {
    
    const navigate = useNavigate();

    const { login } = useAuth();

    const { register, 
            handleSubmit,
            setError,
            watch,
            clearErrors,
            formState: { isSubmitting, errors } 
        } = useForm({ 
            mode: 'all', 
            reValidateMode: "onChange" 
        });

    const [email, pass] = watch(['emailUser', 'passwordUser']);

    useEffect(() => {
        if (errors?.root) {
            clearErrors('root');
        }
    }, [email, pass]);

    const handleLogin = async (userData) => {
        try {
            const response = await AuthUsers.getUserLogin(userData);
            console.info(response);
            login(response);
            navigate('/');
        } catch (error) {
            const { status, message } = error;

            if (status === 401) {
                console.error(message || {});

                setError('root', {
                    type: 'server',
                    message: message || 'Unauthorized access'
                });
            }
        }
    }

    return (
        <form onSubmit={ handleSubmit(handleLogin) }>
            { errors.root && (
                <div className="alert alert-danger d-flex justify-content-center align-items-center gap-2">
                    <i className="fa fa-exclamation-triangle"></i>
                    <div>
                        { errors.root.message }
                    </div>
                </div>
            )}
            
            <div className="form-floating mb-3">
                <input 
                    type="email" 
                    className={`form-control ${ errors.emailUser ? 'is-invalid' : ''}`}
                    id="emailUser" 
                    placeholder="name@example.com" 
                    { ...register('emailUser', validations.emailUser) } />
                { errors.emailUser && (<div className="invalid-feedback">{errors.emailUser.message}</div>) }
                <label>Email</label>
            </div>

            <div className="form-floating mb-3">
                <input 
                    type="password" 
                    className={`form-control ${ errors.passwordUser ? 'is-invalid' : ''}`} 
                    id="passwordUser" 
                    placeholder="Password" 
                    { ...register('passwordUser', validations.passwordUser) }/>
                { errors.passwordUser && (<div className="invalid-feedback">{errors.passwordUser.message}</div>) }
                <label>Password</label>
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={ isSubmitting } >
                { isSubmitting ? <BounceLoader className="mt-2" color="#f8fafa" size={22}  /> : 'Login' }
            </button>
        </form>
    );
}

export default LoginForm;