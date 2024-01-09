import './Home.css';
import logo from '../../images/color-logo-tinder.png';
import {Link} from 'react-router-dom';

function Home() {
    return (
        <>
            <div className="home">
                <img src={logo} />
                <h2>Search something you never thought you needed.</h2>
                <Link to="/register" className="primary-button link-button">
                    Create account
                </Link>

                <Link to="/login" className="primary-button link-button">
                    Login
                </Link>
            </div>
        </>
    );
}

export default Home;
