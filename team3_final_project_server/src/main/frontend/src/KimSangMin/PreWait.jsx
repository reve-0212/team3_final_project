import { useState } from "react";
import './css/PreWait.css';

function PreWait() {
    const [tab, setTab] = useState('current');
    const [waitingList, setWaitingList] = useState([
        { id: 1, name: '홍길동', people: 2, phone: '010-1234-5678', time: '16:33', status: '신청', called: false },
        { id: 2, name: '김철수', people: 4, phone: '010-9876-5432', time: '17:44', status: '완료', called: false },
        { id: 3, name: '홍길동', people: 2, phone: '010-1234-5678', time: '18:33', status: '신청', called: false },
        { id: 4, name: '홍길동', people: 2, phone: '010-1234-5678', time: '19:33', status: '신청', called: false },
        { id: 5, name: '홍길동', people: 2, phone: '010-1234-5678', time: '19:35', status: '신청', called: false },
        { id: 6, name: '홍길동', people: 2, phone: '010-1234-5678', time: '19:44', status: '신청', called: false },
        { id: 7, name: '홍길동', people: 2, phone: '010-1234-5678', time: '20:33', status: '신청', called: false },
        { id: 8, name: '홍길동', people: 2, phone: '010-1234-5678', time: '21:23', status: '신청', called: false },
        { id: 9, name: '이영희', people: 1, phone: '010-0000-0000', time: '21:30', status: '취소', called: false },
    ]);

    const handleStatusChange = (id, newStatus) => {
        setWaitingList((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
    };

    const handleCall = (id) => {
        setWaitingList((prev) =>
            prev.map((item) => (item.id === id ? { ...item, called: true } : item))
        );
    };

    const filteredList = waitingList.filter((item) => {
        if (tab === 'current') return item.status === '신청';
        if (tab === 'past') return item.status === '완료';
        if (tab === 'canceled') return item.status === '취소';
        return false;
    });

    return (
        <div className="app-container">
            <h2 className="app-title">오늘의 웨이팅</h2>

            {/* 탭 */}
            <div className="app-tabs">
                <button
                    className={`app-tab-btn ${tab === 'current' ? 'active' : ''}`}
                    onClick={() => setTab('current')}
                >
                    현재
                </button>
                <button
                    className={`app-tab-btn ${tab === 'past' ? 'active' : ''}`}
                    onClick={() => setTab('past')}
                >
                    지난
                </button>
                <button
                    className={`app-tab-btn ${tab === 'canceled' ? 'active' : ''}`}
                    onClick={() => setTab('canceled')}
                >
                    취소
                </button>
            </div>

            {/* 리스트 */}
            <div className="table-container">
                <table className="waiting-table">
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>인원</th>
                        <th>전화</th>
                        <th>시간</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredList.length === 0 ? (
                        <tr>
                            <td colSpan="5">등록된 웨이팅이 없습니다.</td>
                        </tr>
                    ) : (
                        filteredList.map((item) => (
                            <>
                                <tr key={item.id}>
                                    <td>No. {item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.people}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.time}</td>
                                </tr>
                                {tab === 'current' && (
                                    <tr>
                                        <td colSpan="5">
                                            <div className="action-buttons-row">
                                                <button
                                                    className="btn call"
                                                    onClick={() => handleCall(item.id)}
                                                    disabled={item.called}
                                                >
                                                    {item.called ? '호출됨' : '호출'}
                                                </button>
                                                <button
                                                    className="btn done"
                                                    onClick={() => handleStatusChange(item.id, '완료')}
                                                >
                                                    완료
                                                </button>
                                                <button
                                                    className="btn cancel"
                                                    onClick={() => handleStatusChange(item.id, '취소')}
                                                >
                                                    취소
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PreWait;
