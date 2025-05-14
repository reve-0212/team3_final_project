import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import axios from "axios";

function SeatManager() {
    const [elements, setElements] = useState([]);
    const [isModified, setIsModified] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null); // 수정할 좌석을 선택하기 위한 상태 추가

    const elementImages = {
        "입구": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTESmRSGmfn9fst6CzAeCwniu3Wm4qVKZPlxw&s",
        "창문": "https://cdn-icons-png.flaticon.com/512/4804/4804222.png",
        "2인석": "https://cdn-icons-png.flaticon.com/512/1237/1237747.png",
        "4인석": "https://media.istockphoto.com/id/1471858377/ko/%EB%B2%A1%ED%84%B0/%EB%9D%BC%EC%9A%B4%EB%93%9C-%ED%85%8C%EC%9D%B4%EB%B8%94-%EC%9D%98%EC%9E%90-%ED%83%91-%EB%B7%B0-%EB%9D%BC%EC%9D%B8-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg?s=1024x1024&w=is&k=20&c=ncIcFXEpXDUVIyGRgOgvciwUoW5WAJvhJUHvVXFV-ew=",
        "6인석": "https://www.shutterstock.com/image-vector/round-table-conference-icon-flat-600w-1663348972.jpg",
    };

    const getSize = (type) => {
        switch (type) {
            case "6인석": return 100;
            case "4인석": return 80;
            case "2인석": return 60;
            case "창문":
            case "입구": return 70;
            default: return 60;
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

    const updateSeat = (id, x, y) => {
        if (!id) return;
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        const updatedSeat = elements.find(el => el.id === id);
        if (!updatedSeat) return;

        const cleanSeat = {
            seatId: updatedSeat.id,
            x: x,
            y: y
        };

        axios.put("http://localhost:8080/pre/owner/seats/update", [cleanSeat], {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            console.log("좌석 위치 업데이트 완료");
        }).catch(error => {
            console.error("좌석 위치 업데이트 실패:", error.response ? error.response.data : error.message);
        });
    };

    const hDr = (id, e, data) => {
        const currentEl = elements.find(el => el.id === id);
        if (!currentEl) return;

        const size = getSize(currentEl.type);
        const newX = Math.min(Math.max(0, data.x), 830);
        const newY = Math.min(Math.max(0, data.y), 290);

        const overlapping = isOverlapping(newX, newY, size, size);
        if (overlapping) return;

        setElements(prev => prev.map(el =>
            el.id === id ? { ...el, x: newX, y: newY } : el
        ));
        updateSeat(id, newX, newY);
        setIsModified(true);
    };

    const deleteEl = () => {
        if (elements.length === 0) return;
        const lastSeat = elements[elements.length - 1];

        const token = localStorage.getItem('jwtToken');
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        const updatedElements = elements.filter(el => el.id !== lastSeat.id);
        setElements(updatedElements);
        setIsModified(true);

        if (lastSeat.id) {
            axios.delete(`http://localhost:8080/pre/owner/seats/delete/${lastSeat.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(() => {
                console.log("좌석 삭제 완료");
            }).catch(error => {
                console.error("좌석 삭제 실패:", error.response ? error.response.data : error.message);
            });
        }
    };

    const saveToServer = () => {
        if (isSaving) return;
        setIsSaving(true);

        const token = localStorage.getItem('jwtToken');
        if (!token) {
            alert("로그인이 필요합니다.");
            setIsSaving(false);
            return;
        }

        axios.post("http://localhost:8080/pre/owner/seats/save", elements, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            alert("저장에 성공하였습니다.");
            setIsModified(false);
            setIsSaving(false);
        }).catch(error => {
            alert("저장에 실패하였습니다.");
            console.error(error);
            setIsSaving(false);
        });
    };

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        axios.get("http://localhost:8080/pre/owner/seats/load", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            const seatData = response.data.data;
            if (Array.isArray(seatData)) {
                setElements(seatData.map(seat => ({
                    id: seat.seatId,
                    type: seat.type,
                    name: seat.name,
                    x: seat.x,
                    y: seat.y,
                    shape: seat.shape,
                    image: elementImages[seat.type] || "",
                    isReserved: seat.isReserved,
                    res_idx: seat.resIdx,
                })));
            }
            setIsModified(false);
        }).catch((error) => {
            alert("좌석 정보를 불러오는 데 실패했습니다.");
            console.error(error);
        });
    }, []);

    const addEl = (type) => {
        const newSeat = {
            id: elements.length + 1,
            type: type,
            name: `${type} 좌석`,
            x: 50,
            y: 50,
            image: elementImages[type],
            isReserved: false,
            res_idx: null,
        };
        setElements(prev => [...prev, newSeat]);
        setIsModified(true);
    };

    const handleSelectSeat = (seat) => {
        setSelectedSeat(seat); // 클릭한 좌석을 선택하여 selectedSeat 상태에 저장
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "600px", padding: "2rem" }}>
            <div style={{ maxWidth: "900px", width: "100%" }}>
                <div style={{ marginBottom: "10px", textAlign: "center" }}>
                    <button onClick={() => addEl("입구")}>+ 입구 추가</button>
                    <button onClick={() => addEl("창문")}>+ 창문 추가</button>
                    <button onClick={() => addEl("2인석")}>+ 2인석 추가</button>
                    <button onClick={() => addEl("4인석")}>+ 4인석 추가</button>
                    <button onClick={() => addEl("6인석")}>+ 6인석 추가</button>
                    <button onClick={deleteEl} disabled={elements.length === 0}>⎌ 좌석 삭제</button>
                    <button onClick={saveToServer} disabled={!isModified || isSaving}>저장</button>
                    <button onClick={() => updateSeat(selectedSeat?.id, selectedSeat?.x, selectedSeat?.y)} disabled={!selectedSeat}>수정</button> {/* 수정버튼 활성화 조건 추가 */}
                </div>
                <div style={{
                    width: "100%", height: "400px", backgroundColor: "#FFFFFF", border: "1px solid black", position: "relative",
                    borderRadius: "5px", overflow: "hidden"
                }}>
                    {elements.map((seat, index) => (
                        <Draggable
                            key={index}
                            position={{ x: seat.x, y: seat.y }}
                            onStop={(e, data) => hDr(seat.id, e, data)}
                        >
                            <div style={{
                                position: "absolute", width: `${getSize(seat.type)}px`, height: `${getSize(seat.type)}px`,
                                backgroundColor: "#FFFFFF", border: "1px solid black", borderRadius: "5px", display: "flex", justifyContent: "center",
                                alignItems: "center", padding: "5px", cursor: "move", boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
                            }} onClick={() => handleSelectSeat(seat)}>
                                <img
                                    src={seat.image}
                                    alt={seat.type}
                                    style={{ width: "50px", height: "50px" }}
                                />
                                <div>{seat.name}</div>
                            </div>
                        </Draggable>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SeatManager;
