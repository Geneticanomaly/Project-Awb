import Navbar from "../../components/navbar/Navbar";
import "./Login.css";
import AuthPortalLogin from "../../components/authportal/AuthPortalLogin";

function Login() {
    return (
        <>
            <Navbar />
            <div className="login">
                <AuthPortalLogin />
            </div>
        </>
    );
}

export default Login;
