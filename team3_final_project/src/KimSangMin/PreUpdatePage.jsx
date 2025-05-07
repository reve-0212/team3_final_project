import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PreInfoPage() {
    const nv = useNavigate();

    const [ownerData, setOwnerData] = useState({
        ownerId: "",
        ownerPass: "",
        ownerName: "",
        ownerNumber: "",
        bsName: "",
        bsNumber: ""
    });

    // 입력값을 처리하는 공통 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setOwnerData((prevData) => {
            console.log("Updating:", name, value); // 변경 전값 로그 확인
            return {
                ...prevData,
                [name]: value,
            };
        });
    };

    // 컴포넌트가 마운트 될 때 사장님 정보 가져오기
    useEffect(() => {
        axios.get('http://localhost:8080/owner/info', { withCredentials: true })
            .then(response => {
                console.log(response.data)
                const ownerData = response.data.data;
                setOwnerData({
                    ownerId: ownerData.ownerId,
                    ownerPass: ownerData.ownerPass,
                    ownerName: ownerData.ownerName,
                    ownerNumber: ownerData.ownerNumber,
                    bsName: ownerData.bsName,
                    bsNumber: ownerData.bsNumber,
                });
            })
            .catch(error => {
                console.error("정보 조회 오류:", error.response.data);
            });
    }, []);

    // 폼 제출 시 정보 수정 요청
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put('http://localhost:8080/owner/update', ownerData, { withCredentials: true })
            .then(response => {
                const { success, message, data } = response.data;  // 서버 응답에서 data 추가
                if (success) {
                    alert("정보 수정 성공: " + message);

                    // 수정된 데이터를 상태에 반영
                    setOwnerData({
                        ownerId: data.ownerId,
                        ownerPass: data.ownerPass,
                        ownerName: data.ownerName,
                        ownerNumber: data.ownerNumber,
                        bsName: data.bsName,
                        bsNumber: data.bsNumber
                    });
                    console.log("Updated owner data:", data);  // 수정된 데이터 확인

                    // 수정 후 페이지 이동
                    nv("/pre/PreMain");
                } else {
                    alert("정보 수정 실패: " + message);
                }
            })
            .catch(error => {
                alert("서버 오류가 발생했습니다: " + error);
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
                            <label htmlFor="ownerId" className="form-label">
                                아이디
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="ownerId"
                                name="ownerId"
                                placeholder="아이디를 입력해주세요"
                                value={ownerData.ownerId || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="ownerPass" className="form-label">
                                비밀번호
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="ownerPass"
                                name="ownerPass"
                                placeholder="비밀번호를 입력해주세요"
                                value={ownerData.ownerPass || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="ownerName" className="form-label">
                                대표자 명
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="ownerName"
                                name="ownerName"
                                placeholder="대표자명을 입력해주세요"
                                value={ownerData.ownerName || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="ownerNumber" className="form-label">
                                대표자 번호
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="ownerNumber"
                                name="ownerNumber"
                                placeholder="대표자 번호를 입력해주세요"
                                value={ownerData.ownerNumber || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="bsName" className="form-label">
                                사업장 이름
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="bsName"
                                name="bsName"
                                placeholder="사업장 이름을 입력해주세요"
                                value={ownerData.bsName || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="bsNumber" className="form-label">
                                사업자 번호
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="bsNumber"
                                name="bsNumber"
                                placeholder="사업자 번호를 입력해주세요"
                                value={ownerData.bsNumber || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mt-5 mb-5 d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn"
                            style={{ backgroundColor: "#FFD727", padding: "10px 20px" }}
                        >
                            수정하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PreInfoPage;
