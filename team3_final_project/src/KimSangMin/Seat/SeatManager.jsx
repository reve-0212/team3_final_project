import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import axios from "axios";
import Swal from "sweetalert2";

function SeatManager() {

    const token = localStorage.getItem('ACCESS_TOKEN');

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
    // const updateAllSeats = async (currentElements) => {
    //     if (isSaving) return;
    //     if (!token) {
    //         alert("로그인 필요");
    //         return;
    //     }
    //
    //     const confirmed = await Swal.fire({
    //         title: "좌석을 모두 저장/수정 하시겠습니까?",
    //         icon: "question",
    //         showCancelButton: true,
    //         confirmButtonText: "예",
    //         cancelButtonText: "아니요",
    //     });
    //
    //     if (!confirmed.isConfirmed) return;
    //
    //     setIsSaving(true);
    //
    //     try {
    //         // 1. 새 좌석 (resSeatId 없는 좌석)만 POST
    //         const newSeats = currentElements.filter(seat => !seat.resSeatId);
    //
    //         let savedNewSeats = [];
    //
    //         if (newSeats.length > 0) {
    //             const res = await axios.post(
    //                 "http://localhost:8080/pre/owner/seats/save",
    //                 newSeats,
    //                 { headers: { Authorization: `Bearer ${token}` } }
    //             );
    //             savedNewSeats = res.data.data; // 서버에서 새 좌석 리스트 받음
    //
    //             setElements(prev =>
    //                 prev.map(el => {
    //                     if (!el.resSeatId) {
    //                         // newSeats와 prev 순서가 같다고 가정하지 말고 id로 찾기
    //                         const index = newSeats.findIndex(ns => ns.id === el.id);
    //                         if (index !== -1 && savedNewSeats[index]) {
    //                             return { ...el, resSeatId: savedNewSeats[index].seatId };
    //                         }
    //                     }
    //                     return el;
    //                 })
    //             );
    //         }
    //
    //         // 2. 기존 좌석 위치 수정 PUT 요청 (resSeatId 있는 것들)
    //         const modifiedSeats = currentElements.filter(seat => seat.resSeatId);
    //
    //         for (const seat of modifiedSeats) {
    //             await axios.put(
    //                 "http://localhost:8080/pre/owner/seats/update",
    //                 {
    //                     seatId: seat.resSeatId,
    //                     x: seat.x,
    //                     y: seat.y,
    //                 },
    //                 { headers: { Authorization: `Bearer ${token}` } }
    //             );
    //         }
    //
    //         Swal.fire("저장 완료", "좌석 위치가 저장되었습니다.", "success");
    //         setIsModified(false);
    //
    //     } catch (err) {
    //         console.error(err);
    //         Swal.fire("오류", "저장 중 오류가 발생했습니다.", "error");
    //     } finally {
    //         setIsSaving(false);
    //     }
    // };



    // 좌석을 드래그로 이동처리하는 함수
    // id: 이동중인 좌석id, e : 이벤트 , data : 새 위치 좌표 x,y
// 좌석 드래그 종료 후 위치 업데이트 함수 수정
    const hDr = (id, e, data) => {
        const size = getSize(elements.find(el => el.id === id)?.type);
        if (!size) return;

        const newX = Math.min(Math.max(0, data.x), 830);
        const newY = Math.min(Math.max(0, data.y), 290);

        const overlapping = isOverlapping(newX, newY, size, size, id);
        if (overlapping) return;

<<<<<<< HEAD
        // 상태 업데이트한 좌석의 좌표를 새 좌표로 변경
        setElements(prev => prev.map(el =>
            el.id === id ? { ...el, x: newX, y: newY } : el
        ));
        // 좌석의 id와 새로운 x,y 좌표 서버에 전송
=======
        setElements(prev => {
            const updated = prev.map(el =>
                el.id === id ? { ...el, x: newX, y: newY, isModified: true } : el
            );
            return updated;
        });

>>>>>>> ea3b3717b2818736918623c0fcb1ff49087759a5
        setIsModified(true);
    };



    // 좌석 삭제하기
    const deleteEl = () => {
        if (elements.length === 0) return;

        Swal.fire({
            title: '좌석을 삭제하시겠습니까?',
            text: '마지막으로 추가된 좌석이 삭제됩니다.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FFD727',
            cancelButtonColor: '#d33',
            confirmButtonText: '예',
            cancelButtonText: '아니요'
        }).then((result) => {
            if (!result.isConfirmed) return;

            const lastSeat = elements[elements.length - 1];

            if (!token) {
                Swal.fire({
                    icon: 'error',
                    title: '로그인이 필요합니다.',
                    confirmButtonColor: '#FF3B30'
                });
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
                    Swal.fire({
                        icon: 'success',
                        title: '삭제 완료!',
                        text: '좌석이 성공적으로 삭제되었습니다.',
                        confirmButtonColor: '#FFD727'
                    });
                }).catch(error => {
                    console.error("좌석 삭제 실패:", error.response ? error.response.data : error.message);
                    Swal.fire({
                        icon: 'error',
                        title: '삭제 실패',
                        text: '좌석 삭제에 실패했습니다.',
                        confirmButtonColor: '#FF3B30'
                    });
                });
            }
        });
    };


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
                Swal.fire({
                    icon: 'error',
                    title: '오류',
                    text: '더 이상 공간을 추가할 수 없습니다.',
                    confirmButtonColor: '#FF3B30'
                });
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
            resSeatId: null,
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
            Swal.fire({
                icon: 'error',
                title: '오류',
                text: '이미 같은 위치에 좌석이 있습니다.',
                confirmButtonColor: '#FF3B30'
            });
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
    const handleSave = async () => {
        if (!token) {
            Swal.fire("로그인 필요", "", "warning");
            return;
        }

<<<<<<< HEAD
        const newSeats = elements.filter(seat => !seat.id || String(seat.id).startsWith("new"));


        // const uniqueSeats = [];
        // const seatIds = new Set();  // 중복된 ID를 체크할 Set 생성
        //
        // // 좌석들 중에서 중복된 좌석을 제외하고 새로운 좌석만 배열에 추가
        // elements.forEach(seat => {
        //     if (!seatIds.has(seat.id)) {
        //         uniqueSeats.push(seat); // 중복되지 않는 좌석만 추가
        //         seatIds.add(seat.id);    // 해당 ID는 Set에 추가
        //     }
        // });

        if (newSeats.length === 0) {
            alert("저장할 새 좌석이 없습니다.");
            setIsSaving(false);
            return;
        }

        axios.post("http://localhost:8080/pre/owner/seats/save", newSeats, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
=======
        if (!isModified) {
            Swal.fire("변경된 내용이 없습니다.", "", "info");
            return;
        }

        const result = await Swal.fire({
            title: "좌석을 저장/수정 하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "예",
            cancelButtonText: "아니요",
        });

        if (!result.isConfirmed) return;

        setIsSaving(true);

        try {
            const newSeats = elements.filter(seat => !seat.resSeatId);

            const updatedSeats = elements.filter(seat => seat.resSeatId && seat.isModified);

            if (newSeats.length > 0) {
                await axios.post(
                    "http://localhost:8080/pre/owner/seats/save",
                    newSeats,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
>>>>>>> ea3b3717b2818736918623c0fcb1ff49087759a5
            }

            await Promise.all(
                updatedSeats.map(seat =>
                    axios.put(
                        "http://localhost:8080/pre/owner/seats/update",
                        {
                            seatId: seat.resSeatId,
                            x: seat.x,
                            y: seat.y,
                        },
                        { headers: { Authorization: `Bearer ${token}` } }
                    )
                )
            );

            // 저장 후 서버에서 좌석 불러오기 (또는 기존 상태를 클린업)
            const res = await axios.get(
                "http://localhost:8080/pre/owner/seats/load",
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const freshSeats = res.data.data.map(seat => ({
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
            console.log('전체 좌석:', elements);
            console.log('새 좌석:', newSeats);
            console.log('수정 좌석:', updatedSeats);
            setElements(freshSeats);
            setIsModified(false);

            Swal.fire("저장 완료", "좌석 위치가 저장되었습니다.", "success");
        } catch (error) {
            Swal.fire("오류", "저장 중 오류가 발생했습니다.", "error");
        } finally {
            setIsSaving(false);
        }
    };


// 서버에 저장된 좌석 불러오기
    useEffect(() => {
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        axios.get("http://localhost:8080/pre/owner/seats/load", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                const seatData = response.data.data;

                if (Array.isArray(seatData)) {
                    const seatsFromServer = seatData.map(seat => ({
                        id: seat.seatId,
                        type: seat.type,
                        name: seat.name,
                        resSeatId: seat.seatId,
                        x: seat.x,
                        y: seat.y,
                        shape: seat.shape,
                        image: seat.image,
                        isReserved: seat.isReserved,
                        res_idx: seat.resIdx,
                    }));

                    setElements(seatsFromServer);
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
                            key={seat.id}
                            position={{ x: seat.x, y: seat.y }}
                            onStop={(e, data) => hDr(seat.id, e, data)}
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
                                    {seat.resSeatId ?? index + 1}
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
