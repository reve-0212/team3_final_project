import { Link, useMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/nav.css";
import { faHome, faUser, faClipboard, faStar } from "@fortawesome/free-solid-svg-icons";

function BottomNav() {

    const matchHome = useMatch("/");
    const matchDetails = useMatch("/latestDetails");
    const matchBookmark = useMatch("/bookmark");
    const matchUser = useMatch("/user/*"); // /user 및 하위 모두 포함

    return (
        <nav className={"nav-wrapper"}>
            <Link to={"/"} className={"bottom-nav-link"}>
                <div>
                    <FontAwesomeIcon
                        icon={faHome}
                        className={
                            matchHome ? "bottom-nav-item active-bottom-nav-item" : "bottom-nav-item"
                        }
                    />
                </div>
            </Link>

            <Link to={"/latestDetails"} className={"bottom-nav-link"}>
                <div>
                    <FontAwesomeIcon
                        icon={faClipboard}
                        className={
                            matchDetails ? "bottom-nav-item active-bottom-nav-item" : "bottom-nav-item"
                        }
                    />
                </div>
            </Link>

            <Link to={"/bookmark"} className={"bottom-nav-link"}>
                <div>
                    <FontAwesomeIcon
                        icon={faStar}
                        className={
                            matchBookmark ? "bottom-nav-item active-bottom-nav-item" : "bottom-nav-item"
                        }
                    />
                </div>
            </Link>

            <Link to={"/user"} className={"bottom-nav-link"}>
                <div>
                    <FontAwesomeIcon
                        icon={faUser}
                        className={
                            matchUser ? "bottom-nav-item active-bottom-nav-item" : "bottom-nav-item"
                        }
                    />
                </div>
            </Link>
        </nav>
    );
}

export default BottomNav;
