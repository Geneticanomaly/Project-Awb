import Navbar from '../../components/navbar/Navbar';
import './Login.css';
import AuthPortalLogin from '../../components/authportal/AuthPortalLogin';

function Login() {
    const authToken = false;

    return (
        <div className="login-container">
            <Navbar authToken={authToken} />
            <div className="login">
                <AuthPortalLogin />
            </div>
        </div>
    );
}

export default Login;
