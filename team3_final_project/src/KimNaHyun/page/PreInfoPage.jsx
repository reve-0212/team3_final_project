import React, { useState } from "react";

function PreInfoPage() {
    const [id, setId] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");
    const [call, setCall] = useState("");
    const [storeName, setStoreName] = useState("");
    const [busNum, setBusNum] = useState("");

    const handleChangeId = (e) => setId(e.target.value);
    const handleChangePass = (e) => setPass(e.target.value);
    const handleChangeName = (e) => setName(e.target.value);
    const handleChangeCall = (e) => setCall(e.target.value);
    const handleChangeStoreName = (e) => setStoreName(e.target.value);
    const handleChangeBusNum = (e) => setBusNum(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        // 서버 전송 또는 유효성 검사
        console.log({ id, pass, name, call, storeName, busNum });
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
                        style={{ height: "10vh", backgroundColor: "#FFD700" }}
                    >
                        <div className="container-fluid d-flex justify-content-between align-items-center">
                            <div style={{ textAlign: "center" }} className="text-white fs-1">
                                Logo
                            </div>
                        </div>
                    </nav>
                </div>

                <form className="info-form" onSubmit={handleSubmit}>
                    <h3 style={{ fontWeight: "bold" }} className="pt-5 text-center">
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
                                value={id}
                                onChange={handleChangeId}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="prePw" className="form-label">
                                비밀번호
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="prePw"
                                placeholder="비밀번호를 입력해주세요"
                                value={pass}
                                onChange={handleChangePass}
                                required
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
                                value={name}
                                onChange={handleChangeName}
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
                                value={call}
                                onChange={handleChangeCall}
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
                                value={storeName}
                                onChange={handleChangeStoreName}
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
                                value={busNum}
                                onChange={handleChangeBusNum}
                            />
                        </div>
                    </div>

                    <div className="mt-5 mb-5 d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn"
                            style={{ backgroundColor: "#FFD727", padding: "10px 20px" }}
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






