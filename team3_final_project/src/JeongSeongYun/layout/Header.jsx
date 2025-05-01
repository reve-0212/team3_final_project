import {Link, useLocation, useMatch, useNavigate, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight, faGear} from "@fortawesome/free-solid-svg-icons";
import "../css/header.css";
import useUserStore from "../../stores/useUserStore.jsx";

function Header() {
    const {user} = useUserStore();
    const locationNow = useLocation();
    const Nv = useNavigate();

    const matchUser = useMatch("/user/*");
    const matchBookmark = useMatch("/bookmark");
    const matchLatestDetails = useMatch("/latestDetails");
    const matchContentList = useMatch("/contentList/:category");
    const matchWaiting = useMatch("/waiting/*")
    const matchBook = useMatch("/book/*")

    const goBack = () => Nv(-1);
    const handleLogin = () => Nv("/user/login");
    const handleSetting = () => Nv("/user/setting");

    if (locationNow.pathname === "/") {
        return (
            <header className={'header'}>
                <div className={'back'}></div>
                <Link to={'/'} className={'link'}>
                    <h1 className={'header-title'}>Tabling</h1>
                </Link>
                <div className={'link setting'}></div>
            </header>
        );
    }
    if (matchUser) {
        return (
            <header className="header">
                {user ? (
                    <div className="login-title" onClick={handleSetting}>
                        <span>{user.name}님</span>&nbsp;
                        <FontAwesomeIcon icon={faAngleRight} className="loginIcon"/>
                    </div>
                ) : (
                    <div className="login-title" onClick={handleLogin}>
                        <span>로그인해주세요</span>&nbsp;
                        <FontAwesomeIcon icon={faAngleRight} className="loginIcon"/>
                    </div>
                )}
                <Link to="/user/setting" className="link">
                    <div className="setting">
                        <FontAwesomeIcon icon={faGear} className="settingIcon"/>
                    </div>
                </Link>
            </header>
        );
    }

    if (matchBookmark) {
        return (
            <header className={'header'}>
                <div className={'back'}>
                    <FontAwesomeIcon icon={faAngleLeft} className={'backIcon'} onClick={goBack}/>
                </div>
                <div className={'link pe-none'}>
                    <h1 className={'header-title'}>즐겨찾기</h1>
                </div>
                <div className={'link setting'}></div>
            </header>
        );
    }

    if (matchLatestDetails) {
        return (
            <header className={'header'}>
                <div className={'back'}>
                    <FontAwesomeIcon icon={faAngleLeft} className={'backIcon'} onClick={goBack}/>
                </div>
                <div className={'link pe-none'}>
                    <h1 className={'header-title'}>최근내역</h1>
                </div>
                <div className={'link setting'}></div>
            </header>
        );
    }

    if (matchContentList) {
        const category = matchContentList?.params?.category;
        console.log(category)

        const categoryMap = {
            korean: "한식",
            chinese: "중식",
            western: "양식",
            japanese: "일식",
            snack: "분식",
            cafe: "카페/디저트",
            fusion: "퓨전",
            ect: "기타"
        };

        const categoryName = categoryMap[category] || "카테고리"

        return (
            <header className={'header'}>
                <div className={'back'}>
                    <FontAwesomeIcon icon={faAngleLeft} className={'backIcon'} onClick={goBack}/>
                </div>
                <div className={'link pe-none'}>
                    <h1 className={'header-title'}>{categoryName}</h1>
                </div>
                <div className={'link setting'}></div>
            </header>
        )
    }

    if (matchWaiting) {
        return (
            <header className={'header'}>
                <div className={'back'}>
                    <FontAwesomeIcon icon={faAngleLeft} className={'backIcon'} onClick={goBack}/>
                </div>
                <div className={'link pe-none'}>
                    <h1 className={'header-title'}>웨이팅</h1>
                </div>
                <div className={'link setting'}></div>
            </header>
        )
    }

    if (matchBook) {
        return (
            <header className={'header'}>
                <div className={'back'}>
                    <FontAwesomeIcon icon={faAngleLeft} className={'backIcon'} onClick={goBack}/>
                </div>
                <div className={'link pe-none'}>
                    <h1 className={'header-title'}>예약</h1>
                </div>
                <div className={'link setting'}></div>
            </header>
        )
    }

    return (
        <header className={'header'}>
            <div className={'back'}>
                <FontAwesomeIcon icon={faAngleLeft} className={'backIcon'} onClick={goBack}/>
            </div>
            <Link to={'/'} className={'link'}>
                <h1 className={'header-title'}>Tabling</h1>
            </Link>
            <div className={'link setting'}></div>
        </header>
    );
}

export default Header