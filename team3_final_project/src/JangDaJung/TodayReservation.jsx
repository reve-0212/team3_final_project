import React, {useEffect, useState} from "react";
import './css/TodayReservation.css'
import ReBanner from "../KimSangMin/ReBanner.jsx";
import {useParams} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function TodayReservation() {
    const {resIdx} = useParams();  // URL 파라미터에서 resIdx 값을 가져옵니다.
    const [seats, setSeats] = useState([]);
    const [seatSelect, setSeatSelect] = useState([]);
    const [reservationList, setReservationList] = useState([]);
    const [activeTab, setActiveTab] = useState('all');





    const handleStatusChange = (id, newStatus) => {
        const action = newStatus === '완료' ? '예약을 완료 처리' : '예약을 취소';

        Swal.fire({
            title: `${action}하시겠습니까?`,
            text: "이 작업은 되돌릴 수 없습니다.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '예',
            cancelButtonText: '아니오'
        }).then((result) =>{
            if (result.isConfirmed) {
                axios.put(`http://localhost:8080/pre/reservation/status`, {
                    reservationIdx: id,
                    status: newStatus,
                    resIdx : resIdx,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
                    }
                })
                    .then((res) => {
                        console.log("상태 업데이트 성공:", res.data);

                        if (seatSelect.length > 0) {
                            hSeat(seatSelect[0]); // 현재 선택된 좌석 기준으로 예약목록 갱신
                        }else if (activeTab === 'all') {
                            axios.get(`http://localhost:8080/pre/reservations/all`, {
                                params: { resIdx: resIdx },
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
                                }
                            }).then(res => {
                                setReservationList(res.data);
                            }).catch(err => {
                                console.error("전체 예약 불러오기 실패:", err);
                                Swal.fire({
                                    icon: 'warning',
                                    title: '알림',
                                    html: `<strong style="color:crimson;"><b>상태 처리 에러</b></strong><br/>
                                    <span>관리자에게 문의 주세요.</span>`,
                                    confirmButtonText: '확인'
                                })
                            });
                        }
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'warning',
                            title: '알림',
                            html: `<strong style="color:crimson;"><b>상태 처리 에러</b></strong><br/>
                                    <span>관리자에게 문의 주세요.</span>`,
                            confirmButtonText: '확인'
                        })
                    });
            }
        });
    };



    // 좌석선택기능
    const hSeat = (seatId) => {

        console.log("클릭된 좌석 : seatId : " + seatId);

        setSeatSelect([seatId]); // 클릭된 좌석만 선택 상태로 저장 (토글 X)
        setActiveTab(null);
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
                        setSeats(data);
                    }
                })
                .catch((error) => {
                    console.error("좌석 정보 불러오기 실패:", error);
                });

            // 전체 좌석 예약 목록 들고오기
            axios.get(`http://localhost:8080/pre/reservations/all`, {
                params: { resIdx: resIdx },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
                }
            })
                .then((res) => {
                    console.log("전체 예약:", res.data);
                    setReservationList(res.data);
                    setSeatSelect([]); // 전체 보기 상태
                })
                .catch((err) => {
                    console.error("전체 예약 불러오기 실패:", err);
                });
        }
    }, [resIdx]);


    const [currentPage, setCurrentPage] = useState(1); // 페이지 네이션
    const [itemsPerPage] = useState(5); // 페이지 보여지는 갯수

    const totalPages = Math.ceil(reservationList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = reservationList.slice(startIndex, endIndex);


    useEffect(() => {
        setCurrentPage(1);
    }, []);

    const renderPagination = () => {
        if (totalPages < 1) return null;

        const buttons = [];

        const goToFirst = () => setCurrentPage(1);
        const goToLast = () => setCurrentPage(totalPages);
        const goToPrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
        const goToNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

        // 첫 페이지 버튼
        buttons.push(
            <button
                key="first"
                onClick={goToFirst}
                className="btn btn-sm btn-outline-secondary mx-1"
                title="첫 페이지"
            >
                &laquo;
            </button>
        );

        // 이전 버튼
        buttons.push(
            <button
                key="prev"
                onClick={goToPrev}
                className="btn btn-sm btn-outline-secondary mx-1"
                title="이전 페이지"
            >
                &lsaquo;
            </button>
        );

        // 숫자 버튼 (최대 5개)
        const maxButtons = 5;
        let startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
        let endPage = startPage + maxButtons - 1;
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(endPage - maxButtons + 1, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`btn btn-sm mx-1 ${currentPage === i ? 'btn-primary' : 'btn-outline-primary'}`}
                    style={{
                        borderRadius: '20px',
                        minWidth: '38px',
                        fontWeight: currentPage === i ? 'bold' : 'normal',
                    }}
                >
                    {i}
                </button>
            );
        }

        // 다음 버튼
        buttons.push(
            <button
                key="next"
                onClick={goToNext}
                className="btn btn-sm btn-outline-secondary mx-1"
                title="다음 페이지"
            >
                &rsaquo;
            </button>
        );

        // 마지막 페이지 버튼
        buttons.push(
            <button
                key="last"
                onClick={goToLast}
                className="btn btn-sm btn-outline-secondary mx-1"
                title="마지막 페이지"
            >
                &raquo;
            </button>
        );

        return buttons;
    };

    return (
        <>
            <ReBanner />
            <div style={{
                marginLeft: "250px",
                paddingTop: "8rem",
                paddingLeft: "1rem",
                width: "calc(100% - 200px)",
                maxWidth: "165vh",
                minHeight: "100vh",
                }} className={'container'}>
                <div>
                    <h2 className={'today-waiting-title mb-4'}>오늘의 예약</h2>
                    <hr/>
                    {/*    탭 */}
                    <div className={'d-flex flex-wrap gap-3 mb-4 justify-content-center'}>
                        <h2
                            className={`custom-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab('all');
                                setSeatSelect([]); // 좌석 선택 초기화

                                axios.get(`http://localhost:8080/pre/reservations/all`, {
                                    params: { resIdx: resIdx },
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
                                    }
                                }).then(res => {
                                    setReservationList(res.data);
                                }).catch(err => {
                                    console.error("전체 예약 불러오기 실패:", err);
                                });
                            }}
                        >
                            예약 전체 보기
                        </h2>
                    </div>

                    {/* 좌석 div */}
                    <div className={'d-flex justify-content-center mb-4'}>
                        {Array.isArray(seats) && seats.length > 0 ? (
                            <div
                                className={"seat-layout"}
                                style={{
                                    position: "relative",
                                    width: "71%",
                                    minWidth: "900px",
                                    height: "400px",
                                    border: "1px solid #ddd",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                                    borderRadius: "10px",
                                    // backgroundColor: "#fffbe6", // 연한 노란색 배경
                                }}
                            >
                                {seats.map((seat, index) => {
                                    const isUnavailable = seat.type === "창문" || seat.type === "입구";
                                    const isSelected = seatSelect.includes(seat.seatId);

                                    const seatSize =
                                        seat.type === "4인석" ? 80 : seat.type === "6인석" ? 100 : seat.type === "입구" ? 70 : seat.type === "창문" ? 70 : 60;

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
                                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                                                borderRadius: "10px",
                                                padding: "6px",
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
                                                        height: `24px`,
                                                        fontSize: "12px",
                                                        color: isSelected ? "red" : "black",
                                                        fontWeight: "600",
                                                        lineHeight: `24px`,
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {seat.resSeatId === 0 ? index + 1 : seat.resSeatId}
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
                        <table className={'table text-center align-middle table-background'}
                               style={{ width: '100%', tableLayout: 'fixed' }}
                        >
                            <colgroup>
                                <col style={{width: '10%'}}/>
                                <col style={{width: '20%'}}/>
                                <col style={{width: '5%'}}/>
                                <col style={{width: '5%'}}/>
                                <col style={{width: '20%'}}/>
                                <col style={{width: '20%'}}/>
                                <col style={{width: '10%'}}/>
                                <col style={{width: '10%'}}/>
                            </colgroup>
                            <thead className={'table-light'}>
                            <tr>
                                <th>번호</th>
                                <th>좌석목록</th>
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
                                    <td colSpan={8}>등록된 웨이팅이 없습니다.</td>
                                </tr>
                            ) : (
                                paginatedData.map((item, index) => {
                                    // 날짜 비교를 위한 코드
                                    const reservationDateTime = new Date(item.rsvTime); // 문자열을 Date 객체로
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0); // 오늘 00:00 기준

                                    const isPast = reservationDateTime < today; // 오늘보다 전이면 true

                                    return (
                                        <tr key={item.reservationIdx}
                                        >
                                            <td>No. {index + 1}</td>
                                            <td>{item.resSeatId}</td>
                                            <td>{item.userNick}</td>
                                            <td>{item.rsvPeople}</td>
                                            <td>{item.userCall}</td>
                                            <td style={isPast ? { color: '#ff9999', fontWeight: 'bold' } : {}}>
                                                {item.rsvTime}
                                                {isPast && <div style={{ fontSize: '0.8rem', color: '#000000' }}>지나간 예약입니다</div>}
                                            </td>
                                            <td>{item.visitCount}</td>
                                            <td>
                                                <div className="d-flex flex-wrap justify-content-center gap-2">
                                                    <button
                                                        className="ceo-btn btn-sm btn-done"
                                                        onClick={() => handleStatusChange(item.reservationIdx, '완료')}
                                                        style={{ backgroundColor: '#28a745', color: 'white', border: 'none' }}
                                                    >
                                                        확인
                                                    </button>
                                                    <button
                                                        className="ceo-btn btn-sm btn-cancel"
                                                        onClick={() => handleStatusChange(item.reservationIdx, '취소')}
                                                        style={{ backgroundColor: '#dc3545', color: 'white', border: 'none' }}
                                                    >
                                                        취소
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                            </tbody>
                        </table>
                        {/* 페이지네이션 */}
                        <div className="d-flex justify-content-center my-4">
                            {renderPagination()}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default TodayReservation;