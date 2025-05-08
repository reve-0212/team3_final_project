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

    const [id, setId] = useState("");
    const [pass, setPass] = useState("");

    const handleChangeId = (event) => {
        setId(event.target.value)
    }

    const handleChangePass = (event) => {
        setPass(event.target.value)
    }


    return (
        <form className={"container pt-2"} onSubmit={(e) => isIdAvailable(id, pass, e)}>

            <LoginSignText text={"사장 로그인"}/>

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
                        style={{backgroundColor: "#FFB74D", width: "400px"}}
                        onClick={() => {
                        }}>로그인
                </button>
            </div>
        </form>
    );
}

export default Login