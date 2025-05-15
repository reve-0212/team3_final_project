import {Link, useNavigate} from "react-router-dom";
import {logout} from "../simJiHyun/service/ApiService.js";
import useUserStore from "../stores/useUserStore.jsx";

function ReBanner() {

    const nv = useNavigate();
    const {clearUser} = useUserStore();
    // const hLogout = () => {
    //     axios.post("http://localhost:8080/owner/logout", {}, { withCredentials: true })
    //         .then((response) => {
    //             const { success, message } = response.data;
    //             alert("로그아웃 되었습니다.");
    //
    //             if(success) {
    //                 alert(message)
    //                 nv("/pre/login")
    //             }
    //             else {
    //                 alert("로그아웃 실패")
    //             }
    //         })
    //         .catch( (error) => {
    //             alert("서버 오류가 발생했습니다" + error)
    //         })
    // }

    const handleLogout = () => {
        const confirmed = window.confirm("로그아웃 하시겠습니까?");
        if (confirmed) {
            logout()
            clearUser();
            nv("/pre");
        }
    };


    return (
        <div>
            <div className="fixed-top">
                <nav className="navbar navbar-expand-lg navbar-dark"
                     style={{height: '10vh', backgroundColor: '#FFD700'}}>
                    <div className="container-fluid d-flex justify-content-between align-items-center">
                        <Link className="navbar-brand text-white fs-1 text-align-center" to="/pre/PreMain">
                            Logo
                        </Link>
                        <button type={"button"} onClick={handleLogout} className={"flex-end"}>로그아웃</button>
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
                        <a className="nav-link text-black" href="/pre/PreMain/:resIdx">홈</a>
                    </li>
                    <br/>

                    <li className="nav-item">
                        <a className="nav-link text-black" href="/pre/update">개인정보 수정</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link text-black" href="/pre/PreReSet">가게정보</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-black" href="/pre/func">가게기능</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-black" href="/pre/PreCh">가게통계</a>
                    </li>
                    <br/>

                    <li className="nav-item">
                        <a className="nav-link text-black" href="/pre/PreToday">오늘 예약</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-black" href="/pre/PrePast">지난날짜 예약</a>
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