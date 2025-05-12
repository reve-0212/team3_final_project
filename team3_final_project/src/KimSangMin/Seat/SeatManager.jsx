import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import axios from "axios";

function SeatManager() {
    const [elements, setElements] = useState([]);
    const elRef = useRef({});

    const elementImages = {
        "입구": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTESmRSGmfn9fst6CzAeCwniu3Wm4qVKZPlxw&s",
        "창문": "https://cdn-icons-png.flaticon.com/512/4804/4804222.png",
        "2인석": "https://cdn-icons-png.flaticon.com/512/1237/1237747.png",
        "4인석": "https://media.istockphoto.com/id/1471858377/ko/%EB%B2%A1%ED%84%B0/%EB%9D%BC%EC%9A%B4%EB%93%9C-%ED%85%8C%EC%9D%B4%EB%B8%94-%EC%9D%98%EC%9E%90-%ED%83%91-%EB%B7%B0-%EB%9D%BC%EC%9D%B8-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg?s=1024x1024&w=is&k=20&c=ncIcFXEpXDUVIyGRgOgvciwUoW5WAJvhJUHvVXFV-ew=",
        "6인석": "https://www.shutterstock.com/image-vector/round-table-conference-icon-flat-600w-1663348972.jpg",
    };

    const getSize = (type) => {
        switch (type) {
            case "6인석":
                return 100;
            case "4인석":
                return 80;
            case "2인석":
                return 60;
            case "창문":
            case "입구":
                return 70;
            default:
                return 60;
        }
    };


    const isOverlapping = (x, y, width, height) => {
        return elements.some(el => {
            const elSize = getSize(el.type);
            return (
                x < el.x + elSize &&
                x + width > el.x &&
                y < el.y + elSize &&
                y + height > el.y
            );
        });
    };

    const addEl = (type) => {
        const size = getSize(type);
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
            alert("빈 공간이 없습니다. 요소를 추가할 수 없습니다.");
            return;
        }

        const id = Date.now();
        elRef.current[id] = React.createRef();

        setElements(prev => [
            ...prev,
            {
                id,
                type,
                name: type,
                x,
                y,
                shape: "square",
                image: elementImages[type] || "",
                isReserved: false,
            }
        ]);
    };

    const upEl = (id, newName) => {
        setElements(prev => prev.map(el => el.id === id ? { ...el, name: newName } : el));
    };

    const hDr = (id, e, data) => {
        const currentEl = elements.find(el => el.id === id);
        const size = getSize(currentEl.type);

        const overlapping = elements.some(el => {
            if (el.id === id) return false;
            const elSize = getSize(el.type);
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
            el.id === id ? { ...el, shape: el.shape === "square" ? "circle" : "square" } : el
        ));
    };

    const undo = () => {
        setElements(prev => prev.slice(0, -1));
    };

    const saveToServer = () => {
        axios.post("http://localhost:8080/pre/seats/save", elements, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log("저장 성공",response)
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
                    <button onClick={() => addEl("입구")}>+ 입구 추가</button>
                    <button onClick={() => addEl("창문")}>+ 창문 추가</button>
                    <button onClick={() => addEl("2인석")}>+ 2인석 추가</button>
                    <button onClick={() => addEl("4인석")}>+ 4인석 추가</button>
                    <button onClick={() => addEl("6인석")}>+ 6인석 추가</button>
                    <button onClick={undo} disabled={elements.length === 0}>⎌ 직전 추가 삭제</button>
                    <button onClick={saveToServer}>💾 저장</button>
                </div>

                <div
                    style={{
                        width: "70%",
                        height: "350px",
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
                                    const newName = prompt("이름을 입력하세요", el.name);
                                    if (newName) upEl(el.id, newName);
                                }}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    chSp(el.id);
                                }}
                                style={{
                                    width: getSize(el.type),
                                    height: getSize(el.type),
                                    borderRadius: el.shape === "circle" ? "50%" : "0%",
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
