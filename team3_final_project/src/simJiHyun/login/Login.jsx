import SjhNav from "../nav/SjhNav.jsx";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoginSignText from "../LoginSignText.jsx";
import LoginText from "./LoginText.jsx";
import "../SjhCss.css"

function Login() {
    return (
        <form className={"container vh-100 pt-2"}>

            <LoginSignText text={"로그인"}/>

            <LoginText holder={"아이디 입력"}/>
            <LoginText holder={"비밀번호 입력"}/>

            <div className={"mt-4 d-flex justify-content-center"}>
                <button type={"submit"} className={"btn py-3 fw-bold text-light fs-5 rounded-3"}
                        style={{backgroundColor: "#FFB74D", width: "400px"}}>로그인
                </button>
            </div>

            <div className={"mt-4 d-flex justify-content-center"}>
                <div className={"col d-flex justify-content-between fs-6"}
                     style={{maxWidth: "400px"}}>
                    <p>아직 아이디가 없으시다면 ? </p>
                    <p><FontAwesomeIcon icon={faArrowRight}/></p>
                    <a href="/signUp" style={{color: "#FFB74D", textDecorationLine: 'none'}}> 가입하기</a>
                </div>
            </div>
        </form>
    );
}

export default Login