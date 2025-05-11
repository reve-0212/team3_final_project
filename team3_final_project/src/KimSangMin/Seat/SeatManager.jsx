import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import axios from "axios";

function SeatManager() {
    const [elements, setElements] = useState([]);
    const elRef = useRef({});

    const elementImages = {
        "좌석": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6X8ubnuKOvtvqi3ClzVwvALvlgjBXscS0hw&s",
        "창문": "https://cdn-icons-png.flaticon.com/512/4804/4804222.png",
        "카운터": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkPczwSVLDuIu9lVpPz5Bv5ahSnd94jf66BG3b5V2BFiRkWjbrXg",
        "입구": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTESmRSGmfn9fst6CzAeCwniu3Wm4qVKZPlxw&s",
        "단체석": "https://cdn-icons-png.freepik.com/256/15870/15870815.png",
        "단체룸": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwctaA_6kiCwRyfh9BS5lUl5zZ2pnfYpCUeQ&s",
        "예약석": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVUM9NfQ38MInZ9tcnRFlYmrnGnBw5K17ihg6dzRbKfmnzypl8A",
    };

    // 각 아이콘마다 사이즈 / 그리고 덮어씌우기 금지
    const isOverlapping = (x, y, width, height) => {
        // 요소중 단체석, 단체룸이 있으면 좌석 크기 80, 60 으로 지정
        return elements.some(el => {
            const elSize = (el.type === "단체석" || el.type === "단체룸") ? 80 : 60;
            return (
                // 좌석충돌 방지
                x < el.x + elSize &&
                x + width > el.x &&
                y < el.y + elSize &&
                y + height > el.y
            );
        });
    };

    // 좌석추가 기능. 시작 x,y 좌표지정
    const addEl = (type) => {
        const size = (type === "단체석" || type === "단체룸") ? 100 : 60;
        let x = 100;
        let y = 100;
        const maxTry = 100;
        let tryCount = 0;

        while (isOverlapping(x, y, size, size) && tryCount < maxTry) {
            x += 20;
            y += 20;
            tryCount++;
        }

        if (tryCount === maxTry) {
            alert("빈 공간이 없습니다. 좌석을 추가할 수 없습니다.");
            return;
        }

        // 새 좌표 추가하기 (겹치지 않은 id 생성)
        const id = Date.now();
        elRef.current[id] = React.createRef();
        // elements에 좌석 정보를 담는 객체

        // 기존의 elements 상태를 유지하면서, 그 뒤에 새로운 좌석을 추가.
        setElements(prev => [
            ...prev,
            {
                id, // 고유 식별자
                type, // 좌석 종류
                name: type === "좌석" ? "좌석" : type, // 좌석이름
                x, // 경도
                y, // 위도
                shape: "circle", // 좌석의 모양
                image: elementImages[type] || "", // 좌석의 이미지
                isReserved: false, // 예약되어있는지
            }
        ]);
    };

    const upEl = (id, newName) => {
        setElements(prev => prev.map(el => el.id === id ? { ...el, name: newName } : el));
    };

    // 드래그로 위치 이동
    // data 는 드래그블에서 자동으로 전달되는 매개변수
    // data : 드래그 후 새 위치 정보를 담고 있는 객체
    const hDr = (id, e, data) => {
        // elements 배열에서 id가 일치하는 요소 찾기.
        const currentEl = elements.find(el => el.id === id);
        const size = (currentEl.type === "단체석" || currentEl.type === "단체룸") ? 80 : 60;

        // .some() : 하나라도 조건을 만족하면 true 반환
        const overlapping = elements.some(el => {
            // 자기 자신과 겹쳐지는것은 무시.
            if (el.id === id) return false;
            const elSize = (el.type === "단체석" || el.type === "단체룸") ? 80 : 60;
            return (
                data.x < el.x + elSize &&
                data.x + size > el.x &&
                data.y < el.y + elSize &&
                data.y + size > el.y
            );
        });

        if (overlapping) return;

        // 현재 드래그중인 좌석만을 업데이트하고, 나머지 좌석은 그대로 유지
        setElements(prev => prev.map(el =>
            el.id === id
                // 각 좌석의 최대 x,y 위치 설정
                ? { ...el, x: Math.min(Math.max(0, data.x), 553), y: Math.min(Math.max(0, data.y), 290) }
                : el
        ));
    };


    const chSp = (id) => {
        setElements(prev => prev.map(el =>
            el.id === id ? { ...el, shape: el.shape === "circle" ? "square" : "circle" } : el
        ));
    };

    // 직전 좌석 제거
    const undo = () => {
        setElements(prev => prev.slice(0, -1));
    };

    const saveToServer = () => {
        // elements : 배열에 담긴 데이터 객체
        axios.post("http://localhost:8080/seats/save", elements,{
        },{
            headers:{
                // 요청 본문 JSON형식으로 받도록
                'Content-Type':'application/json'
            }
        })
            .then(response => {
                console.log('서버 응답:', response);
                console.log(elements);
                alert("저장에 성공하였습니다.");
            })
            .catch(error => {
                alert("저장에 실패하였습니다.");
                console.error('에러 발생:', error.response ? error.response.data : error.message);
            });
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "600px",
                padding: "2rem",
            }}
        >
            <div style={{ maxWidth: "900px", width: "100%" }}>
                <div style={{ marginBottom: "10px", textAlign: "center" }}>
                    <button onClick={() => addEl("좌석")}>+ 좌석 추가</button>
                    <button onClick={() => addEl("창문")}>+ 창가 추가</button>
                    <button onClick={() => addEl("카운터")}>+ 카운터 추가</button>
                    <button onClick={() => addEl("입구")}>+ 입구 추가</button>
                    <button onClick={() => addEl("단체석")}>+ 단체석 추가</button>
                    <button onClick={() => addEl("단체룸")}>+ 단체룸 추가</button>
                    <button onClick={undo} disabled={elements.length === 0}>⎌ 직전 추가 삭제</button>
                    <button onClick={saveToServer}>💾 저장</button>
                </div>

                <div
                    style={{
                        width: "70%",
                        height: "350px", // 줄인 작업 영역
                        border: "1px solid #ccc",
                        position: "relative",
                        margin: "0 auto",
                    }}
                >
                    {elements.map(el => (
                        <Draggable
                            /* elements id 값으로 key 설정 */
                            key={el.id}
                            /* db에 들어갈 위치값 */
                            position={{ x: el.x, y: el.y }}
                            onDrag={(e, data) => hDr(el.id, e, data)}
                            nodeRef={elRef.current[el.id]}
                        >
                            <div
                                ref={elRef.current[el.id]}
                                onDoubleClick={() => {
                                    if (el.type === "좌석") {
                                        const newName = prompt("좌석 이름을 입력하세요", el.name);
                                        if (newName) upEl(el.id, newName);
                                    }
                                }}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    if (el.type === "좌석") chSp(el.id);
                                }}
                                style={{
                                    width: el.type === "단체석" || el.type === "단체룸" ? 100 : 60,
                                    height: el.type === "단체석" || el.type === "단체룸" ? 100 : 60,
                                    borderRadius: el.shape === "square" ? "50%" : "0%",
                                    backgroundImage: `url(${el.image})`,
                                    backgroundSize: "cover",
                                    color: "white",
                                    cursor: "pointer",
                                    position: "absolute",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    fontSize: "12px",
                                    userSelect: "none",
                                }}
                            >
                                {el.name}
                            </div>
                        </Draggable>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default SeatManager;
