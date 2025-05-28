import {useEffect, useRef, useState} from "react";
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
import {Link, useParams} from "react-router-dom";
import api from "../api/axios.js";

function PreDayCh() {

    const [chartData, setChartData] = useState([]);
    // 영업시간
    const [timeSlots, setTimeSlots] = useState([]);
    // const [openTime, setOpenTime] = useState("10:00"); // 첫 페이지 로딩시 꼬임 방지로 초기값 그냥 넣은거임
    // const [closeTime, setCloseTime] = useState("20:00");
    // 달력
    const today = new Date();
    const [seDay, setSeDay] = useState({ from: today, to: today });
    const [yetDay, setYetDay] = useState({ from: today, to: today });
    const [cal, setCal] = useState(false);
    const calendarRef = useRef(null);

    // 페이지 로딩
    const [loading, setLoading] = useState(false);

    const { resIdx } = useParams();

    // 달력 외부 부분 클릭하면 달력 닫힘
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (calendarRef.current &&
                !calendarRef.current.contains(e.target)
            ) {
                setCal(false);
            }
        };
        if (cal) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },[cal]);

    // 날짜 포맷
    const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('ko-KR').replace(/\./g, '').replace(/ /g, '.');
    };

    // 백엔드에 데이터 보낼때 날짜 문자열에 시간 포함 (시작은 00:00:00, 끝은 23:59:59)
    const formatDateStart = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day} 00:00:00`;
    };

    const formatDateEnd = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day} 23:59:59`;
    };

    // 영업시간 → timeSlots 배열 생성
    // const generateTimeSlots = (start, end) => {
    //     const result = [];
    //     const startHour = parseInt(start.split(":")[0], 10);
    //     const endHour = parseInt(end.split(":")[0], 10);
    //
    //     for (let hour = startHour; hour <= endHour; hour++) {
    //         result.push(`${hour}시`);
    //     }
    //     return result;
    // };

    // 가게 영업시간 정보 받아오기
    const fetchResTime = async () => {
        try {
            const res = await api.get(`/api/history/restaurant/${resIdx}/reservationTime`);
            // console.log('API 응답 데이터:', res.data);
            let slots = res.data;

            if (typeof slots === 'string') {
                // 문자열이라면 JSON 배열로 변환
                slots = JSON.parse(slots);
            }
            // 요소 문자열에 붙은 [ 또는 ] 제거
            const cleanedSlots = slots.map(item => item.replace(/^\[|\]$/g, ''));
            setTimeSlots(cleanedSlots);
        } catch (err) {
            console.error("영업시간 정보 가져오기 실패", err);
        }
    };

    const fetchData = async () => {
        if (!seDay.from || !seDay.to) return;

        setLoading(true);
        try {
            const response = await api.get('/api/history/reservation/hour', {
                params: {
                    startDate: formatDateStart(seDay.from),
                    endDate: formatDateEnd(seDay.to),
                    resIdx: resIdx
                }
            });
            // 받아온 데이터 시간대 맞게정렬
            const raw = response.data;

            // 시간 포맷 맞추기(11:00)
            const formatted = timeSlots.map(slot => {
                const found = raw.find(item => item.hour === slot); // slot: '11:20'

                return {
                    time: slot,
                    visitorCount: found ? found.visitorCount : 0,
                    teamCount: found ? found.teamCount : 0
                };
            });
            //   응답받은 데이터 상태ㅐ에 저장
            setChartData(formatted);
            // console.log("Fetched data:", raw);
        }
        catch (error) {
            console.error("시간대별 예약 가져오기 실패", error);
        }
        setLoading(false);
    };

    // 초기 마운트 시 가게 시간 먼저 받아오기
    useEffect(() => {
        fetchResTime();
    }, []);

    // 날짜 변경 시 예약데이터 가져오기
    useEffect(() => {
        if (timeSlots.length > 0) {
            fetchData();
        }
    }, [seDay, timeSlots]);

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
                      {seDay.from && seDay.to ?
                          `${formatDate(seDay.from)} ~ ${formatDate(seDay.to)}` : '날짜 선택'}
                  </p>
                {cal && (
                    <div className={'calendar-popup'} ref={calendarRef} onClick={(e) => e.stopPropagation()}>
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
                                  const { from, to } = yetDay || {};

                                  if(!from && !to) {
                                      setSeDay({ from: undefined, to: undefined });
                                      setYetDay({ from: undefined, to: undefined });
                                  } else if (from && !to) {
                                      setSeDay({ from, to: from });
                                      setYetDay({ from, to: from });
                                  } else {
                                      setSeDay(yetDay);
                                  }
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
                    {chartData.reduce((sum, item) => sum + item.teamCount, 0)}팀
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
