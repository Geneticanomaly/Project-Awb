import Navbar from '../../components/navbar/Navbar';
import './Login.css';
import AuthPortalLogin from '../../components/authportal/AuthPortalLogin';

function Login() {
    return (
        <div className="login-container">
            <Navbar isInProfilePage={false} userId={''} />
            <div className="login">
                <AuthPortalLogin />
            </div>
        </div>
    );
}

export default Login;
