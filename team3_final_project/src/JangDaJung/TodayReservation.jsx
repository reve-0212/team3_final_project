import React, {useEffect, useState} from "react";
import './css/TodayReservation.css'
import ReBanner from "../KimSangMin/ReBanner.jsx";
import {useParams} from "react-router-dom";
import axios from "axios";

function TodayReservation() {
    const {resIdx} = useParams();  // URL 파라미터에서 resIdx 값을 가져옵니다.
    const [seats, setSeats] = useState([]);
    const [seatSelect, setSeatSelect] = useState([]);
    const [reservationList, setReservationList] = useState([]);

    const handleStatusChange = (id, newStatus) => {
        setReservationList((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status:newStatus } : item))
        );
    };


    // 좌석선택기능
    const hSeat = (seatId) => {

        console.log("클릭된 좌석 : seatId : " + seatId);

        setSeatSelect([seatId]); // 클릭된 좌석만 선택 상태로 저장 (토글 X)

        // 좌석에 따른 예약 데이터 불러오기
        axios.get(`http://localhost:8080/pre/reservations`,{
            params: {
                seatId: seatId,
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
            }
        })
            .then((res) => {

                console.log(res.data);

                setReservationList(res.data);  // 서버에서 받은 예약 리스트로 교체
            })
            .catch(err => {
                console.error("예약 정보 불러오기 실패:", err);
                setReservationList([]);  // 실패 시 초기화
            });
    };

    useEffect(() => {
        if (resIdx) {
            axios.get(`http://localhost:8080/pre/TodayLoadSeat/${resIdx}`,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
                }
            })
                .then((response) => {
                    console.log(response.data);
                    const { success, data } = response.data;
                    if (success && Array.isArray(data)) {
                        let filteredSeats = data;

                        setSeats(filteredSeats);
                    }
                })
                .catch((error) => {
                    console.error("좌석 정보 불러오기 실패:", error);
                });
        }
    }, [resIdx]);

    return (
        <>
            <ReBanner />
            <div style={{
                marginLeft: "250px",
                paddingTop: "8rem",
                paddingLeft: "1rem",
                width: "calc(100% - 200px)",
            }} className={'container'}>
                <div>
                    <h2 className={'today-waiting-title mb-4'}>오늘의 예약</h2>
                    <hr/>
                    {/*    탭 */}
                    <div className={'d-flex flex-wrap gap-3 mb-4 justify-content-center'}>
                        <h2 className={'custom-tab-btn active'}>
                            현재 예약
                        </h2>
                    </div>


                    <div className={'d-flex justify-content-center mb-4'}>
                        {Array.isArray(seats) && seats.length > 0 ? (
                            <div
                                className={"seat-layout"}
                                style={{
                                    position: "relative",
                                    width: "71%",
                                    maxWidth: "900px",
                                    height: "400px",
                                    border: "1px solid #ddd",
                                    backgroundColor: "lightgray",
                                }}
                            >
                                {seats.map((seat, index) => {
                                    const isUnavailable = seat.type === "창문" || seat.type === "입구";
                                    const isSelected = seatSelect.includes(seat.seatId);

                                    const seatSize =
                                        seat.type === "4인석" ? 80 : seat.type === "6인석" ? 100 : 50;

                                    const textHeight = 16;
                                    const totalHeight = seatSize + textHeight;

                                    return (
                                        <div
                                            key={`${seat.seatId}-${index}`}
                                            className="seat-wrapper"
                                            style={{
                                                position: "absolute",
                                                left: `${seat.x}px`,
                                                top: `${seat.y}px`,
                                                width: `${seatSize}px`,
                                                height: `${totalHeight}px`, // 이미지 + 텍스트 높이
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "flex-start",
                                                cursor: isUnavailable ? "not-allowed" : "pointer",
                                            }}
                                            onClick={!isUnavailable ? () => hSeat(seat.seatId) : null}
                                        >
                                            {/* 이미지 */}
                                            <div
                                                style={{
                                                    width: `${seatSize}px`,
                                                    height: `${seatSize}px`,
                                                    borderRadius: seat.shape === "square" ? "50%" : "0%",
                                                    backgroundColor: "transparent",
                                                    backgroundImage: `url(${seat.image})`,
                                                    backgroundSize: "contain",
                                                    backgroundPosition: "center",
                                                    backgroundRepeat: "no-repeat",
                                                }}
                                            ></div>

                                            {/* 텍스트 */}
                                            {!isUnavailable && (
                                                <div
                                                    style={{
                                                        height: `${textHeight}px`,
                                                        fontSize: "12px",
                                                        color: isSelected ? "red" : "black",
                                                        fontWeight: "600",
                                                        lineHeight: `${textHeight}px`,
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {seat.seatId}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div
                                className="seat-layout align-content-center"
                                style={{
                                    position: "relative",
                                    width: "71%",
                                    maxWidth: "800px",
                                    height: "350px",
                                    border: "1px solid #ddd",
                                }}
                            >
                                <p className={'text-center align-items-center'}>좌석 정보가 없습니다.</p>
                            </div>
                        )}
                    </div>




                    {/*    리스트 */}
                    <div className={'table-responsive'}>
                        <table className={'table text-center align-middle table-background'}>
                            <colgroup>
                                <col style={{width: '10%'}}/>
                                <col style={{width: '10%'}}/>
                                <col style={{width: '10%'}}/>
                                <col style={{width: '20%'}}/>
                                <col style={{width: '20%'}}/>
                                <col style={{width: '10%'}}/>
                            </colgroup>
                            <thead className={'table-light'}>
                            <tr>
                                <th>번호</th>
                                <th>이름</th>
                                <th>인원수</th>
                                <th>전화번호</th>
                                <th>예약정보</th>
                                <th>방문횟수</th>
                                <th>동작</th>
                            </tr>
                            </thead>
                            <tbody style={{backgroundColor: '#f5f5f5'}}>
                            {reservationList.length === 0 ? (
                                <tr>
                                    <td colSpan={7}>등록된 웨이팅이 없습니다.</td>
                                </tr>
                            ) : (
                                reservationList.map((item) => (
                                    <tr key={item.reservationIdx}>
                                        <td>No. {item.reservationIdx}</td>
                                        <td>{item.userNick}</td>
                                        <td>{item.rsvPeople}</td>
                                        <td>{item.userCall}</td>
                                        <td>{item.rsvTime}</td>
                                        <td>{item.visitCount}</td>
                                        <td>
                                            <div className="d-flex flex-wrap justify-content-center gap-2">
                                                <button
                                                    className="ceo-btn btn-sm btn-done"
                                                    onClick={() => handleStatusChange(item.reservationIdx, '완료')}
                                                >
                                                    확인
                                                </button>
                                                <button
                                                    className="ceo-btn btn-sm btn-cancel"
                                                    onClick={() => handleStatusChange(item.reservationIdx, '취소')}
                                                >
                                                    취소
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TodayReservation;