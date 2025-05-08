import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function PreInfoPage() {
    const nv = useNavigate();

    const [ownerId, setOwnerId] = useState("");
    const [ownerPass, setOwnerPass] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [ownerNumber, setOwnerNumber] = useState("");
    const [bsName, setBsName] = useState("");
    const [bsNumber, setBsNumber] = useState("");

    const handleChangeOwnerId = (e) => setOwnerId(e.target.value);
    const handleChangeOwnerPass = (e) => setOwnerPass(e.target.value);
    const handleChangeOwnerName = (e) => setOwnerName(e.target.value);
    const handleChangeOwnerNumber = (e) => setOwnerNumber(e.target.value);
    const handleChangeBsName = (e) => setBsName(e.target.value);
    const handleChangeBsNumber = (e) => setBsNumber(e.target.value);


    const handleSubmit = (e) => {
        e.preventDefault();

        const ownerData = {
            ownerId,ownerPass,ownerName,ownerNumber,bsName,bsNumber
        }

        axios.post('http://localhost:8080/admin/owner',ownerData)
            .then( (response) => {
                const { success, message } = response.data

                if (success){
                    alert("가입 성공" + message)
                    nv("/pre/reg");
                }
                else{
                    alert("가입 실패" + message)
                }
            })
            .catch( (error) => {
                alert("서버 오류가 발생했습니다." + error)
            });
        // 서버 전송 또는 유효성 검사
        console.log(ownerData);
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
                                value={ownerId}
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
                                value={ownerPass}
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
                                value={ownerName}
                                onChange={handleChangeOwnerName}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="preCall" className="form-label">
                                대표자 번호
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="preCall"
                                placeholder="대표자 번호를 입력해주세요"
                                value={ownerNumber}
                                onChange={handleChangeOwnerNumber}
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






