import {Link} from 'react-router-dom';
import './AuthPortal.css';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import loginUser from '../../api/loginUser';

function AuthPortalLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['UserId', 'AuthToken']);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await loginUser(email, password);

            setCookie('UserId', response.id);
            setCookie('AuthToken', response.token);

            if (response.message === 'Login failed, incorrect credentials') {
                showError('Invalid email address');
            } else if (response.message === 'Incorrect password') {
                showError('Incorrect password');
            }

            console.log('My Response:', response);

            if (response.status === 201) navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
    };

    const showError = (message: string, timeout = 5000) => {
        setError(message);

        // Clear the error after the specified timeout
        setTimeout(() => {
            setError('');
        }, timeout);
    };

    return (
        <div className="auth-modal" data-testid="login-modal">
            <Link to="/" className="close-icon" data-testid="login-close-btn">
                ⓧ
            </Link>
            <div className="auth-container">
                <h1>Login</h1>
                <span>
                    By clicking Submit, you agree to our terms. Learn how we process your data in
                    our Privacy Policy and Cookie Policy.
                </span>
                <form className="form" onSubmit={(e) => handleSubmit(e)} data-testid="login-form">
                    <input
                        id="email"
                        type="email"
                        placeholder="Email..."
                        required={true}
                        className="form-input"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        id="password"
                        type="password"
                        placeholder="Password..."
                        required={true}
                        className="form-input"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="error-msg">{error}</p>}
                    <input type="submit" className="primary-button button" />
                </form>

                <div className="line" />
                <div className="link-container">
                    <Link className="link" to="/register" data-testid="new-around-here">
                        <span>New around here? Sign up!</span>
                    </Link>
                    <span>Forgot password?</span>
                </div>
            </div>
        </div>
    );
}

export default AuthPortalLogin;
