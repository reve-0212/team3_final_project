import React, { useState, useRef } from "react";
import Draggable from "react-draggable";

function SeatManager() {
    //  각 아이콘 요소들
    const [elements, setElements] = useState([]);
    const elRef = useRef({});

    // 좌석배치도 저장하기
    const saTable = () => {
        localStorage.setItem("seat", JSON.stringify(elements));
        alert("저장에 성공하였습니다..")
    };

    const reTable = () => {
        const save = localStorage.getItem("seat");
        if(save) {
            setElements(JSON.parse(save));
            alert("불러오기에 성공하였습니다.")
        }
        else{
            alert("저장된 테이블이 없습니다.")
        }
    }

    const elementImages = {
        "좌석": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6X8ubnuKOvtvqi3ClzVwvALvlgjBXscS0hw&s",  // 좌석 이미지
        "창문": "https://cdn-icons-png.flaticon.com/512/4804/4804222.png",  // 창문 이미지
        "카운터": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkPczwSVLDuIu9lVpPz5Bv5ahSnd94jf66BG3b5V2BFiRkWjbrXg",  // 카운터 이미지
        "입구": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTESmRSGmfn9fst6CzAeCwniu3Wm4qVKZPlxw&s",  // 입구 이미지
        "단체석": "https://cdn-icons-png.freepik.com/256/15870/15870815.png?ga=GA1.1.873948857.1745376488&semt=ais_hybrid",  // 단체석 이미지
        "단체룸": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwctaA_6kiCwRyfh9BS5lUl5zZ2pnfYpCUeQ&s",  // 단체룸 이미지
        "예약석": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVUM9NfQ38MInZ9tcnRFlYmrnGnBw5K17ihg6dzRbKfmnzypl8A",  // 예약석 이미지
    };

    // 아이콘 생성 시 초기 x,y 좌표 위치
    const addEl = (type) => {
        const id = Date.now();
        elRef.current[id] = React.createRef();
        setElements([...elements, {
            id,
            type,
            name: type === "좌석" ? "좌석" : type,
            x: 100,
            y: 100,
            shape: "circle",
            image: elementImages[type] || "", // 각 타입별 이미지 URL 할당
        }]);
    };

    // 직전 삭제
    const undo = () => {
        if (elements.length > 0) {
            setElements(elements.slice(0, elements.length - 1));
        }
    };

    // 카테고리 이름 수정함수
    const upEl = (id, newName) => {
        setElements(elements.map(el => el.id === id ? { ...el, name: newName } : el));
    };

    // 아이콘 드래그 좌표 업데이트(0,0 부터 시작, x,y는 한정 범위안에서만 가능
    const hDr = (id, e, data) => {
        setElements(elements.map(el =>
            el.id === id
                ? {
                    ...el,
                    x: Math.min(Math.max(0, data.x), 870),
                    y: Math.min(Math.max(0, data.y), 537)
                }
                : el
        ));
    };


    // 좌석 모양 변경
    const chSp = (id) => {
        setElements(elements.map(el =>
            el.id === id
                ? { ...el, shape: el.shape === "circle" ? "square" : "circle" }
                : el
        ));
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div>
                {/* 버튼 요소 추가하기 */}
                <div style={{ marginBottom: "10px" }}>
                    <button onClick={() => addEl("좌석")}>+ 좌석 추가</button>
                    <button onClick={() => addEl("창문")}>+ 창가 추가</button>
                    <button onClick={() => addEl("카운터")}>+ 카운터 추가</button>
                    <button onClick={() => addEl("입구")}>+ 입구 추가</button>
                    <button onClick={() => addEl("단체석")}>+ 단체석 추가</button>
                    <button onClick={() => addEl("단체룸")}>+ 단체룸 추가</button>
                    <button onClick={undo} disabled={elements.length === 0}>⎌ 직전 추가 삭제</button>
                    <button onClick={saTable}>저장 </button>
                    <button onClick={reTable}>불러오기 </button>
                </div>

                <div style={{ width: "100%", height: "600px", border: "1px solid #ccc", position: "relative" }}>
                    {elements.map((el) => (
                        // 요소들을 드래그하여 위치를 변경할 수 있도록 하는 Draggable
                        <Draggable
                            key={el.id}
                            position={{ x: el.x, y: el.y }}
                            onDrag={(e, data) => hDr(el.id, e, data)}
                            nodeRef={elRef.current[el.id]}
                        >
                            <div
                                ref={elRef.current[el.id]}
                                /* 아이콘 더블 클릭 시 아이콘 이름 변경가능 */
                                onDoubleClick={() => {
                                    if (el.type === "좌석") {
                                        const newName = prompt("좌석 이름을 입력하세요", el.name);
                                        if (newName) upEl(el.id, newName);
                                    }
                                }}

                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    if (el.type === "좌석") {
                                        chSp(el.id);
                                    }
                                }}

                                /* 좌석 타입,색, 스타일 지정 */
                                style={{
                                    //  단체석과 단체룸만 조금 더 크게 지정, 나머지 가로,세로 60 고정
                                    width: el.type === "단체석" || el.type === "단체룸" ? 100 : 60, 
                                    height: el.type === "단체석" || el.type === "단체룸" ? 100 : 60, 
                                    borderRadius: el.shape === "square" ? "50%" : "0%",
                                    backgroundColor: el.type === "좌석" ? "#4CAF50" :
                                        el.type === "창문" ? "#2196F3" :
                                            el.type === "카운터" ? "#FF9800" :
                                                el.type === "입구" ? "#FFC107" :
                                                    el.type === "단체석" ? "#8BC34A" :
                                                        el.type === "단체룸" ? "#9E9E9E" :
                                                            el.type === "예약석" ? "#FF5722" : "#9E9E9E",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    cursor: el.type === "좌석" || el.type === "단체석" || el.type === "단체룸" || el.type === "예약석" ? "pointer" : "default",
                                    position: "absolute",
                                    fontSize: "12px",
                                    textAlign: "center",
                                    userSelect: "none",
                                    backgroundImage: `url(${el.image})`, // 이미지 적용
                                    backgroundSize: "cover", // 이미지 크기 조정
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
