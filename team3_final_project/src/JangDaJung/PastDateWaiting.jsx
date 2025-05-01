import WaBanner from "../KimSangMin/WaBanner.jsx";
import {useState} from "react";

import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import './PastDateWating.css';
import {DayPicker} from "react-day-picker";

function PastDateWaiting() {
    // 예약 리스트 (더미데이터)
    const pastWaitings = [
        {
            id: 1,
            status: '완료',
            name: '장다정',
            phone: '010-1234-5678',
            people: 4,
            entryDate: '2024-05-01 18:00',
            applicationDate: '2024-04-28 14:00',
            completedDate: '2024-05-01 19:00',
            cancelDate: '2024-05-01 19:00',
        },
        {
            id: 2,
            status: '신청',
            name: '장다정',
            phone: '010-9876-5432',
            people: 2,
            entryDate: '2024-05-02 19:00',
            applicationDate: '2024-04-30 10:00',
            completedDate: '',
            cancelDate: '',
        },
        {
            id: 3,
            status: '취소',
            name: '장다정',
            phone: '010-0000-0000',
            people: 2,
            entryDate: '2024-05-02 19:00',
            applicationDate: '2024-04-30 10:00',
            completedDate: '',
            cancelDate: '',
        },
    ];
    // 예약 상태에 따라 색상 변경
    const getStatusColor = (status) => {
        if (status === '완료') return 'status-done text-white status-box';
        if (status === '신청') return 'status-request text-white status-box';
        if (status === '취소') return 'status-cancel text-white status-box';
        return '';
    };

    // 검색창 드롭다운(이름, 전화번호)
    const [searchType, setSearchType] = useState('name'); // 검색 조건
    const [searchQuery, setSearchQuery] = useState(''); // 사용자가 입력한 검색어
    const [searchKeyword, setSearchKeyword] = useState('');

    // 리스트 예약상태 기준 드롭다운
    const [statusFilter, setStatusFilter] = useState('예약상태');

    // 날짜 선택 달력
    // 현재 적용된 날짜 범위
    const [waitingConfirmedRange, setWaitingConfirmedRange] = useState({ from: undefined, to: undefined });
    // 임시로 선택 중인 범위
    const [waitingTempRange, setWaitingTempRange] = useState({ from: undefined, to: undefined });
    const [showCalendar, setShowCalendar] = useState(false);

    // 날짜를 "YYYY.MM.DD" 형식으로 변환하는 함수
    const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('ko-KR').replace(/\./g, '').replace(/ /g, '.');
    };

    // 검색 조건 필터링
    const filteredData = pastWaitings.filter(item => {
        const matchesSearch =
            searchKeyword === '' || // 검색어 없으면 통과
            (searchType === 'name' && item.name.includes(searchKeyword)) ||
            (searchType === 'phone' && item.phone.includes(searchKeyword));

        const matchesStatus =
            statusFilter === '예약상태' || item.status === statusFilter;

        // 날짜 필터링 (entryDate 기준)
        const matchesDate = (() => {
            if (!waitingConfirmedRange.from || !waitingConfirmedRange.to) return true;
            const entry = new Date(item.entryDate);
            return entry >= waitingConfirmedRange.from && entry <= waitingConfirmedRange.to;
        })();

        return matchesSearch && matchesStatus && matchesDate;
    });

    const handleSearchButtonClick = () => {
        setSearchKeyword(searchQuery); // 검색 버튼 누르면 확정
    };

    return (
        <div className={'ceo-main'}>
            <WaBanner />
            <div className={'date-range-container'}  style={{ marginTop: '10vh', marginLeft: '200px' }}>
                <h2 className={'past-waiting-title mb-4'}>웨이팅 내역</h2>
                <hr />
                <div className={'d-flex align-items-center justify-content-center gap-3 mt-4'}>
                    {/*    날짜 범위 표시 */}
                    <div
                        className={'date-box d-flex align-items-center justify-content-center'}
                        style={{ width: '300px', position: 'relative' }}
                        onClick={() => {
                            setShowCalendar(true);
                            setWaitingTempRange(waitingConfirmedRange) // 열 때는 현재 적용된 값으로 세팅
                        }}
                    >
                        <p style={{ margin: 0 }}>
                            {waitingConfirmedRange.from && waitingConfirmedRange.to
                                ? `${formatDate(waitingConfirmedRange.from)} ~ ${formatDate(waitingConfirmedRange.to)}`
                                : '날짜 선택'}
                        </p>
                        {/* 달력 */}
                        {showCalendar && (
                            <div className={'calendar-popup'}
                                 onClick={(e) => e.stopPropagation()}
                            >
                                <DayPicker
                                    mode="range"
                                    selected={waitingTempRange}
                                    onSelect={setWaitingTempRange}
                                    pagedNavigation
                                />
                                <div className="d-flex justify-content-end mt-3" style={{ gap: '10px' }}>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowCalendar(false)}}>취소</button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setWaitingConfirmedRange(waitingTempRange); // 최종 확정
                                            setShowCalendar(false);
                                        }}
                                    >
                                        확인
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/*    검색창 */}
                    <div className={'search-box d-flex align-items-center'} style={{ borderRadius: '10px', overflow: 'hidden', width: '500px', paddingRight: '5px' }}>
                        <select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            className={'form-select text-center'}
                            style={{ border: 'none', width: '30%', borderRadius: '0', margin: '0.3vw', height: '100%' }}
                        >
                            <option value="name">예약자명</option>
                            <option value="phone">예약자 전화번호</option>
                        </select>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={'검색어를 입력하세요'}
                            className={'form-control'}
                            style={{ border: 'none', width: '70%', height: '100%' }}
                        />
                        <button className="btn" style={{ height: '3.5vw', whiteSpace: 'nowrap' }} onClick={handleSearchButtonClick}>검색</button>
                    </div>
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={'form-select text-center status-select mt-4'}
                    style={{ border: 'none', borderRadius: '0', height: '100%' }}
                >
                    <option value="예약상태">예약상태</option>
                    <option value="신청">신청</option>
                    <option value="완료">완료</option>
                    <option value="취소">취소</option>
                </select>
                {/*    리스트 출력부분 */}
                <div className={'mt-2'}>
                    <div className={'table-responsive'} style={{ overflowX: 'auto' }}>
                        <table className={'table me-3'} style={{ tableLayout: 'fixed', width: '100%' }}>
                            <colgroup>
                                <col style={{ width: '8%' }} />
                                <col style={{ width: '6%'}} />
                                <col style={{ width: '7%' }} />
                                <col style={{ width: '5%' }} />
                                <col style={{ width: '14%' }} />
                                <col style={{ width: '15%' }} />
                                <col style={{ width: '15%' }} />
                                <col style={{ width: '15%' }} />
                                <col style={{ width: '15%' }} />
                            </colgroup>
                            <thead className={'thead-light'}>
                            <tr>
                                <th>상태</th>
                                <th>이용일</th>
                                <th>예약자</th>
                                <th>인원</th>
                                <th>전화번호</th>
                                <th>신청일시</th>
                                <th>입장일시</th>
                                <th>완료일시</th>
                                <th>취소일시</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <div className={getStatusColor(item.status)}>{item.status}</div>
                                        </td>
                                        <td>{item.entryDate ? format(new Date(item.entryDate), 'MM.dd') : ''}</td>
                                        <td>{item.name}</td>
                                        <td>{item.people}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.applicationDate}</td>
                                        <td>{item.entryDate}</td>
                                        <td>{item.completedDate || ''}</td>
                                        <td>{item.cancelDate || ''}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">
                                        검색 결과가 없습니다.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PastDateWaiting