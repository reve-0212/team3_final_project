import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import axios from "axios";

function SeatManager() {
    // 좌석 요소들의 정보
    const [elements, setElements] = useState([]);
    // 수정이 되었는지 확인
    const [isModified, setIsModified] = useState(false);
    // 저장이 되었는지 확인
    const [isSaving, setIsSaving] = useState(false);
    // 좌석을 수정하기 위해 선택된 좌석 표시
    const [selectedSeat, setSelectedSeat] = useState(null); // 수정할 좌석을 선택하기 위한 상태 추가


    // 좌석마다 사진
    const elementImages = {
        "입구": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTESmRSGmfn9fst6CzAeCwniu3Wm4qVKZPlxw&s",
        "창문": "https://cdn-icons-png.flaticon.com/512/4804/4804222.png",
        "2인석": "https://cdn-icons-png.flaticon.com/512/1237/1237747.png",
        "4인석": "https://media.istockphoto.com/id/1471858377/ko/%EB%B2%A1%ED%84%B0/%EB%9D%BC%EC%9A%B4%EB%93%9C-%ED%85%8C%EC%9D%B4%EB%B8%94-%EC%9D%98%EC%9E%90-%ED%83%91-%EB%B7%B0-%EB%9D%BC%EC%9D%B8-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg?s=1024x1024&w=is&k=20&c=ncIcFXEpXDUVIyGRgOgvciwUoW5WAJvhJUHvVXFV-ew=",
        "6인석": "https://www.shutterstock.com/image-vector/round-table-conference-icon-flat-600w-1663348972.jpg",
    };


    // 좌석 타입에 맞춰 크기 지정
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

    // 좌석끼리 겹쳐지지 않기 위해
    const isOverlapping = (x, y, width, height, currentId = null) => {
        return elements.some(el => {
            if (el.id === currentId) return false; // 자기 자신 제외
            const elSize = getSize(el.type);
            return (
                x < el.x + elSize &&
                x + width > el.x &&
                y < el.y + elSize &&
                y + height > el.y
            );
        });
    };

    // 좌석 수정하기
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
            y: y,
        };
        console.log("업데이트 요청 seat:", cleanSeat);
        axios.put("http://localhost:8080/pre/owner/seats/update", cleanSeat, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            console.log("좌석 위치 업데이트 완료");
            // 기존 좌석의 x,y값만 변경
            setElements(prev => prev.map(el =>
                el.id === id ? { ...el, x, y } : el
            ));
        }).catch(error => {
            // console.error("좌석 위치 업데이트 실패:", error.response ? error.response.data : error.message);
        });
    };

    // 좌석을 드래그로 이동처리하는 함수
    // id: 이동중인 좌석id, e : 이벤트 , data : 새 위치 좌표 x,y
    const hDr = (id, e, data) => {
        // 해당 id 를 찾고 못찾으면 리턴
        const currentEl = elements.find(el => el.id === id);
        if (!currentEl) return;

        // 해당 요소의 크기 가져오기
        const size = getSize(currentEl.type);
        // 좌석 X , Y의 최대 좌표
        const newX = Math.min(Math.max(0, data.x), 830);
        const newY = Math.min(Math.max(0, data.y), 290);

        // 다른 요소와 겹치는지 겹친다면 취소
        const overlapping = isOverlapping(newX, newY, size, size, id);
        if (overlapping) return;

        // 상태 업데이트한 좌석의 좌표를 새 좌표로 변경
        setElements(prev => prev.map(el =>
            el.id === id ? { ...el, x: newX, y: newY } : el
        ));
        // 좌석의 id와 새로운 x,y 좌표 서버에 전송
        updateSeat(id, newX, newY);
        setIsModified(true);
    };

    // 좌석 삭제하기
    const deleteEl = () => {
        // 좌석이 없으면 리턴
        if (elements.length === 0) return;

        const confirmDelete = window.confirm("마지막으로 추가한 좌석을 삭제하시겠습니까?");
        if (!confirmDelete) return;
        // 요소중의 마지막에 생성된 요소를 기준으로 삭제
        const lastSeat = elements[elements.length - 1];

        // 토큰 검사
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        const updatedElements = elements.filter(el => el.id !== lastSeat.id);
        // lastSeat.id 와 같은 id를 제외한 좌석을 남긴다.
        setElements(updatedElements);
        // lastSeat.id 좌석을 제외한 상태로 렌더링
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

    // 좌석끼리 겹쳐지지 않기 위해
    // 좌석끼리 겹쳐지지 않기 위해
    const findAvailablePosition = (width, height) => {
        let x = 0; // 초기 위치
        let y = 0;

        // 반복문으로 기존 좌석들과 겹치지 않는 위치를 찾음
        while (isOverlapping(x, y, width, height)) {
            x += 100; // x좌표를 일정 간격으로 증가시킴
            if (x + width > 900) { // x좌표가 최대값을 넘으면 y좌표 증가
                x = 50; // 다시 시작 좌표로 설정
                y += 100; // y좌표를 일정 간격으로 증가시킴
            }
            if (y + height > 400) { // y좌표가 범위를 넘으면 더 이상 추가하지 않음
                alert("더 이상 공간을 추가할 수 없습니다.");
                return null;
            }
        }
        return { x, y };
    };

// 좌석 추가하기
    const addEl = (type) => {
        const size = getSize(type);  // 좌석 크기 계산
        const newPosition = findAvailablePosition(size, size);

        if (!newPosition) return;


        const newSeat = {
            id: `${type}-${newPosition.x}-${newPosition.y}`, // 고유한 ID로 좌석 추가
            type: type,
            name: `${type} 좌석`,
            x: newPosition.x,  // 새 위치 적용
            y: newPosition.y,  // 새 위치 적용
            image: elementImages[type],
            isReserved: false,
            res_idx: null,
        };

        // 중복되는 좌석 체크
        const isDuplicate = elements.some(el => el.type === type && el.x === newSeat.x && el.y === newSeat.y);
        if (isDuplicate) {
            alert("이미 같은 위치에 좌석이 있습니다.");
            return;  // 중복되면 상태 변경 없이 그대로 반환
        }

        // 새 좌석을 추가하여 상태 업데이트
        setElements((prevElements) => {
            // 중복되지 않는 좌석만 추가
            const updatedElements = [...prevElements, newSeat];
            return updatedElements;
        });
        setIsModified(true);
    };

// 좌석 서버에 저장하기
    const saveToServer = () => {
        if (isSaving) return;
        setIsSaving(true);

        const token = localStorage.getItem('jwtToken');
        if (!token) {
            alert("로그인이 필요합니다.");
            setIsSaving(false);
            return;
        }

        const uniqueSeats = [];
        const seatIds = new Set();  // 중복된 ID를 체크할 Set 생성

        // 좌석들 중에서 중복된 좌석을 제외하고 새로운 좌석만 배열에 추가
        elements.forEach(seat => {
            if (!seatIds.has(seat.id)) {
                uniqueSeats.push(seat); // 중복되지 않는 좌석만 추가
                seatIds.add(seat.id);    // 해당 ID는 Set에 추가
            }
        });

        axios.post("http://localhost:8080/pre/owner/seats/save", uniqueSeats, {
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

// 서버에 저장된 좌석 불러오기
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
                setElements(prevElements => {
                    // 기존 좌석 정보에서 type, name, image 속성을 기준으로 중복된 좌석을 체크
                    const existingSeats = prevElements.map(seat => ({
                        type: seat.type,
                        name: seat.name,
                        image: seat.image
                    }));

                    // 중복되지 않은 새로운 좌석만 추가
                    const newElements = seatData.filter(seat => {
                        return !existingSeats.some(existingSeat =>
                            existingSeat.type === seat.type &&
                            existingSeat.name === seat.name &&
                            existingSeat.image === seat.image
                        );
                    }).map(seat => ({
                        id: seat.seatId, // 서버에서 받은 seatId를 사용
                        type: seat.type,
                        name: seat.name,
                        x: seat.x,
                        y: seat.y,
                        shape: seat.shape,
                        image: seat.image,  // 이미지 URL을 사용
                        isReserved: seat.isReserved,
                        res_idx: seat.resIdx,
                    }));

                    // 기존 좌석과 새로운 좌석을 결합하여 반환
                    return [...prevElements, ...newElements];
                });
             }
            setIsModified(false);
        }).catch(() => {
            console.error("좌석 불러오기 실패");
        });
    }, []);

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
