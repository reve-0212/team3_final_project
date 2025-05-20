import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import axios from "axios";
import Swal from "sweetalert2";

function SeatManager() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const [elements, setElements] = useState([]);
    const [isModified, setIsModified] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);

    const elementImages = {
        "입구":
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTESmRSGmfn9fst6CzAeCwniu3Wm4qVKZPlxw&s",
        "창문": "https://cdn-icons-png.flaticon.com/512/4804/4804222.png",
        "2인석": "https://cdn-icons-png.flaticon.com/512/1237/1237747.png",
        "4인석":
            "https://media.istockphoto.com/id/1471858377/ko/%EB%B2%A1%ED%84%B0/%EB%9D%BC%EC%9A%B4%EB%93%9C-%ED%85%8C%EC%9D%B4%EB%B8%94-%EC%9D%98%EC%9E%90-%ED%83%91-%EB%B7%B0-%EB%9D%BC%EC%9D%B8-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg?s=1024x1024&w=is&k=20&c=ncIcFXEpXDUVIyGRgOgvciwUoW5WAJvhJUHvVXFV-ew=",
        "6인석":
            "https://www.shutterstock.com/image-vector/round-table-conference-icon-flat-600w-1663348972.jpg",
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

    const isOverlapping = (x, y, width, height, currentId = null) => {
        return elements.some((el) => {
            if (el.id === currentId) return false;
            const elSize = getSize(el.type);
            return (
                x < el.x + elSize &&
                x + width > el.x &&
                y < el.y + elSize &&
                y + height > el.y
            );
        });
    };

// hDr는 onStop 전용 함수로 바꾸기 (최종 위치만 저장)
    const hDr = (id, e, data) => {
        const targetEl = elements.find((el) => el.id === id);
        if (!targetEl) return;

        const size = getSize(targetEl.type);
        const newX = Math.min(Math.max(0, data.x), 830);
        const newY = Math.min(Math.max(0, data.y), 290);

        if (isOverlapping(newX, newY, size, size, id)) {
            // 겹침이면 SweetAlert 또는 단순 alert로 알리고 위치 복원
            Swal.fire("겹침 경고", "다른 좌석과 겹칠 수 없습니다.", "error");
            // 강제로 다시 렌더링 위해 무작위 key 변경 등 필요할 수 있음
            setElements((prev) =>
                prev.map((el) =>
                    el.id === id
                        ? { ...el, x: targetEl.x, y: targetEl.y } // 원래 위치로 복구
                        : el
                )
            );
            return;
        }

        // 겹치지 않으면 위치 업데이트
        setElements((prev) =>
            prev.map((el) =>
                el.id === id
                    ? { ...el, x: newX, y: newY, isModified: true }
                    : el
            )
        );
        setIsModified(true);
    };


    const deleteEl = () => {
        if (elements.length === 0) return;

        Swal.fire({
            title: "좌석을 삭제하시겠습니까?",
            text: "마지막으로 추가된 좌석이 삭제됩니다.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FFD727",
            cancelButtonColor: "#d33",
            confirmButtonText: "예",
            cancelButtonText: "아니요",
        }).then((result) => {
            if (!result.isConfirmed) return;

            const lastSeat = elements[elements.length - 1];
            const updatedElements = elements.filter((el) => el.id !== lastSeat.id);
            setElements(updatedElements);
            setIsModified(true);

            if (lastSeat.resSeatId) {
                axios
                    .delete(
                        `http://localhost:8080/pre/owner/seats/delete/${lastSeat.resSeatId}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    .then(() => {
                        Swal.fire("삭제 완료", "좌석이 삭제되었습니다.", "success");
                    })
                    .catch(() => {
                        Swal.fire("삭제 실패", "좌석 삭제 중 오류 발생", "error");
                    });
            }
        });
    };

    const findAvailablePosition = (width, height) => {
        let x = 0,
            y = 0;
        while (isOverlapping(x, y, width, height)) {
            x += 100;
            if (x + width > 900) {
                x = 50;
                y += 100;
            }
            if (y + height > 400) {
                Swal.fire("공간 부족", "더 이상 좌석을 추가할 수 없습니다.", "error");
                return null;
            }
        }
        return { x, y };
    };

    const addEl = (type) => {
        const size = getSize(type);
        const newPosition = findAvailablePosition(size, size);
        if (!newPosition) return;

        const newSeat = {
            id: `${type}-${newPosition.x}-${newPosition.y}`,
            type,
            resSeatId: null,
            name: `${type} 좌석`,
            x: newPosition.x,
            y: newPosition.y,
            image: elementImages[type],
            isReserved: false,
            res_idx: null,
        };

        if (
            elements.some(
                (el) => el.type === type && el.x === newSeat.x && el.y === newSeat.y
            )
        ) {
            Swal.fire("오류", "이미 해당 위치에 좌석이 존재합니다.", "error");
            return;
        }

        setElements((prev) => [...prev, newSeat]);
        setIsModified(true);
    };

    const handleSave = async () => {
        if (!token) return Swal.fire("로그인 필요", "", "warning");
        if (!isModified) return Swal.fire("변경 사항 없음", "", "info");

        const result = await Swal.fire({
            title: "좌석 저장/수정 하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "예",
            cancelButtonText: "아니요",
        });
        if (!result.isConfirmed) return;

        setIsSaving(true);
        try {
            const newSeats = elements.filter((el) => !el.resSeatId);
            const updatedSeats = elements.filter((el) => el.resSeatId && el.isModified);

            if (newSeats.length)
                await axios.post("http://localhost:8080/pre/owner/seats/save", newSeats, {
                    headers: { Authorization: `Bearer ${token}` },
                });

            await Promise.all(
                updatedSeats.map((seat) =>
                    axios.put(
                        "http://localhost:8080/pre/owner/seats/update",
                        {
                            seatId: seat.resSeatId,
                            x: seat.x,
                            y: seat.y,
                        },
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    )
                )
            );

            const res = await axios.get("http://localhost:8080/pre/owner/seats/load", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const freshSeats = res.data.data.map((seat) => ({
                id: seat.seatId,
                resSeatId: seat.seatId,
                type: seat.type,
                name: seat.name,
                x: seat.x,
                y: seat.y,
                shape: seat.shape,
                image: seat.image,
                isReserved: seat.isReserved,
                res_idx: seat.resIdx,
                isModified: false,
            }));

            setElements(freshSeats);
            setIsModified(false);
            Swal.fire("저장 완료", "좌석이 저장되었습니다.", "success");
        } catch {
            Swal.fire("오류", "저장 중 문제가 발생했습니다.", "error");
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        if (!token) return;

        axios
            .get("http://localhost:8080/pre/owner/seats/load", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                const data = res.data.data;
                if (Array.isArray(data)) {
                    const seats = data.map((seat) => ({
                        id: seat.seatId,
                        resSeatId: seat.seatId,
                        type: seat.type,
                        name: seat.name,
                        x: seat.x,
                        y: seat.y,
                        shape: seat.shape,
                        image: seat.image,
                        isReserved: seat.isReserved,
                        res_idx: seat.resIdx,
                    }));
                    setElements(seats);
                    setIsModified(false);
                }
            })
            .catch(() => {
                console.error("좌석 불러오기 실패");
            });
    }, [token]);

    const handleSelectSeat = (seat) => {
        setSelectedSeat(seat); // 클릭한 좌석을 선택하여 selectedSeat 상태에 저장
    };




    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}
             className={'pt-4'}
        >
            <div style={{ maxWidth: "900px", width: "100%" }}>
                <div style={{ marginBottom: "10px"}} className={'d-flex justify-content-between'}>
                    <button type={'button'} className={'mag-btn'} onClick={() => addEl("입구")}>+ 입구 추가</button>
                    <button type={'button'} className={'mag-btn'} onClick={() => addEl("창문")}>+ 창문 추가</button>
                    <button type={'button'} className={'mag-btn'} onClick={() => addEl("2인석")}>+ 2인석 추가</button>
                    <button type={'button'} className={'mag-btn'} onClick={() => addEl("4인석")}>+ 4인석 추가</button>
                    <button type={'button'} className={'mag-btn'} onClick={() => addEl("6인석")}>+ 6인석 추가</button>
                    <button type={'button'} className={'mag-btn'} onClick={deleteEl} disabled={elements.length === 0}>⎌ 좌석 삭제</button>
                    {/* 처음 저장 전에는 저장 버튼만 보여줌 */}
                    <button
                        className="mag-btn"
                        onClick={handleSave}
                        disabled={!isModified || isSaving}
                    >
                        저장
                    </button>

                </div>
                <div style={{
                    width: "100%",
                    height: "400px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid black",
                    position: "relative",
                    borderRadius: "5px",
                    overflow: "hidden"
                }}>
                    {elements.map((seat,index) => (
                        <Draggable
                            position={{ x: seat.x, y: seat.y }}
                            onStop={(e, data) => hDr(seat.id, e, data)}
                            grid={[20, 20]}
                            bounds="parent"
                        >

                        <div
                                className="seat-wrapper"
                                style={{
                                    position: "absolute",
                                    width: `${getSize(seat.type)}px`,
                                    height: `${getSize(seat.type) + 16}px`,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    cursor: "move",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                                    borderRadius: "10px",
                                    padding: "6px",
                                    backgroundColor: "#fff",
                                    border: "1px solid #ccc",
                                }}
                                onClick={() => handleSelectSeat(seat)}
                            >
                                <div style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    color: "red",
                                    padding: "2px 4px",
                                    fontSize: "12px",
                                    borderBottomRightRadius: "4px",
                                    zIndex: 10
                                }}>
                                    {seat.restSeatId ?? index + 1}
                                </div>
                                {/* 이미지 */}
                                <div
                                    style={{
                                        width: `${getSize(seat.type)}px`,
                                        height: `${getSize(seat.type)}px`,
                                        borderRadius: seat.shape === "square" ? "50%" : "0%",
                                        backgroundColor: "transparent",
                                        backgroundImage: `url(${seat.image})`,
                                        backgroundSize: "contain",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                    }}
                                ></div>

                                {/* 텍스트 */}
                                <div
                                    style={{
                                        height: "24px",
                                        fontSize: "12px",
                                        color: selectedSeat?.id === seat.id ? "red" : "#333",
                                        fontWeight: "600",
                                        lineHeight: "24px",
                                        textAlign: "center",
                                    }}
                                >
                                    {seat.type}
                                </div>
                            </div>
                        </Draggable>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default SeatManager;
