import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoginSignText from "../LoginSignText.jsx";
import "../SjhCss.css"
import useUserStore from "../../stores/useUserStore.jsx";
import {Link, useNavigate} from "react-router-dom";
import api from "../../api/axios.js"


function Login() {
  const setUser = useUserStore((state) => state.setUser);

  const Nv = useNavigate();

  // 로그인용
  const apiLogin = async (userId, userPass) => {
    return api.get(`/api/auth/login`, {
      params: {
        userId: userId,
        userPass: userPass
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        localStorage.setItem("ACCESS_TOKEN", res.data.accessToken);
        sessionStorage.setItem("REFRESH_TOKEN", res.data.refreshToken);
        return res.data
      })
      .catch(err => {
        alert(`로그인 중 오류가 발생했습니다.\n${err}`);
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userId = formData.get('userId')
    const userPass = formData.get('userPass')

    try {
      const userData = await apiLogin(userId, userPass);
      if (userData) {
        setUser(userData)
        alert("로그인 성공!")
        Nv("/")
      } else {
        alert("아이디 혹은 비밀번호가 틀렸습니다")
      }
    } catch (err) {
      alert(`로그인 실패 : ${err}`)
    }
  }

  return (
    <form className={"container pt-2"} onSubmit={handleSubmit}>

      <LoginSignText text={"로그인"}/>

      <div className={"mt-4 d-flex justify-content-center"}>
        <div className={"d-flex flex-column gap-4"}>
          <input type={"text"}
                 className={"form-control py-3"}
                 style={{width: '25rem'}}
                 id={"user-id"}
                 name={"userId"}
                 placeholder={"아이디 입력"}/>
          <input type={"text"}
                 className={"form-control py-3"}
                 style={{width: '25rem'}}
                 id={"user-pass"}
                 name={"userPass"}
                 placeholder={"비밀번호 입력"}/>
        </div>
      </div>

      <div className={"mt-4 d-flex justify-content-center"}>
        <button type={"submit"}
                className={"btn py-3 fw-bold text-light fs-5 rounded-3"}
                style={{backgroundColor: "#FFD727", width: "400px"}}>로그인
        </button>
      </div>

      <div className={"mt-4 d-flex justify-content-center"}>
        <div className={"col d-flex justify-content-between fs-6"}
             style={{maxWidth: "400px"}}>
          <p>아직 아이디가 없으시다면 ? </p>
          <p><FontAwesomeIcon icon={faArrowRight}/></p>
          <Link to={"/user/signUp"} style={{color: "#FFD727", textDecorationLine: 'none'}}>가입하기</Link>
        </div>
      </div>
    </form>
  );
}

export default Login