import { useState } from "react";
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

function PreDayCh() {
  const stores = [
    {
      storeName: '김또깡 식당',
      check: [
        {
          reserve: [
            { day: '2025-04-27', times: '11:00', count: 6 },
            { day: '2025-04-27', times: '12:00', count: 8 },
            { day: '2025-04-27', times: '13:00', count: 9 },
            { day: '2025-04-27', times: '14:00', count: 4 },
            { day: '2025-04-27', times: '15:00', count: 9 },
            { day: '2025-04-27', times: '16:00', count: 3 },
            { day: '2025-04-27', times: '17:00', count: 11 },
            { day: '2025-04-27', times: '18:00', count: 2 },
          ],
        },
        {
          reserve: [
            { day: '2025-04-28', times: '11:00', count: 0 },
            { day: '2025-04-28', times: '12:00', count: 4 },
            { day: '2025-04-28', times: '13:00', count: 2 },
            { day: '2025-04-28', times: '14:00', count: 14 },
            { day: '2025-04-28', times: '15:00', count: 6 },
            { day: '2025-04-28', times: '16:00', count: 9 },
            { day: '2025-04-28', times: '17:00', count: 9 },
            { day: '2025-04-28', times: '18:00', count: 8 },
          ],
        },
        {
          reserve: [
            { day: '2025-04-29', times: '11:00', count: 4 },
            { day: '2025-04-29', times: '12:00', count: 3 },
            { day: '2025-04-29', times: '13:00', count: 7 },
            { day: '2025-04-29', times: '14:00', count: 2 },
            { day: '2025-04-29', times: '15:00', count: 5 },
            { day: '2025-04-29', times: '16:00', count: 11 },
            { day: '2025-04-29', times: '17:00', count: 14 },
            { day: '2025-04-29', times: '18:00', count: 8 },
          ],
        },
      ],
    },
  ];

  const timeSlots = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  const today = new Date();
  const [seDay, setSeDay] = useState({ from: today, to: today });
  const [yetDay, setYetDay] = useState({ from: today, to: today });
  const [cal, setCal] = useState(false);

  const formatDate = (date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const isInRange = (dateStr, from, to) => {
    const d = new Date(dateStr);
    return (!from || d >= from) && (!to || d <= to);
  };

  const filteredCountData = timeSlots.map(time => {
    const totalCount = stores[0].check
        .flatMap(store => store.reserve)
        .filter(item => item.times === time && isInRange(item.day, seDay.from, seDay.to))
        .reduce((sum, item) => sum + item.count, 0);

    return {
      time,
      count: totalCount,
    };
  });

  return (
      <div className={'ceo-main'}>
        <ReBanner />
        <div style={{ marginTop: '10vh', marginLeft: '200px', position: 'relative' }}>
          <div style={{ display: "flex", position: 'relative' }}>
            <Link to="/pre/PreCh" style={{ textDecoration: 'none', color: 'black' }}>
              <h4 className="me-5">매출통계</h4>
            </Link>
            <Link to="/pre/PreDayCh" style={{ textDecoration: 'none', color: 'black' }}>
              <h4>예약통계</h4>
            </Link>
          </div>
          <br />
          <hr />
          <div className={'d-flex align-items-center gap-3 flex-wrap mb-4'}>
            <h2 className={'waiting-chart-title'}>예약 통계</h2>
            <hr />
            <div
                className={'date-box d-flex align-items-center justify-content-center ms-3'}
                style={{ width: '300px', position: 'relative', cursor: 'pointer' }}
                onClick={() => {
                  setCal(true);
                  setYetDay(seDay);
                }}
            >
              <p style={{ margin: 0 }}>
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
                    <div className="d-flex justify-content-end mt-3" style={{ gap: '10px' }}>
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
          <hr />

          <h4 className={'mt-5 mb-3'}>시간대별 예약 수</h4>
          <div className={'d-flex gap-4 justify-content-center align-items-center mb-5 flex-wrap'}>
            <div style={{ flex: 4, minWidth: '300px' }}>
              <ResponsiveContainer width={'100%'} height={250}>
                <BarChart data={filteredCountData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: '#FFF8E1', border: 'none' }} itemStyle={{ color: '#5D4037' }} cursor={{ fill: 'transparent' }} />
                  <Bar dataKey={"count"} fill={'#FFCD83'} barSize={25} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ flex: 3, minWidth: '200px' }}>
              <div className={'mb-3 p-3 bg-light rounded d-flex justify-content-between align-items-center'}>
                <h5 className={'mb-0'}>총 예약팀 수</h5>
                <h3 className={'mb-0'} style={{ color: '#FFCD83' }}>
                  {filteredCountData.reduce((sum, item) => sum + item.count, 0)}명
                </h3>
              </div>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {[0, 1].map((tableIndex) => {
                  const half = Math.ceil(filteredCountData.length / 2);
                  const slicedData = tableIndex === 0
                      ? filteredCountData.slice(0, half)
                      : filteredCountData.slice(half);

                  return (
                      <table
                          key={tableIndex}
                          className={'table table-bordered table-sm text-center'}
                          style={{ tableLayout: 'fixed', width: '45%', fontSize: '14px' }}
                      >
                        <thead>
                        <tr>
                          <th>시간</th>
                          <th>예약수</th>
                        </tr>
                        </thead>
                        <tbody>
                        {slicedData.map((item, idx) => (
                            <tr key={idx}>
                              <td>{item.time}</td>
                              <td>{item.count}팀</td>
                            </tr>
                        ))}
                        </tbody>
                      </table>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default PreDayCh;
