// import "../simJiHyun/SjhCss.css"
import LoginSignText from "../../simJiHyun/LoginSignText.jsx";
import LoginText from "../../simJiHyun/login/LoginText.jsx";
import {useNavigate} from "react-router-dom";
import {OwnerLoginCheck} from "../Login/LgCheckService.jsx";


function AdminLogin() {
    const nv = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const OwnerId = formData.get('OwnerId')
        const OwnerPw = formData.get('OwnerPw')
        console.log(OwnerId)
        console.log(OwnerPw)

        OwnerLoginCheck(OwnerId, OwnerPw);
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}>

            <div
                style={{
                    display: "flex",
                    flexDirection: 'column',
                    gap: "1rem",
                    marginTop: "2rem",
                }}
            >

                <div className="fixed-top">
                    <nav className="navbar navbar-expand-lg navbar-dark"
                         style={{height: '10vh', backgroundColor: '#FFD700'}}>
                        <div className="container-fluid d-flex justify-content-between align-items-center">
                            <div style={{textAlign: 'center'}} className="text-white fs-1">Logo</div>
                        </div>
                    </nav>
                </div>

                <form className={"container"} onSubmit={handleSubmit}>
                    <div className={"row"} style={{paddingRight: '1rem'}}>
                        <LoginSignText text={"관리자 로그인"}/>
                    </div>

                    <LoginText holder={"관리자 아이디 입력"} name={'OwnerId'}/>
                    <LoginText holder={"관리자 비밀번호 입력"} name={'OwnerPw'} type={'password'}/>


                    <div className={"mt-4 d-flex justify-content-center"}>
                        <button
                            type={"submit"}
                            className={"py-3 fw-bold text-light fs-5 flex-fill rounded-3 border-0"}
                            style={{backgroundColor: "#FFB74D", maxWidth: "400px"}}
                        >
                            로그인
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
