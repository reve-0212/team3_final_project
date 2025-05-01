import {useState} from "react";
import WaBanner from "../KimSangMin/WaBanner.jsx";
import './TodayReservation.css'

function TodayReservation() {
  const [tab, setTab] = useState('current');
  const [reservationList, setReservationList] = useState([
    { id: 1, name: '홍길동', people: 2, phone: '010-1234-5678', visits: 3, status: '신청', date: '2025-04-30 14:30'},
    { id: 2, name: '김철수', people: 4, phone: '010-9876-5432', visits: 1, status: '완료', date: '2025-04-30 14:30'},
    { id: 3, name: '이영희', people: 1, phone: '010-0000-0000', visits: 2, status: '취소', date: '2025-04-30 14:30'},
    { id: 4, name: '홍길동', people: 2, phone: '010-1234-5678', visits: 3, status: '신청', date: '2025-04-30 15:30'},
    { id: 5, name: '김철수', people: 4, phone: '010-9876-5432', visits: 1, status: '완료', date: '2025-04-30 15:30'},
    { id: 6, name: '이영희', people: 1, phone: '010-0000-0000', visits: 2, status: '취소', date: '2025-04-30 15:30'},
    { id: 7, name: '홍길동', people: 2, phone: '010-1234-5678', visits: 3, status: '신청', date: '2025-04-30 15:30'},
    { id: 8, name: '김철수', people: 4, phone: '010-9876-5432', visits: 1, status: '완료', date: '2025-04-30 16:30'},
    { id: 9, name: '이영희', people: 1, phone: '010-0000-0000', visits: 2, status: '취소', date: '2025-04-30 16:30'},
    { id: 10, name: '홍길동', people: 2, phone: '010-1234-5678', visits: 3, status: '신청', date: '2025-04-30 16:30'},
    { id: 11, name: '김철수', people: 4, phone: '010-9876-5432', visits: 1, status: '완료', date: '2025-04-30 16:30'},
    { id: 12, name: '이영희', people: 1, phone: '010-0000-0000', visits: 2, status: '취소', date: '2025-04-30 17:30'},
  ]);

  const handleStatusChange = (id, newStatus) => {
    setReservationList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status:newStatus } : item))
    );
  };

  const filteredList = reservationList.filter((item) => {
    if (tab === 'current') return item.status === '신청';
    if (tab === 'past') return item.status === '완료';
    if (tab === 'canceled') return item.status === '취소';
    return false;
  });

  return (
      <div className={'ceo-main'}>
        <WaBanner />
        <div style={{ marginTop: '10vh', marginLeft: '200px', position: 'relative'}}>
          <h2 className={'today-waiting-title mb-4'}>오늘의 예약</h2>
          <hr />
          {/*    탭 */}
          <div className={'d-flex flex-wrap gap-3 mb-4 justify-content-center'}>
            <button
                className={`custom-tab-btn ${tab === 'current' ? 'active' : ''}`}
                onClick={() => setTab('current')}
            >
              현재 예약
            </button>
            <button
                className={`custom-tab-btn ${tab === 'past' ? 'active' : ''}`}
                onClick={() => setTab('past')}
            >
              지난 예약
            </button>
            <button
                className={`custom-tab-btn ${tab === 'canceled' ? 'active' : ''}`}
                onClick={() => setTab('canceled')}
            >
              취소 예약
            </button>
          </div>
          {/*    리스트 */}
          <div className={'table-responsive'}>
            <table className={'table text-center align-middle table-background'}>
              <colgroup>
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%'}} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '10%' }} />
              </colgroup>
              <thead className={'table-light'}>
              <tr>
                <th>번호</th>
                <th>이름</th>
                <th>인원수</th>
                <th>전화번호</th>
                <th>예약정보</th>
                <th>방문횟수</th>
                {tab === 'current' && <th>동작</th>}
              </tr>
              </thead>
              <tbody style={{backgroundColor: '#f5f5f5'}}>
              {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={tab === 'current' ? 6 : 5}>등록된 웨이팅이 없습니다.</td>
                  </tr>
              ) : (
                  filteredList.map((item) => (
                      <tr key={item.id}>
                        <td>No. {item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.people}</td>
                        <td>{item.phone}</td>
                        <td>{item.date}</td>
                        <td>{item.visits}</td>
                        {tab === 'current' && (
                            <td>
                              <div className="d-flex flex-wrap justify-content-center gap-2">
                                <button className="ceo-btn btn-sm btn-done" onClick={() => handleStatusChange(item.id, '완료')}>
                                  완료
                                </button>
                                <button className="ceo-btn btn-sm btn-cancel" onClick={() => handleStatusChange(item.id, '취소')}>
                                  취소
                                </button>
                              </div>
                            </td>
                        )}
                      </tr>
                  ))
              )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
  );
}

export default TodayReservation;