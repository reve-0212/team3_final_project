import {useState} from "react";
import WaBanner from "../KimSangMin/WaBanner.jsx";
import {DayPicker} from "react-day-picker";
import './css/ReservationChart.css';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart, Pie, PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {formatting} from "suneditor-react/dist/buttons/buttonList.js";

function ReservationChart() {
    // 더미 데이터
    const waitingCountData = [
        { time: '10시', count: 5, date: '2025-05-01' },
        { time: '11시', count: 8, date: '2025-05-01' },
        { time: '12시', count: 12, date: '2025-05-02' },
        { time: '13시', count: 7, date: '2025-05-02' },
    ];

    const waitingTimeData = [
        { time: '10시', minutes: 15, date: '2025-05-01' },
        { time: '11시', minutes: 20, date: '2025-05-01' },
        { time: '12시', minutes: 30, date: '2025-05-02' },
        { time: '13시', minutes: 18, date: '2025-05-02' },
    ];

    const genderData = [
        { name: '남성', value: 60 },
        { name: '여성', value: 40 },
    ];

    // 그래프 출력 시간대
    const timeSlots = ['9시', '10시', '11시', '12시', '13시', '14시', '15시', '16시', '17시', '18시', '19시'];

    // 달력
    // 적용 날짜
    const [waitingChartConfirmRange, setWaitingChartConfirmRange] = useState({ from: undefined, to: undefined });
    //  임시 선택중 날짜
    const [waitingChartTempRange, setWaitingChartTempRange] = useState({ from: undefined, to: undefined });
    // 달력 보여주는 함수
    const [showCalendar, setShowCalendar] = useState(false);

    // 날짜를 "YYYY.MM.DD" 형식으로 변환하는 함수
    const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('ko-KR').replace(/\./g, '').replace(/ /g, '.');
    };

    // 날짜 필터 후 시간대별 데이터 정리 (값 없으면 count 0)
    const filteredCountData = timeSlots.map(time => {
        const matched =waitingCountData.find(item => {
            if (item.time !== time) return false;
            if (!waitingChartConfirmRange.from || !waitingChartConfirmRange.to) return true;

            const itemDate = new Date(item.date);
            // to 날짜는 포함시키기 위해 하루 더해줌
            const fromDate = new Date(waitingChartConfirmRange.from);
            const toDate = new Date(waitingChartConfirmRange.to);
            toDate.setDate(toDate.getDate() + 1);

            return itemDate >= fromDate && itemDate < toDate;
        });
        return {
            time,
            count: matched ? matched.count : 0 // 없으면 0으로 처리
        };
    });

    const filteredTimeData = timeSlots.map(time => {
        const matched = waitingTimeData.find(item => {
            if (item.time !== time) return false;

            if (!waitingChartConfirmRange.from || !waitingChartConfirmRange.to) return true;

            const itemDate = new Date(item.date);
            const fromDate = new Date(waitingChartConfirmRange.from);
            const toDate = new Date(waitingChartConfirmRange.to);
            toDate.setDate(toDate.getDate() + 1);

            return itemDate >= fromDate && itemDate < toDate;
        });
        return {
            time,
            minutes: matched ? matched.minutes : 0
        };
    });

    const COLORS = ['#0088FE', '#FF69B4'];

    return (
        <div className={'ceo-main'}>
            <WaBanner />
            <div style={{ marginTop: '10vh', marginLeft: '200px', position: 'relative' }}>
                <div className={'d-flex align-items-center gap-3 flex-wrap mb-4'}>
                    <h2 className={'waiting-chart-title'}>가계 통계</h2>
                    <hr />
                    {/*    날짜 범위 표시*/}
                        <div
                            className={'date-box d-flex align-items-center justify-content-center ms-3'}
                            style={{ width: '300px', position: 'relative', cursor: 'pointer' }}
                            onClick={() => {
                                setShowCalendar(true);
                                setWaitingChartTempRange(waitingChartConfirmRange)
                            }}
                        >
                            <p style={{ margin: 0 }}>
                                {waitingChartConfirmRange.from && waitingChartConfirmRange.to ? `${formatDate(waitingChartConfirmRange.from)} ~ ${formatDate(waitingChartConfirmRange.to)}` : '날짜 선택'}
                            </p>
                        {/*    달력 */}
                            {showCalendar && (
                                <div className={'calendar-popup'}
                                     onClick={(e) => e.stopPropagation()}
                                    >
                                    <DayPicker
                                        mode="range"
                                        selected={waitingChartTempRange}
                                        onSelect={setWaitingChartTempRange}
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
                                                setWaitingChartConfirmRange(waitingChartTempRange); // 최종 확정
                                                setShowCalendar(false);
                                            }}
                                        >
                                            확인
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                </div>
                <hr />

                        {/*    시간대별 웨이팅 수 */}
                <h4 className={'mt-5 mb-3'}>시간대별 웨이팅 수</h4>
                <div className={'d-flex gap-4 justify-content-center align-items-center mb-5 flex-wrap'}>
                {/*    왼쪽 그래프*/}
                    <div style={{ flex: 4, minWidth: '300px' }}>
                        <ResponsiveContainer width={'100%'} height={250}>
                            <BarChart data={filteredCountData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis />
                                <Tooltip contentStyle={{ backgroundColor: '#FFF8E1', border: 'none' }}
                                         itemStyle={{ color: '#5D4037' }} // 툴팁 텍스트 색
                                         cursor={{ fill: 'transparent' }}
                                />
                                <Bar dataKey={"count"} fill={'#FFCD83'} barSize={25} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                {/*    오르쪽 표*/}
                    <div style={{ flex: 3, minWidth: '200px' }}>
                    {/*    총 인원수*/}
                        <div className={'mb-3 p-3 bg-light rounded d-flex justify-content-between align-items-center'}>
                            <h5 className={'mb-0'}>총 이용객 수</h5>
                            <h3 className={'mb-0'} style={{ color: '#FFCD83'}}>
                                {filteredCountData.reduce((sum, item) => sum + (item.count || 0), 0)}명
                            </h3>
                        </div>
                    {/*    표*/}
                        <table
                            className={'table table-bordered table-sm text-center'}
                            style={{ tableLayout: 'fixed', width: '100%', fontSize: '14px' }}
                        >
                            <thead>
                            <tr>
                                <th style={{ width: '25%', padding: '6px' }}>시간</th>
                                <th style={{ width: '25%', padding: '6px' }}>인원수</th>
                                <th style={{ width: '25%', padding: '6px' }}>시간</th>
                                <th style={{ width: '25%', padding: '6px' }}>인원수</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Array.from({ length: 6 }).map((_, idx) => {
                                const leftSlot = timeSlots[idx];
                                const rightSlot = timeSlots[idx + 6];

                                const leftData = filteredCountData.find(item => item.time === leftSlot);
                                const rightData = filteredCountData.find(item => item.time === rightSlot);

                                return (
                                    <tr key={idx}>
                                        <td style={{ width: '25%', padding: '6px' }}>{leftSlot}</td>
                                        <td style={{ width: '25%', padding: '6px' }}>{leftData ? leftData.count : 0}명</td>
                                        <td style={{ width: '25%', padding: '6px' }}>{rightSlot}</td>
                                        <td style={{ width: '25%', padding: '6px' }}>{rightData ? rightData.count : 0}명</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>



            {/*    시간대별 웨이팅 시간 */}
                <h4 className={'mb-3'}>시간대별 웨이팅 시간(분)</h4>
                <div className={'chart-box mb-5'}>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={filteredTimeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="minutes" stroke="#5a3a2e" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                {/*    성별 통계*/}
                <h4 className={'mb-3'}>방문 성별</h4>
                <div className="chart-box mb-5 d-flex justify-content-center">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={genderData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                dataKey="value"
                                label
                            >
                                {genderData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ReservationChart