import ReBanner from "./ReBanner.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import SeatManager from "./Seat/SeatManager.jsx";
import Swal from "sweetalert2";

function PreFunction() {

    const [funcOpt, setFuncOpt] = useState([]);
    const [selectOpt, setSelectOpt] = useState([]);
    const [isSave, setIsSave] = useState(false);

    const storedToken = localStorage.getItem('ACCESS_TOKEN');
    useEffect(() => {
        console.log("📦 페이지 로드시 token:", storedToken);
    }, []);


    // 편의시설 목록 불러오기
    useEffect(() => {
        // 편의시설 목록 불러오기
        axios.get("http://localhost:8080/pre/owner/funcOpt", {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        })
            .then((res) => {
                console.log("funcOpt API 응답:", res.data);
                const data = res.data?.data || res.data;
                if (Array.isArray(data)) {
                    setFuncOpt(data);
                } else {
                    console.warn("funcOpt 응답이 배열이 아닙니다:", res.data);
                }
            })
            .catch((err) => {
                console.error("funcOpt API 에러:", err);
            });

        // 사용자가 저장한 편의시설 불러오기
        axios.get("http://localhost:8080/pre/owner/getFunc", {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        })
            .then((res) => {
                const data = res.data?.data || [];
                if (Array.isArray(data) && data.length > 0) {
                    const idArray = data.map(item => item.cvId);  // ✅ ID만 추출
                    setSelectOpt(idArray);
                    setIsSave(true);
                } else {
                    console.warn("getFunc 데이터가 배열이 아니거나 없음:", data);
                }
            })
            .catch((err) => {
                console.error("getFunc API 에러:", err);
            });
    }, [storedToken]);



    // 편의시설 선택/해제
    const checkBox = (cvId) => {
        if (selectOpt.includes(cvId)) {
            setSelectOpt(selectOpt.filter(id => id !== cvId));
        } else {
            setSelectOpt([...selectOpt, cvId]);
        }
    };


    // 편의시설 저장하기
    const hSubmit = async (e) => {
        e.preventDefault();

        const confirmResult = await Swal.fire({
            title: isSave ? "정말 수정하시겠습니까?" : "정말 저장하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "예",
            cancelButtonText: "아니요",
            confirmButtonColor: "#FFD727",
            cancelButtonColor: "#ccc"
        });

        if (!confirmResult.isConfirmed) return;

        const url = isSave
            ? "http://localhost:8080/pre/owner/updateFunc"
            : "http://localhost:8080/pre/owner/saveFunc";

        const method = isSave ? axios.put : axios.post;

        try {
            const res = await method(url, { function: selectOpt }, {
                headers: { Authorization: `Bearer ${storedToken}` }
            });

            if (res.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: isSave ? "수정 완료!" : "저장 완료!",
                    text: isSave ? "기능이 수정되었습니다." : "기능이 저장되었습니다.",
                    confirmButtonColor: "#FFD727"
                });
                if (!isSave) setIsSave(true);  // 저장 이후에는 수정모드로 전환
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "오류",
                text: isSave ? "수정 중 오류가 발생했습니다." : "저장 중 오류가 발생했습니다.",
                confirmButtonColor: "#FF3B30"
            });
        }
    };




    return (
        <div
            // style={{
            // marginLeft: "300px",
            // paddingTop: "8rem",
            // paddingLeft: "1rem",
            // width: "calc(100% - 200px)",
            // maxWidth: "1000px",
            // }}
        >
            <ReBanner/>
            <div>
            </div>
            <h4 className="text-start">
                <strong>편의시설</strong>
                <span style={{ color: "#FFD727", fontSize: "14px" }}> *필수</span>
            </h4>
            <form onSubmit={hSubmit}>
                <div className="mb-4" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {Array.isArray(funcOpt) &&
                        funcOpt.map((facility) => (
                            <label
                                key={facility.cvId}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "calc(20% - 10px)", // 5개씩 한 줄에 나오도록
                                    minWidth: "120px" // 너무 작아지지 않도록 최소 너비 설정
                                }}
                            >
                                <input
                                    type="checkbox"
                                    className="ChkBox"
                                    checked={selectOpt.includes(facility.cvId)}
                                    onChange={() => checkBox(facility.cvId)}
                                    style={{
                                        marginRight: "6px",
                                        width: "18px",
                                        height: "18px",
                                        verticalAlign: "middle" // 텍스트와 높이 맞추기
                                    }}
                                />
                                <span style={{ fontSize: "15px", verticalAlign: "middle" }}>{facility.cvName}</span>
                            </label>
                        ))}
                </div>


                <button type="submit" className="btn btn-warning">
                    {isSave ? "수정하기" : "저장하기"}
                </button>
            </form>

            <hr/>

            <h4 className="text-start">
                <strong>좌석배치도</strong>
                <span style={{ color: "#FFD727", fontSize: "14px" }}> *필수</span>
            </h4>
            <SeatManager/>
        </div>
    );
}

export default PreFunction

