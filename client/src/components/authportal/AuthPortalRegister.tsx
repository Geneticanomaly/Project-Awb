import {Link} from 'react-router-dom';
import './AuthPortal.css';
import {useState} from 'react';
import {createUser} from '../../api/createUser';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';

function AuthPortalRegister() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [cookies, setCookie, removeCookie] = useCookies(['UserId', 'AuthToken']);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Check whether given password match
            if (password !== confirmPassword) {
                showError('Passwords do not match');
                return;
            } else {
                const response = await createUser(email, password);

                if (response === 'Email already in use') {
                    showError('Email already in use');
                    return;
                }

                // Set cookies
                setCookie('UserId', response.user_id);
                setCookie('AuthToken', response.token);

                if (response.status === 201) navigate('/onboarding');
            }
        } catch (error) {
            console.error('Error occured while registering user', error);
        }
    };

    // Display the error message for 5 seconds
    const showError = (message: string, timeout = 5000) => {
        setError(message);

        // Clear the error after the specified timeout
        setTimeout(() => {
            setError('');
        }, timeout);
    };

    return (
        <div className="auth-modal" data-testid="register-modal">
            <Link to="/" className="close-icon" data-testid="register-close-btn">
                ⓧ
            </Link>
            <div className="auth-container">
                <h1>Create Account</h1>
                <span>
                    By clicking Submit, you agree to our terms. Learn how we process your data in
                    our Privacy Policy and Cookie Policy.
                </span>
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
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
                    <input
                        id="password-confirm"
                        type="password"
                        placeholder="Confirm Password..."
                        required={true}
                        className="form-input"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {error && <p className="error-msg">{error}</p>}
                    <input type="submit" className="primary-button button" />
                </form>

                <div className="line" />
                <h2>Get started</h2>
            </div>
        </div>
    );
}

export default AuthPortalRegister;
