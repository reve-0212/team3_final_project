import SignMini from "./SignMini.jsx";
import LoginSignText from "../LoginSignText.jsx";

function SignUp() {
    return (
        <form className={"container vh-100 pt-3"}>
            <LoginSignText text={"회원가입"}/>

            <SignMini id={"userId"} label={"아이디"} holder={"아이디 입력"}/>
            <SignMini id={"userPass"} label={"비밀번호"} holder={"비밀번호 입력"}/>
            <SignMini id={"userName"} label={"이름"} holder={"이름 입력"}/>

            <div className={"row mt-4 ms-3"}>
                <div className={"col"}>
                    <label htmlFor={"userName"} className={"form-label fs-3"}>성별</label>
                    <div className={"col d-flex flex-row justify-content-center gap-3 input-box"}>
                        <button type={"button"} className={"btn flex-fill py-3"}
                                style={{border: "1px solid #929292", backgroundColor: "white"}}>남
                        </button>
                        <button type={"button"} className={"btn flex-fill py-3"}
                                style={{border: "1px solid #929292", backgroundColor: "white"}}>여
                        </button>
                    </div>
                </div>
            </div>

            <div className={"row mt-4 ms-3"}>
                <div className={"col"}>
                    <label htmlFor={"userName"} className={"form-label fs-3"}>나이대</label>
                    <select className={"form-select py-3 input-box"} aria-label={"Default select example"}>
                        <option value={10} selected={"10대"}>10대</option>
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

            <div className={"row mt-4 ms-3"}>
                <div className={"col"}>
                    <button type={"submit"}
                            className={"btn shadow-sm py-3 my-5 fw-bold text-light fs-4 input-box"}
                            style={{backgroundColor: "#FFB74D"}}>회원 등록
                    </button>
                </div>
            </div>

        </form>
    );
}

export default SignUp