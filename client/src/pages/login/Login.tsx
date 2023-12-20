import Navbar from "../../components/navbar/Navbar";
import "./Login.css";
import AuthModalLogin from "../../components/authportal/AuthModalLogin";

function Login() {
    return (
        <>
            <Navbar />
            <div className="login">
                <AuthModalLogin />
            </div>
        </>
    );
}

export default Login;
