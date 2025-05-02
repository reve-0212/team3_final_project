import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoginSignText from "../simJiHyun/LoginSignText.jsx";
import LoginText from "../simJiHyun/login/LoginText.jsx";
import SjhNav from "../simJiHyun/nav/SjhNav.jsx";
import "../simJiHyun/SjhCss.css"
import {useNavigate} from "react-router-dom";


function OwnerLogin() {
    const nv = useNavigate();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}>

            <div
                style={{
                    display: "flex",
                    flexDirection: 'column',
                    gap: "1rem",
                    marginTop: "2rem",
                }}
            >

                <div className="fixed-top">
                    <nav className="navbar navbar-expand-lg navbar-dark"
                         style={{height: '10vh', backgroundColor: '#FFD700'}}>
                        <div className="container-fluid d-flex justify-content-between align-items-center">
                            <div style={{textAlign: 'center'}} className="text-white fs-1">Logo</div>
                        </div>
                    </nav>
                </div>
                <form className={"container"}>
                    <div className={"row"} style={{paddingRight: '1rem'}}>
                        <LoginSignText text={"사장님 로그인"}/>
                    </div>

                    <LoginText holder={"사장님 아이디 입력"}/>
                    <LoginText holder={"사장님 비밀번호 입력"}/>

                    <div className={"mt-4 d-flex ms-4 me-4 justify-content-center"}>
                        <button
                            type={"submit"}
                            className={"btn py-3 fw-bold text-light fs-5 flex-fill"}
                            style={{backgroundColor: "#FFB74D", maxWidth: "400px"}}
                            onClick={() => {
                                nv("/pre/PreSelect")
                            }}
                        >
                            로그인
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OwnerLogin;
