import Navbar from '../../components/navbar/Navbar';
import './Register.css';
import AuthPortalRegister from '../../components/authportal/AuthPortalRegister';

function Register() {
    const authToken = false;

    return (
        <div className="register-container">
            <Navbar authToken={authToken} />
            <div className="register">
                <AuthPortalRegister />
            </div>
        </div>
    );
}

export default Register;
