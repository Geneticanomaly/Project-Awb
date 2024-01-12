import {useCookies} from 'react-cookie';
import logo_color from '../../images/color-logo-tinder.png';
import './Navbar.css';
import {IoIosArrowBack} from 'react-icons/io';
import {useNavigate} from 'react-router-dom';

type NavbarProps = {
    isInProfilePage: boolean;
    userId: string | undefined;
};

function Navbar({isInProfilePage, userId}: NavbarProps) {
    const navigate = useNavigate();

    const [cookies, removeCookies] = useCookies(['UserId', 'AuthToken']);

    const authToken = cookies.AuthToken;

    const handleLogout = () => {
        if (authToken) {
            removeCookies('AuthToken', undefined);
            removeCookies('UserId', undefined);
            navigate('/');
        }
    };

    return (
        <nav className="nav" data-testid="navbar">
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
                    {userId == cookies.UserId && (
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
