import Navbar from "../../components/navbar/Navbar";
import "./Register.css";
import AuthModalRegister from "../../components/authportal/AuthModalRegister";

function Register() {
    return (
        <>
            <Navbar />
            <div className="register">
                <AuthModalRegister />
            </div>
        </>
    );
}

export default Register;
