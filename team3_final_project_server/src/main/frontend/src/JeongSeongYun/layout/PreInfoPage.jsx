import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import api from "../../api/axios.js"
function PreInfoPage() {
    const nv = useNavigate();

    const [userId, setUserId] = useState("");
    const [userPass, setUserPass] = useState("");
    const [userNick, setUserNick] = useState("");
    const [userCall, setUserCall] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [bsName, setBsName] = useState("");
    const [bsNumber, setBsNumber] = useState("");

    const handleChangeOwnerId = (e) => setUserId(e.target.value);
    const handleChangeOwnerPass = (e) => setUserPass(e.target.value);
    const handleChangeOwnerName = (e) => setUserNick(e.target.value);
    const handleChangeOwnerNumber = (e) => setUserCall(e.target.value);
    const handleChangeEmail = (e) => setUserEmail(e.target.value);
    const handleChangeBsName = (e) => setBsName(e.target.value);
    const handleChangeBsNumber = (e) => setBsNumber(e.target.value);


    const handleSubmit = (e) => {
        e.preventDefault();

        const ownerData = {
            userId,userPass,userNick,userCall, userEmail,bsName,bsNumber
        }

        api.post('/pre/admin/SaveOwnerInfo',ownerData,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
            }
        })
            .then( (res) => {
                const message = res.data;  // 서버에서 보내준 메시지
                alert(`서버 응답: ${message}`);

                // 예시로 성공 여부 분기 처리
                if (message.includes("기입 실패")) {
                    alert("실패: " + message);
                } else {
                    alert("성공: " + message);
                    nv("/pre/reg");
                }
            })
            .catch( (err) => {
                alert(err);
            });
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    marginTop: "2rem",
                }}
            >
                <div className="fixed-top">
                    <nav
                        className="navbar navbar-expand-lg navbar-dark"
                        style={{height: "10vh", backgroundColor: "#FFD700"}}
                    >
                        <div className="container-fluid d-flex justify-content-between align-items-center">
                            <div style={{textAlign: "center"}} className="text-white fs-1">
                                Logo
                            </div>
                        </div>
                    </nav>
                </div>

                <form className="info-form" onSubmit={handleSubmit}>
                    <h3 style={{fontWeight: "bold"}} className="pt-5 text-center">
                        사장님 정보등록
                    </h3>
                    <div className="mt-4 d-flex justify-content-center flex-column align-items-center">
                        <div className="mt-4">
                            <label htmlFor="preId" className="form-label">
                                아이디
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="preId"
                                placeholder="아이디를 입력해주세요"
                                value={userId}
                                onChange={handleChangeOwnerId}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="prePw" className="form-label">
                                비밀번호
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="prePw"
                                placeholder="비밀번호를 입력해주세요"
                                value={userPass}
                                onChange={handleChangeOwnerPass}
                                required
                                style={{ width: '400px' }}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="preName" className="form-label">
                                대표자 명
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="preName"
                                placeholder="대표자명을 입력해주세요"
                                value={userNick}
                                onChange={handleChangeOwnerName}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="preCall" className="form-label">
                                대표자 전화번호
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="preCall"
                                placeholder="대표자 번호를 입력해주세요"
                                value={userCall}
                                onChange={handleChangeOwnerNumber}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="preEmail" className="form-label">
                                대표자 이메일
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="preEmail"
                                placeholder="이메일을 입력해주세요"
                                value={userEmail}
                                onChange={handleChangeEmail}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="preStore" className="form-label">
                                사업장 이름
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="preStore"
                                placeholder="사업장 이름을 입력해주세요"
                                value={bsName}
                                onChange={handleChangeBsName}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="businessNum" className="form-label">
                                사업자 번호
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="businessNum"
                                placeholder="사업자 번호를 입력해주세요"
                                value={bsNumber}
                                onChange={handleChangeBsNumber}
                            />
                        </div>
                    </div>

                    <div className="mt-5 mb-5 d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn"
                            style={{backgroundColor: "#FFD727", padding: "10px 20px"}}
                        >
                            등록 하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PreInfoPage;






