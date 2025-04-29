import Banner from "../KimSangMin/Banner.jsx";
import {useRef, useState} from "react";
import {DayPicker} from "react-day-picker";
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import './PastDateWating.css';

function PastDateWaiting() {
    const today = new Date();
    const [range, setRange] = useState({from: today, to: today });
    const [isCalendarVisible, setIsCalendarVisible] = useState(false); // 달력 UI 표시 여부
    const dateBoxRef = useRef(null); // 날짜 박스를 참조할 ref(날짜 박스 바로 밑에 달력 표시 위해서)

    // 검색창 드롭다운(이름, 전화번호)
    const [searchType, setSearchType] = useState('name'); // 검색 조건
    const [searchQuery, setSearchQuery] = useState(''); // 사용자가 입력한 검색어
    const [searchKeyword, setSearchKeyword] = useState('');

    // 예약 리스트 (더미데이터)
    const reservations = [
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

    // const handleSearchChange = (e) => {
    //     setSearchQuery(e.target.value);
    // };
    // const handleSearchTypeChange = (e) => {
    //     setSearchType(e.target.value);
    // };

    // 예약 상태에 따라 색상 변경
    const getStatusColor = (status) => {
        if (status === '완료') return 'status-done text-white status-box';
        if (status === '신청') return 'status-request text-white status-box';
        if (status === '취소') return 'status-cancel text-white status-box';
        return '';
    };

    // 검색 조건 필터링
    const filteredData = reservations.filter(item => {
        if (searchKeyword === '') return true; // 검색어 없으면 전체 표시
        if (searchType === 'name') {
            return item.name.includes(searchKeyword);
        } else if (searchType === 'phone') {
            return item.phone.includes(searchKeyword);
        }
        return true;
    });

    const handleSearchButtonClick = () => {
        setSearchKeyword(searchQuery); // 검색 버튼 누르면 확정
    };

    // 날짜 범위 업데이트
    const handleDateSelect = (selectedDate) => {
        if (!range.from || (range.from && range.to)) {
            // 시작일을 선택하면, 종료일은 선택되지 않은 상태로 초기화
            setRange({ from: selectedDate, to: undefined });
        }
        else {
        //     종료일 선택
            if (selectedDate < range.from) {
                setRange({ from: selectedDate, to: range.from });
            }
            else {
                setRange((prevRange) => ({
                    ...prevRange,
                    to: selectedDate,
                }));
            }
        }
    };
    // 날짜 확인 후 달력 닫기
    const handleConfirmDate = () => {
        setIsCalendarVisible(false); // 날짜 확인 후 달력 숨기기
    };
    // 날짜 형식 변환
    const formatDate = (date) => format(date, 'yy.MM.dd');

    // 날짜 표시 div 위치 계산
    const getCalendarPosition = () => {
        if(dateBoxRef.current) {
            const { left, height } = dateBoxRef.current.getBoundingClientRect();
            return {
                left: left,
                top: height + window.scrollY, // 달력을 박스 바로 밑에 위치시키기 위해 top 조정
            };
        }
        return { left: 0, top: 0 };
    };

    return (
        <div>
            <Banner />
            <div className={'date-range-container'}  style={{ marginTop: '10vh', marginLeft: '200px' }} ref={dateBoxRef}>
                <h2 className={'title mb-4'}>웨이팅 내역</h2><hr />
                <div className={'d-flex align-items-center gap-3'}>
                {/*    날짜 범위 표시 */}
                    <div
                        className={'date-box d-flex align-items-center justify-content-center'}
                        style={{ width: '300px' }}
                        onClick={() => setIsCalendarVisible(true)}
                        // style={{ padding: '8px 16px' }}
                    >
                        <p style={{ marginBottom: '0px' }}>
                            {formatDate(range.from)} ~ {range.to ? formatDate(range.to) : formatDate(range.from)}
                        </p>
                    </div>
                {/*    검색창 */}
                    <div className={'d-flex align-items-center border'} style={{ borderRadius: '10px', overflow: 'hidden', width: '500px', paddingRight: '5px' }}>
                        <select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            className={'form-select text-center'}
                            style={{ border: 'none', width: '30%', borderRight: '1px solid #ced4da', borderRadius: '0', margin: '0.3vw', height: '100%' }}
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
                        <button className="btn btn-primary" style={{ height: '40px', whiteSpace: 'nowrap' }} onClick={handleSearchButtonClick}>검색</button>
                    </div>

                </div>
                {/* 달력 UI 표시/숨기기 */}
                {isCalendarVisible && (
                    <div
                        className="calendar-popup"
                        style={{
                            left: getCalendarPosition().left, // 동적으로 left 값 설정
                            top: getCalendarPosition().top,   // 동적으로 top 값 설정
                        }}>
                        <DayPicker
                            selected={range}
                            onDayClick={handleDateSelect}
                            modifiers={{
                                range: (date) => range.from && range.to && date >= range.from && date <= range.to,
                            }}
                            modifiersClassNames={{
                                range: 'selected-range', // 날짜 범위에 바 표시
                                from: 'selected-from', // 시작 날짜 원형 표시
                                to: 'selected-to', // 끝 날짜 원형 표시
                            }}
                        />
                        <div>
                            <button onClick={handleConfirmDate} style={{ marginTop: '10px' }}>
                                확인
                            </button>
                        </div>
                    </div>
                )}
            {/*    리스트 출력부분 */}
                <div className={'mt-4'}>
                    <div className={'table-responsive'} style={{ overflowX: 'auto' }}>
                        <table className={'table me-3'} style={{ tableLayout: 'fixed', width: '100%' }}>
                            <colgroup>
                                <col style={{ width: '5%' }} />
                                <col style={{ width: '7%' }} />
                                <col style={{ width: '5%' }} />
                                <col style={{ width: '14%' }} />
                                <col />
                                <col />
                                <col />
                                <col />
                            </colgroup>
                            <thead className={'thead-light'}>
                                <tr>
                                    <th>상태</th>
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
                                    <td colSpan="8" className="text-center">
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