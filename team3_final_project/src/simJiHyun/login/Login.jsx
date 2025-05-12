import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoginSignText from "../LoginSignText.jsx";
import "../SjhCss.css"
import useUserStore from "../../stores/useUserStore.jsx";
import {Link, useNavigate} from "react-router-dom";
import {apiLogin} from "../service/ApiService.js"
import useRestaurantStore from "../../stores/useRestaurantStore.jsx";

function Login() {
  const setUser = useUserStore((state) => state.setUser);
  const setResIdx = useRestaurantStore((state) => state.setRestaurantIdx)

  const Nv = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userId = formData.get('userId')
    const userPass = formData.get('userPass')

    setResIdx("asdf")
    try {
      const userData = await apiLogin(userId, userPass);
      setUser(userData)
      alert("로그인 완료!")
      Nv("/")
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
                style={{backgroundColor: "#FFB74D", width: "400px"}}>로그인
        </button>
      </div>

      <div className={"mt-4 d-flex justify-content-center"}>
        <div className={"col d-flex justify-content-between fs-6"}
             style={{maxWidth: "400px"}}>
          <p>아직 아이디가 없으시다면 ? </p>
          <p><FontAwesomeIcon icon={faArrowRight}/></p>
          <Link to={"/user/signUp"} style={{color: "#FFB74D", textDecorationLine: 'none'}}>가입하기</Link>
        </div>
      </div>
    </form>
  );
}

export default Login