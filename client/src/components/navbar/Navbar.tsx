import logo_color from '../../images/color-logo-tinder.png';
import './Navbar.css';

type NavProps = {
    authToken: boolean;
};

function Navbar({authToken}: NavProps) {
    return (
        <nav className="nav">
            <div className="logo-container">
                <img className="logo" src={logo_color} />
            </div>
            {authToken && <img className="profile-img" src="https://i.imgur.com/oPj4A8u.jpeg" />}
        </nav>
    );
}

export default Navbar;
