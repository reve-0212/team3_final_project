import ReBanner from "./ReBanner.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import SeatManager from "./Seat/SeatManager.jsx";

function PreFunction() {

    const [input, setInput] = useState([""]);


    const storedToken = localStorage.getItem('ACCESS_TOKEN');
    useEffect(() => {
        console.log("📦 페이지 로드시 token:", storedToken);
    }, []);



    const chInput = (e, index) => {
        const updatedInput = [...input];
        updatedInput[index] = e.target.value;
        setInput(updatedInput);
    };

    // input 추가 삭제 기능
    const addInput = () => setInput([...input, ""]);
    const removeInput = () => setInput(input.slice(0, -1));


    const hSubmit = (e) => {
        e.preventDefault()

        const Func = input.filter((val) => val.trim() !== "");

        axios.post("http://localhost:8080/", {function: Func,})
            .then((response) => {
                if (response.status === 200) {
                    alert("편의시설이 저장되었습니다.")
                } else {
                    alert("편의시설 저장에 실패하였습니다.")
                }
            })
            .catch((error) => {
                console.log("에러 메세지" + error)
                alert("오류가 발생했습니다.")
       });
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
                {/* 나머지 코드 */}
            </div>
            <h4 className="text-start">
                <strong>편의시설</strong>
                <span style={{ color: "#FFD727", fontSize: "14px" }}> *필수</span>
            </h4>
            <form onSubmit={hSubmit}>
            <div className="mb-4">
                {input.map((val, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                        <input
                            type="text"
                            value={val}
                            onChange={(e) => chInput(e, index)}
                            className="form-control"
                            style={{ width: "300px", height: "50px" }}
                        />
                        {index === input.length - 1 && (
                            <div style={{ marginLeft: "10px" }}>
                                <button className="btn btn-sm" onClick={addInput} style={{ marginRight: "5px", border: "1px solid #FFD727" }}>
                                    추가
                                </button>
                                <button className="btn btn-sm" style={{ border: "1px solid #FFD727" }}
                                        onClick={removeInput}
                                        disabled={input.length === 1}>
                                    삭제
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
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

