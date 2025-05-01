import SignMini from "./SignMini.jsx";
import LoginSignText from "../LoginSignText.jsx";
import {useNavigate} from "react-router-dom";

function SignUp() {
    const Nv = useNavigate();

    const handleSignUp = (e) =>{
        e.preventDefault();
        Nv("/");
    }
    return (
        <form className={"container py-4"} onSubmit={handleSignUp}>
            <LoginSignText text={"회원가입"}/>

            <SignMini id={"userId"} label={"아이디"} holder={"아이디 입력"}/>
            <SignMini id={"userPass"} label={"비밀번호"} holder={"비밀번호 입력"}/>
            <SignMini id={"userName"} label={"이름"} holder={"이름 입력"}/>

            <div className={"d-flex justify-content-center"}>
                <div>
                    <label htmlFor={"userGender"} className={"form-label fs-3 mt-4"}>성별</label>
                    <div className={"d-flex gap-3 input-box"}>
                        <button type={"button"} className={"btn rounded-3 flex-fill py-3"}
                                style={{border: "1px solid #929292", backgroundColor: "white"}}>남
                        </button>
                        <button type={"button"} className={"btn rounded-3 flex-fill py-3"}
                                style={{border: "1px solid #929292", backgroundColor: "white"}}>여
                        </button>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center mt-4">
                <div>
                    <label htmlFor="userAge" className="form-label fs-3 text-start">나이대</label>
                    <select className="form-select py-3 input-box text-center" style={{maxWidth: "400px"}}>
                        <option value={10}>10대</option>
                        <option value={20}>20대</option>
                        <option value={30}>30대</option>
                        <option value={40}>40대</option>
                        <option value={50}>50대</option>
                        <option value={60}>60대 이상</option>
                    </select>
                </div>
            </div>


            <SignMini id={"userCall"} label={"연락처"} holder={"01012345678"}/>
            <SignMini id={"userEmail"} label={"이메일"} holder={"example@example.com"}/>

            <div className={"mt-4 mb-5 d-flex justify-content-center"}>
                <button type={"submit"}
                        className={"btn py-3 fw-bold text-light fs-4 input-box rounded-3"}
                        style={{backgroundColor: "#FFB74D"}}>회원 등록
                </button>
            </div>

        </form>
    );
}

export default SignUp