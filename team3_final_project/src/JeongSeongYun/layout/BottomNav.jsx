import {Link, useLocation, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../css/nav.css"
import {faHome, faMagnifyingGlass, faMapLocationDot, faUser} from "@fortawesome/free-solid-svg-icons";


function BottomNav() {

    const locationNow = useLocation();

    const Nv = useNavigate();
        return(
            <nav className={'nav-wrapper'}>
                <Link to={'/'} className={'bottom-nav-link'}>
                    <div>
                        <FontAwesomeIcon
                            icon={faHome}
                            className={
                                locationNow.pathname === "/"
                                    ? 'bottom-nav-item active-bottom-nav-item'
                                    : 'bottom-nav-item'
                            }
                        />
                    </div>
                </Link>
                <Link to={'/map'} className={'bottom-nav-link'}>
                    <div>
                        <FontAwesomeIcon
                            icon={faMapLocationDot}
                            className={
                                locationNow.pathname === "/map"
                                    ? 'bottom-nav-item active-bottom-nav-item'
                                    : 'bottom-nav-item'
                            }
                        />
                    </div>
                </Link>
                <Link to={'/bookmark'} className={'bottom-nav-link'}>
                    <div>
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className={
                                locationNow.pathname === "/bookmark"
                                    ? 'bottom-nav-item active-bottom-nav-item'
                                    : 'bottom-nav-item'
                            }
                        />
                    </div>
                </Link>
                <Link to={'/user'} className={'bottom-nav-link'}>
                    <div>
                        <FontAwesomeIcon
                            icon={faUser}
                            className={
                                locationNow.pathname === "/user"
                                    ? 'bottom-nav-item active-bottom-nav-item'
                                    : 'bottom-nav-item'
                            }
                        />
                    </div>
                </Link>
            </nav>
        );
}

export default BottomNav