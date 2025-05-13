// import "../simJiHyun/SjhCss.css"
import LoginSignText from "../../simJiHyun/LoginSignText.jsx";
import LoginText from "../../simJiHyun/login/LoginText.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";


function AdminLogin() {
    const nv = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const adminId = formData.get('adminId')
        const adminPw = formData.get('adminPw')

        axios.get(`http://localhost:8080/pre/admin/login`, {
            params: {
                adminId: adminId,
                adminPw: adminPw
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {;
                alert(` ${res.data.userNick} 님 환영합니다.`);
                localStorage.setItem("ACCESS_TOKEN", res.data.accessToken);
                sessionStorage.setItem("REFRESH_TOKEN", res.data.refreshToken);
                console.log(res.data);
                nv("/pre/reg");
            })
            .catch(err => {
                alert(`로그인 중 오류가 발생했습니다.\n 오류 내용 : ${err}`);
            })
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

                    <LoginText holder={"관리자 아이디 입력"} name={'adminId'}/>
                    <LoginText holder={"관리자 비밀번호 입력"} name={'adminPw'} type={'password'}/>


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
