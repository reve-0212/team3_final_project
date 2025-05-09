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
        return elements.some(el => {
            const elSize = (el.type === "단체석" || el.type === "단체룸") ? 80 : 60;
            return (
                x < el.x + elSize &&
                x + width > el.x &&
                y < el.y + elSize &&
                y + height > el.y
            );
        });
    };

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

        const id = Date.now();
        elRef.current[id] = React.createRef();
        setElements(prev => [
            ...prev,
            {
                id,
                type,
                name: type === "좌석" ? "좌석" : type,
                x,
                y,
                shape: "circle",
                image: elementImages[type] || "",
                isReserved: false, // 추가!
            }
        ]);
    };

    const upEl = (id, newName) => {
        setElements(prev => prev.map(el => el.id === id ? { ...el, name: newName } : el));
    };

    const hDr = (id, e, data) => {
        const currentEl = elements.find(el => el.id === id);
        const size = (currentEl.type === "단체석" || currentEl.type === "단체룸") ? 80 : 60;

        const overlapping = elements.some(el => {
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

        setElements(prev => prev.map(el =>
            el.id === id
                ? { ...el, x: Math.min(Math.max(0, data.x), 553), y: Math.min(Math.max(0, data.y), 290) }
                : el
        ));
    };

    const chSp = (id) => {
        setElements(prev => prev.map(el =>
            el.id === id ? { ...el, shape: el.shape === "circle" ? "square" : "circle" } : el
        ));
    };



    const undo = () => {
        setElements(prev => prev.slice(0, -1));
    };

    const saveToServer = () => {
        axios.post("http://localhost:8080/seats/save", elements,{
        },{
            headers:{
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
                height: "600px",       // 높이 고정
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
                            key={el.id}
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
