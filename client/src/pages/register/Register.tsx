import Navbar from "../../components/navbar/Navbar";
import "./Register.css";
import AuthPortalRegister from "../../components/authportal/AuthPortalRegister";

function Register() {
    return (
        <>
            <Navbar />
            <div className="register">
                <AuthPortalRegister />
            </div>
        </>
    );
}

export default Register;
