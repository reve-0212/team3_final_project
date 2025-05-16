import ReBanner from "./ReBanner.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import SeatManager from "./Seat/SeatManager.jsx";

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
        axios.get("http://localhost:8080/pre/owner/funcOpt",{
            headers:{
                Authorization: `Bearer ${storedToken}`,
            },
        })
            .then((res) => {
                console.log("funcOpt API 응답:", res.data);
                if (Array.isArray(res.data.data)) {
                    setFuncOpt(res.data.data);
                } else {
                    console.warn("funcOpt 응답이 배열이 아닙니다:", res.data);
                }
            })
            .catch((err) => {
                console.error("funcOpt API 에러:", err);
            });

    // 사용자가 저장한 편의시설 불러오기
    axios.get("http://localhost:8080/pre/owner/getFunc",{
        headers : {
            Authorization : `Bearer ${storedToken}`
        }
    })
        .then((res => {
            if (res.data && res.data.length > 0) {
                setSelectOpt(res.data);
                setIsSave(true)
            }
        }))
        .catch((err) => {
            console.log(err)
        })
},[storedToken]);


    // 편의시설 선택/해제
    const checkBox = (cvId) => {
        if (selectOpt.includes(cvId)) {
            setSelectOpt(selectOpt.filter(id => id !== cvId));
        } else {
            setSelectOpt([...selectOpt, cvId]);
        }
    };


    // 편의시설 저장하기
    const hSubmit = (e) => {
        e.preventDefault();

        if (isSave) {
            // 수정
            axios.put("http://localhost:8080/pre/owner/updateFunc",
                { function: selectOpt },
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
                .then(res => {
                    if (res.status === 200) alert("수정 되었습니다.");
                })
                .catch(err => {
                    console.error(err);
                    alert("수정 실패");
                });
        } else {
            // 저장
            axios.post("http://localhost:8080/pre/owner/saveFunc",
                { function: selectOpt },
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
                .then(res => {
                    if (res.status === 200) {
                        alert("저장 되었습니다.");
                        setIsSave(true);
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert("저장 실패");
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
                <div className="mb-4">
                    {Array.isArray(funcOpt) && funcOpt.map((facility) => (
                        <div key={facility.cvId} style={{ marginBottom: "8px" }}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectOpt.includes(facility.cvId)}
                                    onChange={() => checkBox(facility.cvId)}
                                />
                                {" "}{facility.cvName}
                            </label>
                        </div>
                    ))}
                </div>

                <button type="submit" className="btn btn-warning">
                    {isSave ? "수정하기" : "저장하기"}
                </button>
            </form>

            <hr/>
            <br/>

            <h4 className="text-start">
                <strong>좌석배치도</strong>
                <span style={{ color: "#FFD727", fontSize: "14px" }}> *필수</span>
            </h4>
            <SeatManager/>
        </div>
    );
}

export default PreFunction

