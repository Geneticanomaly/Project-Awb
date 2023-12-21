import {Link} from "react-router-dom";
import "./AuthPortal.css";
import {useState} from "react";

function AuthPortalLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {
        /* try {
            if (isSignUp && (password !== confirmPassword)) {
                setError("Passwords need to match");
            }
            console.log("make a post request to database")
        } catch (error) {
            console.log(error);
        } */
    };

    return (
        <div className="auth-modal">
            <Link to="/" className="close-icon">
                ⓧ
            </Link>
            <div className="auth-container">
                <h1>Login</h1>
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
                </form>

                <Link to="/app" className="primary-button button">
                    Submit
                </Link>
                <div className="line" />
                <h2>Get chatting</h2>
            </div>
        </div>
    );
}

export default AuthPortalLogin;
