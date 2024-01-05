import logo_color from '../../images/color-logo-tinder.png';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="nav">
            <div className="logo-container">
                <img className="logo" src={logo_color} />
            </div>
        </nav>
    );
}

export default Navbar;
