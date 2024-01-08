import Navbar from '../../components/navbar/Navbar';
import './Register.css';
import AuthPortalRegister from '../../components/authportal/AuthPortalRegister';

function Register() {
    return (
        <div className="register-container">
            <Navbar />
            <div className="register">
                <AuthPortalRegister />
            </div>
        </div>
    );
}

export default Register;
