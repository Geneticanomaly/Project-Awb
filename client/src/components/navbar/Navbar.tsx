import logo_color from '../../images/color-logo-tinder.png';
import './Navbar.css';
import {IoIosArrowBack} from 'react-icons/io';
import {useNavigate} from 'react-router-dom';

type NavbarProps = {
    isInProfilePage: boolean;
};

function Navbar({isInProfilePage}: NavbarProps) {
    const navigate = useNavigate();

    return (
        <nav className="nav">
            {!isInProfilePage ? (
                <div className="logo-container">
                    <img className="logo" src={logo_color} />
                </div>
            ) : (
                <div className="nav-item-container">
                    <IoIosArrowBack
                        size={30}
                        className="nav-back-btn"
                        onClick={() => navigate(-1)}
                    />
                    <button className="logout-btn">Logout</button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
