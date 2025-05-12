import ReBanner from "./ReBanner.jsx";
import {Link} from "react-router-dom";
import {DayPicker} from "react-day-picker";
import {Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useEffect, useState} from "react";
import axios from "axios";

function PreGenderCh() {

    const [genderData, setGenderData] = useState([]);
    const [originData, setOriginData] = useState({ totalMan: 0, totalWoman: 0, totalPeople: 0, totalBaby: 0 });

    // 달력
    const today = new Date();
    const [seDay, setSeDay] = useState({ from: today, to: today });
    const [yetDay, setYetDay] = useState({ from: today, to: today });
    const [cal, setCal] = useState(false);

    // 페이지 로딩
    const [loading, setLoading] = useState(false);

    // 날짜 형식 변경
    const formatDate = (date) => {
        if (!date) return '';
        return date.toISOString().split('T')[0];
    };

    // 데이터 불러오기
    const fetchData = async () => {
        if (!seDay.from || !seDay.to) return;

        setLoading(true);
        try{
            const response = await axios.get("http://localhost:8080/api/history/visitors", {
                params: {
                    startDate: formatDate(seDay.from),
                    endDate: formatDate(seDay.to),
                    resIdx: 1
                }
            });
            const data = response.data;

        //     차트용 데이터
            const chartData = [
                { name: '남성', value: data.totalMan || 0 },
                { name: '여성', value: data.totalWoman || 0 },
                { name: '유아', value: data.totalBaby || 0 },
            ];
            setGenderData(chartData);

            // 표용 원본 데이터 저장
            setOriginData({
                totalMan: data.totalMan || 0,
                totalWoman: data.totalWoman || 0,
                totalBaby: data.totalBaby || 0,
                totalPeople: data.totalPeople || 0
            });
        }
        catch (error) {
            console.error("성별 데이터 불러오기 실패", error);
        }
        setLoading(false);
    }

    // 컴포넌트 마운트 시 데이터 가져오기
    useEffect(() => {
        fetchData();  // 컴포넌트가 처음 렌더링 될 때 호출
    }, [seDay]);  // 날짜 선택 될때마다 다시 렌더링

    const COLORS = ['#2a89dc', '#ff4b4b', '#09af5b'];

    return (
        <>
            <ReBanner />
            <div>
                <div>
                    <div className={'d-flex align-items-center gap-3 flex-wrap mb-4'}>
                        <h2 className={'waiting-chart-title ms-3'}>방문자 성별</h2>
                        <hr/>
                        <div
                            className={'date-box d-flex align-items-center justify-content-center ms-3'}
                            style={{width: '300px', position: 'relative', cursor: 'pointer'}}
                            onClick={() => {
                                setCal(true);
                                setYetDay(seDay);
                            }}
                        >
                            <p style={{margin: 0}}>
                                {seDay.from && seDay.to ? `${formatDate(seDay.from)} ~ ${formatDate(seDay.to)}` : '날짜 선택'}
                            </p>
                            {cal && (
                                <div className={'calendar-popup'} onClick={(e) => e.stopPropagation()}>
                                    <DayPicker
                                        mode="range"
                                        selected={yetDay}
                                        onSelect={setYetDay}
                                        pagedNavigation
                                    />
                                    <div className="d-flex justify-content-end mt-3" style={{gap: '10px'}}>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCal(false);
                                            }}
                                        >
                                            취소
                                        </button>
                                        <button
                                            className="btn btn-primary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSeDay(yetDay);
                                                setCal(false);
                                            }}
                                        >
                                            확인
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <hr/>

                {/* 성별 원형 차트 */}
                <div className={'d-flex gap-4 justify-content-center align-items-center mb-5 flex-wrap'}>
                    <div style={{ flex: 4, minWidth: '250px' }}>
                        {loading ? (
                            <p className={'text-center'}>로딩 중...<br/>잠시만 기다려 주세요</p>
                        ) : (
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
                        )}
                    </div>
                    <div style={{ flex: 3, minWidth: '250px' }}>
                        <div className={'mb-3 p-3 bg-light rounded d-flex justify-content-between align-items-center'}>
                            <h5 className={'mb-0'}>총 방문자</h5>
                            <h3 className={'mb-0'} style={{ color: '#FFCD83' }}>
                                {originData.totalPeople}명
                            </h3>
                        </div>
                        {!loading && (
                            <table
                                className={'table table-bordered table-sm text-center'}
                                style={{ tableLayout: 'fixed', width: '100%', fontSize: '14px' }}
                            >
                                <thead>
                                    <tr>
                                        <th>구분</th>
                                        <th>인원수</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>남성</td>
                                        <td>{originData.totalMan}명</td>
                                    </tr>
                                    <tr>
                                        <td>여성</td>
                                        <td>{originData.totalWoman}명</td>
                                    </tr>
                                    <tr>
                                        <td>유아</td>
                                        <td>{originData.totalBaby}명</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
export default PreGenderCh