import {Link} from 'react-router-dom';
import './AuthPortal.css';
import {useState} from 'react';
import {createUser} from '../../api/createUser';
import {useNavigate} from 'react-router-dom';

/* type AuthModalProps = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}; */

function AuthPortalRegister() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    /* const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword:
    }) */
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            if (password !== confirmPassword) {
                setError('Passwords need to match');
                return;
            } else {
                // api call
                await createUser(email, password);
                navigate('/onboarding');
            }
            console.log('make a post request to database');
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
                <form className="form" onSubmit={handleSubmit}>
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

                {/* <Link to="/onboarding" className="primary-button button">
                    Submit
                </Link> */}
                <div className="line" />
                <h2>Get started</h2>
            </div>
        </div>
    );
}

export default AuthPortalRegister;
