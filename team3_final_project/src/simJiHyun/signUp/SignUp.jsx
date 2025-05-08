import SignMini from "./SignMini.jsx";
import LoginSignText from "../LoginSignText.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import "../SjhCss.css"
import {apiSignup} from "../service/ApiService.js";

function SignUp() {
  const [gender, setGender] = useState("male")
  const [age, setAge] = useState(10)
  const [btnActive, setBtnActive] = useState("male");

  const Nv = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userId = formData.get("userId");
    const userPass = formData.get("userPass");
    const userNick = formData.get("userNick");
    const userGender = gender
    const userAge = age
    const userCall = formData.get("userCall");
    const userEmail = formData.get("userEmail");

    console.log(userId)
    console.log(userPass)
    console.log(userNick)
    console.log(userGender)
    console.log(userAge)
    console.log(userCall)
    console.log(userEmail)

    apiSignup({
      userId: userId, userPass: userPass, userNick: userNick, userGender: userGender,
      userAge: userAge, userCall: userCall, userEmail: userEmail
    });

  }


  const handleMale = () => {
    setGender("male")
    setBtnActive("male")
    console.log(gender)
  }

  const handleFemale = () => {
    setGender("female")
    setBtnActive("female")
    console.log(gender)
  }

  const handleChangeAge = (e) => {
    setAge(e.target.value)
    console.log(age)
  }

  return (
    <form className={"container py-2"} onSubmit={handleSubmit}>
      <LoginSignText text={"회원가입"}/>

      <div className={"mt-4 d-flex justify-content-center flex-column align-items-center"}>
        <div>
          <label htmlFor={"userId"} className={"form-label fs-4"}>아이디</label>
          <input type={"text"} className={"form-control py-3 input-box"}
                 id={"userId"} placeholder={"아이디를 입력해주세요"} name={"userId"}/>
        </div>

        <div className={"mt-4"}>
          <label htmlFor={"userPass"} className={"form-label fs-4"}>비밀번호</label>
          <input type={"text"} className={"form-control py-3 input-box"}
                 id={"userPass"} placeholder={"비밀번호를 입력해주세요"} name={"userPass"}/>
        </div>

        <div className={"mt-4"}>
          <label htmlFor={"userNick"} className={"form-label fs-4"}>이름</label>
          <input type={"text"} className={"form-control py-3 input-box"}
                 id={"userNick"} placeholder={"이름을 입력해주세요"} name={"userNick"}/>
        </div>

        <div className={"mt-4"}>
          <label htmlFor={"userGender"} className={"form-label fs-4"}>성별</label>
          <div className={"d-flex gap-3 input-box"}>
            <button type={"button"}
                    className={`btn rounded-3 flex-fill py-3 genderBtn 
                                ${btnActive === "male" ? "active" : ""}`}
                    onClick={handleMale}>남
            </button>
            <button type={"button"}
                    className={`btn rounded-3 flex-fill py-3 genderBtn
                                ${btnActive === "female" ? "active" : ""}`}
                    onClick={handleFemale}>여
            </button>
          </div>
        </div>

        <div className={"mt-4"}>
          <label htmlFor="userAge" className="form-label fs-4 text-start">나이대</label>
          <select value={age} className="form-select py-3 input-box text-center" style={{maxWidth: "400px"}}
                  onChange={handleChangeAge}>
            <option value={10}>10대</option>
            <option value={20}>20대</option>
            <option value={30}>30대</option>
            <option value={40}>40대</option>
            <option value={50}>50대</option>
            <option value={60}>60대 이상</option>
          </select>
        </div>

        <div className={"mt-4"}>
          <label htmlFor={"userCall"} className={"form-label fs-4"}>연락처</label>
          <input type={"text"} className={"form-control py-3 input-box"}
                 id={"userCall"} placeholder={"010-1234-5678"} name={"userCall"}/>
        </div>

        <div className={"mt-4"}>
          <label htmlFor={"userEmail"} className={"form-label fs-4"}>이메일</label>
          <input type={"text"} className={"form-control py-3 input-box"}
                 id={"userEmail"} placeholder={"이메일을 입력해주세요"} name={"userEmail"}/>
        </div>
      </div>

      <div className={"mt-5 mb-5 d-flex justify-content-center"}>
        <button type={"submit"}
                className={"btn py-3 fw-bold text-light fs-4 input-box rounded-3"}
                style={{backgroundColor: "#FFB74D"}}>회원 등록
        </button>
      </div>

    </form>
  );
}

export default SignUp