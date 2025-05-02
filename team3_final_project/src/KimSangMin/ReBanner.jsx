import {Link} from "react-router-dom";

function ReBanner() {
    return (
        <div>
            <div className="fixed-top">
                <nav className="navbar navbar-expand-lg navbar-dark"
                     style={{height: '10vh', backgroundColor: '#FFD700'}}>
                    <div className="container-fluid d-flex justify-content-between align-items-center">
                        <div style={{textAlign: 'center'}} className="text-white fs-1">Logo</div>
                        <Link to="/pre/login">
                            <button type={"button"} className={"flex-end"}>로그아웃</button>
                        </Link>

                    </div>
                </nav>
            </div>

            {/* 옆 사이드바 */}
            <div style={{
                position: 'fixed',
                top: '10vh',
                left: 0,
                width: '200px',
                height: '90vh',
                backgroundColor: '#FAFAFA',
                color: 'white',
                padding: '1rem'
            }}>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link text-black" href="/pre/PreMain">홈</a>
                    </li>
                    <br/>

                    <li className="nav-item">
                        <a className="nav-link text-black" href="/pre/update">개인정보 수정</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link text-black" href="/pre/PreReSet">가게정보</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-black" href="/pre/PreCh">가게통계</a>
                    </li>
                    <br/>

                    <li className="nav-item">
                        <a className="nav-link text-black" href="/pre/MenuList">가게메뉴</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-black" href="/pre/PreRe">리뷰관리</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ReBanner

