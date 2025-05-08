import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoginSignText from "../simJiHyun/LoginSignText.jsx";
import LoginText from "../simJiHyun/login/LoginText.jsx";
// import "../simJiHyun/SjhCss.css"
import {useNavigate} from "react-router-dom";

function AdminLogin() {
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
                        <LoginSignText text={"관리자 로그인"}/>
                    </div>

                    <LoginText holder={"관리자 아이디 입력"}/>
                    <LoginText holder={"관리자 비밀번호 입력"}/>


                    <div className={"mt-4 d-flex justify-content-center"}>
                        <button
                            type={"submit"}
                            className={"py-3 fw-bold text-light fs-5 flex-fill rounded-3 border-0"}
                            style={{backgroundColor: "#FFB74D", maxWidth: "400px"}}
                            onClick={() => {
                                nv("/pre/reg")
                            }}
                        >
                            로그인
                        </button>
                    </div>

                    {/*<div className={"mt-4 ms-4 me-4 d-flex justify-content-center"}>*/}
                    {/*    <div className={"col d-flex flex-row justify-content-between fs-6"}*/}
                    {/*         style={{maxWidth: "400px"}}>*/}
                    {/*        <p>아직 아이디가 없으시다면 ? </p>*/}
                    {/*        <p><FontAwesomeIcon icon={faArrowRight}/></p>*/}
                    {/*        <a href="/signUp" style={{color: "#FFB74D", textDecorationLine: 'none'}}> 가입하기</a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
