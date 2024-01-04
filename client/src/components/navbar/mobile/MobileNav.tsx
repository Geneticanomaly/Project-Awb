import './MobileNav.css';
import logo from '../../../images/tinder_logo.png';
import {IoPerson} from 'react-icons/io5';
import {IoMdChatboxes} from 'react-icons/io';
import {Link} from 'react-router-dom';
import {useCookies} from 'react-cookie';

function MobileNav() {
    const [cookies] = useCookies(['UserId', 'AuthToken']);

    return (
        <nav className="mobile-nav">
            <div className="mobile-nav-img-container">
                <Link to={`/profile/${cookies.UserId}`}>
                    <IoPerson size={30} className="mobile-nav-profile" />
                </Link>

                <img src={logo} className="mobile-nav-img" />
                <Link to="/matches">
                    <IoMdChatboxes size={30} className="mobile-nav-matches" />
                </Link>
            </div>
        </nav>
    );
}

export default MobileNav;
