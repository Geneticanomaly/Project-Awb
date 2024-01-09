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
            if (password !== confirmPassword) {
                console.log("Passwords don't match");
                setError('Passwords need to match');
                return;
            } else {
                // api call
                console.log(email, password, confirmPassword);
                const response = await createUser(email, password);
                console.log('My Response:', response);

                setCookie('UserId', response.user_id);
                setCookie('AuthToken', response.token);

                if (response.status === 201) navigate('/onboarding');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="auth-modal">
            <Link to="/" className="close-icon">
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
                    <input type="submit" className="primary-button button" />
                </form>

                <div className="line" />
                <h2>Get started</h2>
            </div>
        </div>
    );
}

export default AuthPortalRegister;
