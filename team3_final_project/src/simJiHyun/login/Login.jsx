import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoginSignText from "../LoginSignText.jsx";
import "../SjhCss.css"
import useUserStore from "../../stores/useUserStore.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function Login() {

    const setUser = useUserStore((state) => state.setUser);
    const Nv = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { name: "홍길동"};
        setUser(userData);
        Nv("/user");
    }

    const [id, setId] = useState("");
    const [pass, setPass] = useState("");

    const handleChangeId = (event) => {
        setId(event.target.value)
        console.log(id)
    }

    const handleChangePass = (event) => {
        setPass(event.target.value)
        console.log(pass)
    }

    const isIdAvailable = (userId, userPass, event) => {
        event.preventDefault();

        axios.post("http://localhost:8080/login", {
            params: {userId: userId, userPass: userPass}
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
                console.log(err)
            }
        )
    }

    return (
        <form className={"container pt-2"} onSubmit={handleSubmit}>

            <LoginSignText text={"로그인"}/>

            <div className={"mt-4 d-flex justify-content-center"}>
                <div className={"d-flex flex-column gap-4"}>
                    <input type={"text"}
                           className={"form-control py-3"}
                           style={{width: '25rem'}}
                           placeholder={"아이디 입력"}
                           onChange={handleChangeId}/>
                    <input type={"text"}
                           className={"form-control py-3"}
                           style={{width: '25rem'}}
                           placeholder={"비밀번호 입력"}
                           onChange={handleChangePass}/>
                </div>
            </div>

            <div className={"mt-4 d-flex justify-content-center"}>
                <button type={"submit"}
                        className={"btn py-3 fw-bold text-light fs-5 rounded-3"}
                        style={{backgroundColor: "#FFB74D", width: "400px"}}>로그인
                </button>
            </div>

            <div className={"mt-4 d-flex justify-content-center"}>
                <div className={"col d-flex justify-content-between fs-6"}
                     style={{maxWidth: "400px"}}>
                    <p>아직 아이디가 없으시다면 ? </p>
                    <p><FontAwesomeIcon icon={faArrowRight}/></p>
                    <Link to={"/signUp"} style={{color: "#FFB74D", textDecorationLine: 'none'}} >가입하기</Link>
                </div>
            </div>
        </form>
    );
}

export default Login