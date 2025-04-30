import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Banner from "./Banner.jsx";
import {Link} from "react-router-dom";


function PreDayCh() {

//   시작날짜 지정
  const [stDay, setStDay] = useState('');
//  끝 날짜 지정
  const [endDay, setEndDay] = useState('');

// 시작 날짜 변경
  const stDayCh = (e) => {
    setStDay(e.target.value);
  };

  // 끝 날짜 변경
  const endDayCh = (e) => {
    setEndDay(e.target.value);
  };




  const stores = [
    {
      storeName: '김또깡 식당',
      check:[
        {
          reserve: [
            {  day : '2025-04-27',times: '11:00', count: 6},
            {  day : '2025-04-27',times: '12:00', count: 8},
            {  day : '2025-04-27',times: '13:00', count: 9},
            {  day : '2025-04-27',times: '14:00', count: 4},
            {  day : '2025-04-27',times: '15:00', count: 9},
            {  day : '2025-04-27',times: '16:00', count: 3},
            {  day : '2025-04-27', times: '17:00', count: 11},
            {  day : '2025-04-27',times: '18:00', count: 2},
          ],
        },
        {
          reserve: [
            {  day : '2025-04-28',times: '11:00', count: 0},
            {  day : '2025-04-28',times: '12:00', count: 4},
            {  day : '2025-04-28',times: '13:00', count: 2},
            {  day : '2025-04-28',times: '14:00', count: 14},
            {  day : '2025-04-28',times: '15:00', count: 6},
            {  day : '2025-04-28',times: '16:00', count: 9},
            {  day : '2025-04-28', times: '17:00', count: 9},
            {  day : '2025-04-28',times: '18:00', count: 8},
          ],
        },
        {
          reserve: [
            {  day : '2025-04-29',times: '11:00', count: 4},
            {  day : '2025-04-29',times: '12:00', count: 3},
            {  day : '2025-04-29',times: '13:00', count: 7},
            {  day : '2025-04-29',times: '14:00', count: 2},
            {  day : '2025-04-29',times: '15:00', count: 5},
            {  day : '2025-04-29',times: '16:00', count: 11},
            {  day : '2025-04-29', times: '17:00', count: 14},
            {  day : '2025-04-29',times: '18:00', count: 8},
          ],
        },
      ],
    },
  ];

  const getData = () => {
    const timeCount = {};

    stores[0].check.forEach(dayGroup => {
      dayGroup.reserve.forEach(res => {
        if (res.day >= stDay && res.day <= endDay) {
          if (!timeCount[res.times]) {
            timeCount[res.times] = 0;
          }
          timeCount[res.times] += res.count;
        }
      });
    });

    return Object.entries(timeCount).map(([time,count]) => ({
      time,
      count,
    }));
  }

  const chData = stDay && endDay ? getData() : [];

// 총 예약 수 계산
  const totalCount = chData.reduce((sum, item) => sum + item.count, 0);



  return (
      <div
          style={{
            marginLeft: '300px',
            paddingTop: '8rem',
            paddingLeft: '1rem',
            width: 'calc(100% - 200px)',
            maxWidth: '1000px'
          }}
      >
        <div style={{display:"flex"}}>
          <Link to="/PreCh" style={{textDecoration:'none',color:'black'}}><h4 className="me-5">매출통계</h4></Link>
          <Link to="/PreDayCh" style={{textDecoration:'none',color:'black'}}><h4>예약통계</h4></Link>
        </div>
        <Banner />
        <h2 style={{marginTop:'30px', marginBottom:'30px'}}>날짜별 시간대 통계</h2>

        {/* 시작날짜 - 끝날짜 지정 */}
        <input type="date" value={stDay} onChange={stDayCh} style={{ marginRight: '10px' }} />
        <input type="date" value={endDay} onChange={endDayCh} />

        {stDay && endDay && (
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
              {chData.length === 0 && (
                  <p style={{ textAlign: 'center', marginTop: '10px' }}>해당 기간에는 예약 데이터가 없습니다.</p>
              )}
            </div>
        )}

        {stDay && endDay && (
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

        {stDay && endDay && (
            <div style={{ marginTop: '20px', marginBottom: '50px' }}>
              <h3>총 예약 수: {totalCount} 건</h3>
            </div>
        )}
      </div>
  );
}

export default PreDayCh

