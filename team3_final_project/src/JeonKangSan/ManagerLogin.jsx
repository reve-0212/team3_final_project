import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginSignText from "../simJiHyun/LoginSignText.jsx";
import LoginText from "../simJiHyun/login/LoginText.jsx";
import SjhNav from "../simJiHyun/nav/SjhNav.jsx";
import "../simJiHyun/SjhCss.css"

function ManagerLogin() {
  return (
      <form className={"container"}>
        <div className={"row"} style={{ paddingRight: '1rem' }}>
          <LoginSignText text={"사장님 로그인"} />
        </div>

        <LoginText holder={"사장님 아이디 입력"} />
        <LoginText holder={"사장님 비밀번호 입력"} />

        <div className={"mt-4 d-flex ms-4 me-4"}>
          <button
              type={"submit"}
              className={"btn py-3 fw-bold text-light fs-5 flex-fill"}
              style={{ backgroundColor: "#FFB74D" }}
          >
            로그인
          </button>
        </div>

        <div className={"mt-4 ms-4 me-4"}>
          <div className={"col d-flex flex-row justify-content-between fs-6"}>
            <p>아직 아이디가 없으시다면 ? </p>
            <p><FontAwesomeIcon icon={faArrowRight} /></p>
            <a href="/signUp" style={{ color: "#FFB74D", textDecorationLine: 'none' }}> 가입하기</a>
          </div>
        </div>
      </form>
  );
}

export default ManagerLogin;
