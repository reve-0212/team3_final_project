import WaBanner from "../KimSangMin/WaBanner.jsx";
import {useEffect, useRef, useState} from "react";

import 'react-day-picker/dist/style.css';
import './css/PastDateReservation.css';
import {DayPicker} from "react-day-picker";
import ReBanner from "../KimSangMin/ReBanner.jsx";
import {useParams} from "react-router-dom";
import axios from "axios";

function PastDateReservation() {

  const {resIdx} = useParams();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (!resIdx) return;

    const token = localStorage.getItem("ACCESS_TOKEN");

    axios.get(`http://localhost:8080/pre/Pastreservations/${resIdx}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
        .then((response) => {
          console.log(response.data);
          setReservations(response.data);
        })
        .catch((err) => {
          console.error("예약 리스트 로딩 실패:", err);
        });
  }, [resIdx]);

  const getStatusColor = (status) => {
    if (status === '완료') return 'status-done text-white status-box';
    if (status === '신청') return 'status-request text-white status-box';
    if (status === '취소') return 'status-cancel text-white status-box';
    return '';
  };

  const [searchType, setSearchType] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('예약상태');

  const [reservationConfirmedRange, setReservationConfirmedRange] = useState({ from: undefined, to: undefined });
  const [reservationTempRange, setReservationTempRange] = useState({ from: undefined, to: undefined });
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
          calendarRef.current &&
          !calendarRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('ko-KR').replace(/\./g, '').replace(/ /g, '.');
  };

  const filteredData = reservations.filter(item => {
    const matchesSearch =
        searchKeyword === '' ||
        (searchType === 'name' && item.userNick.includes(searchKeyword)) ||
        (searchType === 'phone' && item.userCall.includes(searchKeyword));

    const matchesStatus =
        statusFilter === '예약상태' || item.status === statusFilter;


    const matchesDate = (() => {
      if (!reservationConfirmedRange.from || !reservationConfirmedRange.to) return true;

      const reservationDate = new Date(item.rsvDate);
      const toDate = new Date(reservationConfirmedRange.to);
      toDate.setDate(toDate.getDate() + 1);

      return reservationDate >= reservationConfirmedRange.from && reservationDate < toDate;
    })();


    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleSearchButtonClick = () => {
    setSearchKeyword(searchQuery);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchKeyword(searchQuery);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, statusFilter, reservationConfirmedRange]);

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
          minHeight: "100vh",
        }} className={'container'}>
          <div>
            <h2 className={'past-waiting-title mb-4'}>예약 내역</h2>
            <hr/>
            <div className={'d-flex align-items-center justify-content-center gap-3 mt-4'}>
              {/* 날짜 선택 박스 */}
              <div
                  className={'date-box d-flex align-items-center justify-content-center'}
                  style={{width: '300px', position: 'relative'}}
                  onClick={() => {
                    setShowCalendar(true);
                    setReservationTempRange(reservationConfirmedRange);
                  }}
              >
                <p style={{margin: 0}}>
                  {reservationConfirmedRange.from && reservationConfirmedRange.to
                      ? `${formatDate(reservationConfirmedRange.from)} ~ ${formatDate(reservationConfirmedRange.to)}`
                      : '날짜 선택'}
                </p>
                {showCalendar && (
                    <div className={'calendar-popup'} ref={calendarRef} onClick={(e) => e.stopPropagation()}>
                      <DayPicker
                          mode="range"
                          selected={reservationTempRange}
                          onSelect={setReservationTempRange}
                          pagedNavigation
                      />
                      <div className="d-flex justify-content-end mt-3" style={{gap: '10px'}}>
                        <button
                            className="btn btn-secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowCalendar(false);
                            }}>취소
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              const { from, to } = reservationTempRange || {};

                              if (!from && !to) {
                                // 아무 날짜도 선택하지 않았을 때 초기화
                                setReservationConfirmedRange({ from: undefined, to: undefined });
                                setReservationTempRange({ from: undefined, to: undefined });
                              } else if (from && !to) {
                                // from만 선택했을 때 to도 from과 동일하게 설정
                                setReservationConfirmedRange({ from, to: from });
                                setReservationTempRange({ from, to: from });
                              } else {
                                // 정상 범위 선택 시
                                setReservationConfirmedRange(reservationTempRange);
                              }
                              setShowCalendar(false);
                            }}
                        >
                          확인
                        </button>


                      </div>
                    </div>
                )}
              </div>

              {/* 검색창 */}
              <div className={'search-box d-flex align-items-center'}
                   style={{borderRadius: '10px', overflow: 'hidden', width: '500px', paddingRight: '5px'}}>
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className={'form-select text-center'}
                    style={{border: 'none', width: '30%', borderRadius: '0', margin: '0.3vw', height: '100%'}}
                >
                  <option value="name">예약자명</option>
                  <option value="phone">전화번호</option>
                </select>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={'검색어를 입력하세요'}
                    onKeyDown={handleKeyDown}
                    className={'form-control'}
                    style={{border: 'none', width: '70%', height: '100%'}}
                />
                <button className="btn" style={{height: '3.5vw', whiteSpace: 'nowrap'}} onClick={handleSearchButtonClick}>검색</button>
              </div>
            </div>

            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={'form-select text-center status-select mt-4'}
                style={{border: 'none', borderRadius: '0', height: '100%'}}
            >
              <option value="예약상태">예약상태</option>
              <option value="신청">신청</option>
              <option value="완료">완료</option>
              <option value="취소">취소</option>
            </select>

            {/* 예약 테이블 */}
            <div className={'mt-2'}>
              <table className={'table me-3'} style={{tableLayout: 'fixed', width: '100%'}}>
                <colgroup>
                  <col style={{width: '10%'}}/>
                  <col style={{width: '15%'}}/>
                  <col style={{width: '10%'}}/>
                  <col style={{width: '5%'}}/>
                  <col style={{width: '15%'}}/>
                  <col style={{width: '15%'}}/>
                  <col style={{width: '15%'}}/>
                </colgroup>
                <thead className={'thead-light'}>
                <tr>
                  <th>상태</th>
                  <th>이용일</th>
                  <th>예약자</th>
                  <th>인원</th>
                  <th>전화번호</th>
                  <th>완료일시</th>
                  <th>취소일시</th>
                </tr>
                </thead>
                <tbody>
                {paginatedData.length > 0 ? (
                    paginatedData.map((item, idx) => (
                        <tr key={idx}>
                          <td><div className={getStatusColor(item.status)}>{item.status}</div></td>
                          <td>{item.rsvDate}</td>
                          <td>{item.userNick}</td>
                          <td>{item.rsvPeople}</td>
                          <td>{item.userCall}</td>
                          <td>{item.rsvComeDatetime || ''}</td>
                          <td>{item.rsvCancelDatetime || ''}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                      <td colSpan="7" className="text-center">검색 결과가 없습니다.</td>
                    </tr>
                )}
                </tbody>
              </table>
            </div>

            {/* ✅ 페이지네이션 버튼 */}
            <div className="d-flex justify-content-center my-4">
              {renderPagination()}
            </div>
          </div>
        </div>
      </>
  );
}

export default PastDateReservation;
