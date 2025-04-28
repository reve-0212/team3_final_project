import {Link, useLocation, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight, faGear} from "@fortawesome/free-solid-svg-icons";
import "../css/header.css";

function Header() {

    const locationNow = useLocation();
    const Nv = useNavigate();

    const goBack = () => {
        Nv(-1);
    };

    const handleSetting = () => {
        Nv("/setting");
        console.log(locationNow);
    };

    const handleLogin = () => {
        Nv("/login");
        console.log(locationNow);
    }


    if(locationNow.pathname === "/") {
        return(
            <header className={'header'}>
                <div className={'back'}>

                </div>
                <Link to={'/'} className={'link'}>
                    <h1 className={'title'}>Tabling</h1>
                </Link>
                <div className={'link setting'}>

                </div>
            </header>
        )
    }else if(locationNow.pathname === "/user"){
        return(
            <header className={'header'}>
                <div className={'logintitle'} onClick={handleLogin}>
                    <span>로그인해주세요</span>&nbsp;
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        className={'loginIcon'}
                    />
                </div>

                <div className={'link'}>

                </div>

                {/*<Link to={'/'} className={'link'}>*/}
                {/*    <h1 className={'title'}>Tabling</h1>*/}
                {/*</Link>*/}

                <Link to={'/setting'} className={'link'} onClick={handleSetting}>
                    <div className={'setting'}>
                        <FontAwesomeIcon
                            icon={faGear}
                            className={'settingIcon'}
                        />
                    </div>
                </Link>
            </header>
        )
    }else if(locationNow.pathname === "/bookmark"){
        return(
            <header className={'header'}>
                <div className={'back'}>
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        className={'backIcon'}
                        onClick={goBack}
                    />
                </div>
                <div className={'link pe-none'}>
                    <h1 className={'title'}>Bookmark</h1>
                </div>
                <div className={'link setting'}>

                </div>
            </header>
        )
    }else if(locationNow.pathname === "/map"){
        return(
            <header className={'header'}>
                <div className={'back'}>
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        className={'backIcon'}
                        onClick={goBack}
                    />
                </div>
                <div className={'link pe-none'}>
                    <h1 className={'title'}>내 주변</h1>
                </div>
                <div className={'link setting'}>

                </div>
            </header>
        )
    }
    else{
        return (
            <header className={'header'}>
                <div className={'back'}>
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        className={'backIcon'}
                        onClick={goBack}
                    />
                </div>

                <Link to={'/'} className={'link'}>
                    <h1 className={'title'}>Tabling</h1>
                </Link>

                <div className={'link setting'}>

                </div>
                {/*<Link to={'/setting'} className={'link'} onClick={handleSetting}>*/}
                {/*    <div className={'setting'}>*/}
                {/*        <FontAwesomeIcon*/}
                {/*            icon={faGear}*/}
                {/*            className={'settingIcon'}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</Link>*/}
            </header>
        );
    }


}

export default Header