import {useState} from "react";
import Banner from "../KimSangMin/Banner.jsx";
import {DayPicker} from "react-day-picker";
import './ReservationChart.css';
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

function ReservationChart() {

    const [dateRange, setDateRange] = useState({from: undefined, to: undefined});
    const [showCalendar, setShowCalendar] = useState(false);
    // 더미 데이터
    const waitingCountData = [
        { time: '10시', count: 5 },
        { time: '11시', count: 8 },
        { time: '12시', count: 12 },
        { time: '13시', count: 7 },
    ];

    const waitingTimeData = [
        { time: '10시', minutes: 15 },
        { time: '11시', minutes: 20 },
        { time: '12시', minutes: 30 },
        { time: '13시', minutes: 18 },
    ];

    const genderData = [
        { name: '남성', value: 60 },
        { name: '여성', value: 40 },
    ];
    const COLORS = ['#0088FE', '#FF69B4'];

    return (
        <div className={'ceo-main'}>
            <Banner />
            <div style={{ marginTop: '10vh', marginLeft: '200px', position: 'relative' }}>
            {/*    날짜 선택 */}
                <div className="mb-4 position-relative">
                    <button className="btn btn-outline-primary" onClick={() => setShowCalendar(!showCalendar)}>
                        {dateRange.from && dateRange.to
                            ? `${dateRange.from.toLocaleDateString()} ~ ${dateRange.to.toLocaleDateString()}`
                            : '날짜 선택'}
                    </button>

                    {showCalendar && (
                        <div className="re-chart-calendar-popup mt-2 p-3 bg-white border rounded shadow position-absolute">
                            <DayPicker
                                mode="range"
                                selected={dateRange}
                                onSelect={setDateRange}
                                pagedNavigation
                            />
                            <div className="d-flex justify-content-end gap-2 mt-2">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowCalendar(false)}>취소</button>
                                <button className="btn btn-primary btn-sm" onClick={() => setShowCalendar(false)}>확인</button>
                            </div>
                        </div>
                    )}
                </div>
            {/*    시간대별 웨이팅 수 */}
                <h4 className={'mb-3'}>시간대별 웨이팅 수</h4>
                <div className={'chart-box mb-5'}>
                    <ResponsiveContainer width={'100%'} height={300}>
                        <BarChart data={waitingCountData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#007bff" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            {/*    시간대별 웨이팅 시간 */}
                <h4 className={'mb-3'}>시간대별 웨이팅 시간(분)</h4>
                <div className={'chart-box mb-5'}>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={waitingTimeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="minutes" stroke="#28a745" />
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