import SjhNav from "../SjhNav.jsx";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoginSignText from "../LoginSignText.jsx";
import LoginText from "./LoginText.jsx";

function Login() {
    return (
        <div>
            <SjhNav/>

            <form className={"container"}>
                <LoginSignText text={"로그인"}/>

                <LoginText holder={"아이디 입력"}/>
                <LoginText holder={"비밀번호 입력"}/>

                <div className={"row mt-4"}>
                    <button type={"submit"} className={"btn shadow-sm py-3 fw-bold text-light fs-4"}
                            style={{backgroundColor: "#FFB74D"}}>로그인
                    </button>
                </div>

                <div className={"row mt-4"}>
                    <div className={"col d-flex flex-row justify-content-between fs-6"}>
                        <p>아직 아이디가 없으시다면 ? </p>
                        <p><FontAwesomeIcon icon={faArrowRight}/></p>
                        <a href="/signUp" style={{color: "#FFB74D", textDecorationLine: 'none'}}> 가입하기</a>
                    </div>
                </div>

            </form>

        </div>
    );
}

export default Login