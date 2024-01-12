import './MobileNav.css';
import logo from '../../../images/tinder_logo.png';
import {IoPerson} from 'react-icons/io5';
import {IoMdChatboxes} from 'react-icons/io';
import {Link} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {IoIosArrowBack} from 'react-icons/io';
import {useNavigate} from 'react-router-dom';

type MobileNavProps = {
    isInMatchesView: boolean;
};

function MobileNav({isInMatchesView}: MobileNavProps) {
    const [cookies] = useCookies(['UserId', 'AuthToken']);

    const navigate = useNavigate();

    const returnToPreviousView = () => {
        navigate('/dashboard');
    };

    return (
        <nav className="mobile-nav">
            <div className="mobile-nav-img-container">
                <Link to={`/profile/${cookies.UserId}`}>
                    <IoPerson size={30} className="mobile-nav-profile" />
                </Link>

                <img src={logo} className="mobile-nav-img" />
                {isInMatchesView ? (
                    <IoIosArrowBack
                        size={30}
                        onClick={returnToPreviousView}
                        className="mobile-nav-back"
                    />
                ) : (
                    <Link to="/matches">
                        <IoMdChatboxes size={30} className="mobile-nav-matches" />
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default MobileNav;
