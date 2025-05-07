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

    const isIdAvailable = (userId, userPass, event) => {
        event.preventDefault();

        axios.post("http://localhost:8080/login", null, {
            params: {userId: userId, userPass: userPass}
        }).then((res) => {
            console.log(res.data)
            // id 와 pass 가 맞는지 count 해서 그 반환값을 가져온다
            // 반환값이 0 이면 없다는 뜻이므로 아래 알림을 출력한다
            if (res.data === 0) {
                alert("아이디 혹은 비밀번호가 틀렸습니다.")
            } else {
                // 만일 둘 다 있다면 유저 데이터를 가져온다
                axios.post("http://localhost:8080/getUserData", null,
                    {params: {userId: userId, userPass: userPass}})
                    .then((res) => {
                        const userData = {
                            id: res.data.userId,
                            pass: res.data.userPass,
                            name: res.data.userName,
                            gender: res.data.userGender,
                            age: res.data.userAge,
                            call: res.data.userCall,
                            email: res.data.userEmail,
                            level: res.data.userLevel
                        }
                        // 가져온 userData 를 useUserStore 에 저장한다
                        setUser(userData)
                        alert("로그인에 성공했습니다!")
                    }).catch((err) => {
                    console.log(err)
                })
                Nv("/")
            }
        }).catch((err) => {
                console.log(err)
            }
        )
    }

    // onSubmit={handleSubmit}
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
                            Nv("/pre/PreWait")
                        }}>로그인
                </button>
            </div>
        </form>
    );
}

export default Login