import SjhNav from "../nav/SjhNav.jsx";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoginSignText from "../LoginSignText.jsx";
import LoginText from "./LoginText.jsx";
import "../SjhCss.css"
import useUserStore from "../../stores/useUserStore.jsx";
import {Link, useNavigate} from "react-router-dom";

function Login() {

    const setUser = useUserStore((state) => state.setUser);
    const Nv = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { name: "홍길동"};
        setUser(userData);
        Nv("/user");
    }

    return (
        <form className={"container pt-2"} onSubmit={handleSubmit}>

            <LoginSignText text={"로그인"}/>

            <LoginText holder={"아이디 입력"}/>
            <LoginText holder={"비밀번호 입력"}/>

            <div className={"mt-4 d-flex justify-content-center"}>
                <button type={"submit"} className={"btn py-3 fw-bold text-light fs-5"}
                        style={{backgroundColor: "#FFB74D", width: "400px"}}>로그인
                </button>
            </div>

            <div className={"mt-4 d-flex justify-content-center"}>
                <div className={"col d-flex justify-content-between fs-6"}
                     style={{maxWidth: "400px"}}>
                    <p>아직 아이디가 없으시다면 ? </p>
                    <p><FontAwesomeIcon icon={faArrowRight}/></p>
                    <Link to={"/user/signUp"} style={{color: "#FFB74D", textDecorationLine: 'none'}} >가입하기</Link>
                </div>
            </div>
        </form>
    );
}

export default Login