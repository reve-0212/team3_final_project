import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './css/PreDay.css';
import Banner from "./Banner.jsx";
import { Link } from "react-router-dom";

function PreDayCh() {
  const [Cal, setCal] = useState(false);
  const [Range, setRange] = useState({ from: undefined, to: undefined });
  const [confirm, setConfirm] = useState({ from: undefined, to: undefined });

  // 날짜 포맷 함수
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('ko-KR').replace(/\./g, '').replace(/ /g, '.');
  };

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

  const getData = () => {
    const timeCount = {};
    const fromDate = new Date(confirm.from);
    const toDate = new Date(confirm.to);

    stores[0].check.forEach(dayGroup => {
      dayGroup.reserve.forEach(res => {
        const resDate = new Date(res.day);
        if (resDate >= fromDate && resDate <= toDate) {
          if (!timeCount[res.times]) timeCount[res.times] = 0;
          timeCount[res.times] += res.count;
        }
      });
    });

    return Object.entries(timeCount).map(([time, count]) => ({ time, count }));
  };

  const chData = confirm.from && confirm.to ? getData() : [];
  const totalCount = chData.reduce((sum, item) => sum + item.count, 0);

  return (
      <div style={{
        marginLeft: '300px',
        paddingTop: '8rem',
        paddingLeft: '1rem',
        width: 'calc(100% - 200px)',
        maxWidth: '1000px'
      }}>
        <div style={{ display: "flex" }}>
          <Link to="/pre/PreCh" style={{ textDecoration: 'none', color: 'black' }}><h4 className="me-5">매출통계</h4></Link>
          <Link to="/pre/PreDayCh" style={{ textDecoration: 'none', color: 'black' }}><h4>예약통계</h4></Link>
        </div>

        <Banner />
        <h2 style={{ marginTop: '30px', marginBottom: '30px' }}>날짜별 시간대 통계</h2>

        {/* 날짜 범위 선택 UI */}
        <div
            className="date-box d-flex align-items-center justify-content-center"
            style={{ width: '300px', position: 'relative', border: '1px solid #ccc', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
            onClick={() => {
              setCal(true);
              setRange(confirm);
            }}
        >
          <p style={{ margin: 0 }}>
            {confirm.from && confirm.to
                ? `${formatDate(confirm.from)} ~ ${formatDate(confirm.to)}`
                : '날짜 선택'}
          </p>

          {Cal && (
              <div className="calendar-popup" style={{ position: 'absolute', top: '50px', zIndex: 1000 }} onClick={(e) => e.stopPropagation()}>
                <DayPicker
                    mode="range"
                    selected={Range}
                    onSelect={setRange}
                    pagedNavigation
                />
                <div className="d-flex justify-content-end mt-3" style={{ gap: '10px' }}>
                  <button className="btn btn-secondary" onClick={(e) => { e.stopPropagation(); setCal(false); }}>취소</button>
                  <button className="btn btn-primary" onClick={(e) => {
                    e.stopPropagation();
                    setConfirm(Range);
                    setCal(false);
                  }}>확인</button>
                </div>
              </div>
          )}
        </div>

        {confirm.from && confirm.to && (
            <div style={{ marginTop: '40px', height: '300px', marginBottom: "30px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" name="예약 수" />
                </BarChart>
              </ResponsiveContainer>
              {chData.length === 0 && <p style={{ textAlign: 'center', marginTop: '10px' }}>해당 기간에는 예약 데이터가 없습니다.</p>}
            </div>
        )}

        {confirm.from && confirm.to && (
            <div style={{ marginTop: '20px', marginBottom: '30px' }}>
              <h3>시간대별 예약 리스트</h3>
              {chData.length > 0 ? (
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                      <th style={{ border: '1px solid #ccc', padding: '8px' }}>시간대</th>
                      <th style={{ border: '1px solid #ccc', padding: '8px' }}>예약 수</th>
                    </tr>
                    </thead>
                    <tbody>
                    {chData.map((item) => (
                        <tr key={item.time}>
                          <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.time}</td>
                          <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.count}</td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
              ) : (
                  <p style={{ textAlign: 'center', marginTop: '10px' }}>해당 기간에는 예약 리스트가 없습니다.</p>
              )}
            </div>
        )}

        {confirm.from && confirm.to && (
            <div style={{ marginTop: '20px', marginBottom: '50px' }}>
              <h3>총 예약 수: {totalCount} 건</h3>
            </div>
        )}
      </div>
  );
}

export default PreDayCh;
