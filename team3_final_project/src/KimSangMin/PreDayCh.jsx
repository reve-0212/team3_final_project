import {useEffect, useState} from "react";
import { DayPicker } from "react-day-picker";
import './css/PreDay.css';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import ReBanner from "../KimSangMin/ReBanner.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

function PreDayCh() {

    const timeSlots = ['9시', '10시', '11시', '12시', '13시', '14시', '15시', '16시', '17시', '18시', '19시'];

    const [chartData, setChartData] = useState([]);

    // 달력
    const today = new Date();
    const [seDay, setSeDay] = useState({ from: today, to: today });
    const [yetDay, setYetDay] = useState({ from: today, to: today });
    const [cal, setCal] = useState(false);

    // 페이지 로딩
    const [loading, setLoading] = useState(false);

    const formatDate = (date) => {
        if (!date) return '';
        return date.toISOString().split('T')[0];
    };

    // const isInRange = (dateStr, from, to) => {
    //     const d = new Date(dateStr);
    //     return (!from || d >= from) && (!to || d <= to);
    // };

    const fetchData = async () => {
        if (!seDay.from || !seDay.to) return;

        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/history/reservation/hour', {
                params: {
                    startDate: formatDate(seDay.from),
                    endDate: formatDate(seDay.to),
                    resIdx: 1
                }
            });
            // 받아온 데이터 시간대 맞게정렬
            const raw = response.data;

            // 시간 포맷 맞추기(11:00)
            const formatted = timeSlots.map(slot => {
                const hour = parseInt(slot.split(':')[0]); // 09:00 ➔ 9
                const found = raw.find(item => item.hour === hour);
                return {
                    time: slot,
                    visitorCount: found ? found.visitorCount : 0,
                    teamCount: found ? found.teamCount : 0
                };
            });
            //   응답받은 데이터 상태ㅐ에 저장
            setChartData(formatted);
        }
        catch (error) {
            console.error("시간대별 예약 가져오기 실패", error);
        }
        setLoading(false);
    };

    // 컴포넌트 마운트 시 데이터 가져오기
    useEffect(() => {
        fetchData();  // 컴포넌트가 처음 렌더링 될 때 호출
    }, [seDay]);  // 빈 배열을 두 번째 인자로 주면 한 번만 호출됨

  return (
      <>
        <ReBanner />
        <div>
          <div>
            <div className={'d-flex align-items-center gap-3 flex-wrap mb-4'}>
              <h2 className={'waiting-chart-title ms-3'}>시간대별 예약수</h2>
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

            <div className={'d-flex gap-4 justify-content-center align-items-center mb-5 flex-wrap'}>
              <div style={{ flex: 4, minWidth: '300px' }}>
                {loading ? (
                  <p className={'text-center'}>로딩 중...<br/>잠시만 기다려 주세요</p>
                ) : (
                  <ResponsiveContainer width={'100%'} height={250}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip contentStyle={{ backgroundColor: '#FFF8E1', border: 'none' }} itemStyle={{ color: '#5D4037' }} cursor={{ fill: 'transparent' }} />
                      <Bar dataKey={"teamCount"} fill={'#FFCD83'} barSize={25} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div style={{ flex: 3, minWidth: '200px' }}>
                <div className={'mb-3 p-3 bg-light rounded d-flex justify-content-between align-items-center'}>
                  <h5 className={'mb-0'}>총 예약팀 수</h5>
                  <h3 className={'mb-0'} style={{ color: '#FFCD83' }}>
                    {chartData.reduce((sum, item) => sum + item.teamCount, 0)}명
                  </h3>
                </div>
                {!loading && (
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

                      const leftData = chartData.find(item => item.time === leftSlot);
                      const rightData = chartData.find(item => item.time === rightSlot);

                      return (
                        <tr key={idx}>
                          <td style={{ width: '25%', padding: '6px' }}>{leftSlot}</td>
                          <td style={{ width: '25%', padding: '6px' }}>{leftData ? leftData.visitorCount : 0}명</td>
                          <td style={{ width: '25%', padding: '6px' }}>{rightSlot}</td>
                          <td style={{ width: '25%', padding: '6px' }}>{rightData ? rightData.visitorCount : 0}명</td>
                        </tr>
                      );
                    })}
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

export default PreDayCh;
