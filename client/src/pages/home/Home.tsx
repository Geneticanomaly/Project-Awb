import './Home.css';
import logo from '../../images/color-logo-tinder.png';
import {Link} from 'react-router-dom';

function Home() {
    return (
        <>
            <div className="home">
                <img data-testid="home-logo" src={logo} />
                <h2 data-testid="home-title">Search something you never thought you needed.</h2>
                <Link
                    to="/register"
                    className="primary-button link-button"
                    data-testid="home-register-btn"
                >
                    Create account
                </Link>

                <Link
                    to="/login"
                    className="primary-button link-button"
                    data-testid="home-login-btn"
                >
                    Login
                </Link>
            </div>
        </>
    );
}

export default Home;
