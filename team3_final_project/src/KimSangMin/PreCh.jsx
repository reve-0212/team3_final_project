import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Banner from "./Banner.jsx";
import {Link} from "react-router-dom";

function PreCh() {
  const [seDate, setSeDate] = useState('');
  const [sortType, setSortType] = useState('default'); // 추가: 정렬 타입

  const stores = [
    {
      storeName: '김또깡 식당',
      menus: [
        {
          menuName: '김치찌개',
          price: 8000,
          sales: [
            { date: '2025-04-27', count: 5 },
            { date: '2025-04-28', count: 4 },
          ],
        },
        {
          menuName: '된장찌개',
          price: 30000,
          sales: [
            { date: '2025-04-27', count: 3 },
          ],
        },
        {
          menuName: '제육볶음',
          price: 90000,
          sales: [
            { date: '2025-04-28', count: 7 },
          ],
        },
      ],
    },
  ];

  const dateCh = (e) => {
    setSeDate(e.target.value);
  };

  const sortCh = (type) => {
    setSortType(type);
  };

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
        <Banner />
        <div style={{display:"flex"}}>
          <Link to="/PreCh" style={{textDecoration:'none',color:'black'}}><h4 className="me-5">매출통계</h4></Link>
          <Link to="/PreDayCh" style={{textDecoration:'none',color:'black'}}><h4>예약통계</h4></Link>
        </div>
        <br/>
        <hr/>
        <h3>날짜별 매출 통계</h3>

        <input
            type="date"
            value={seDate}
            onChange={dateCh}
        />

        {/* 정렬 버튼 */}
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <button onClick={() => sortCh('revenue')} style={{ marginRight: '10px', backgroundColor:'#FFD727' }}>매출순 정렬</button>
          <button onClick={() => sortCh('count')} style={{backgroundColor:'#FFCD83'}}>판매개수순 정렬</button>
        </div>

        {seDate && stores.map((store, storeIdx) => {
          let total = 0;
          let chartData = [];

          // 메뉴 데이터 만들기
          store.menus.forEach((menu) => {
            const saleDate = menu.sales.find(sale => sale.date === seDate);
            const count = saleDate ? saleDate.count : 0;
            const revenue = count * menu.price;

            total += revenue;

            chartData.push({
              menuName: menu.menuName,
              count,
              revenue,
              storeName: store.storeName,
            });
          });

          // 정렬 적용
          if (sortType === 'revenue') {
            chartData.sort((a, b) => b.revenue - a.revenue);
          } else if (sortType === 'count') {
            chartData.sort((a, b) => b.count - a.count);
          }
          // 기본은 메뉴 작성 순서 (정렬 안함)

          return (
              <div key={storeIdx} style={{ marginTop: '30px' }}>
                <h2>{store.storeName}</h2>

                {/* 차트 출력 */}
                <div style={{ marginTop: '40px', height: '300px',marginBottom:"30px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="menuName" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="quantity" fill="#8884d8" name="판매개수" />
                      <Bar dataKey="revenue" fill="#82ca9d" name="매출액" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* 리스트 출력 */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px',
                  borderBottom: '2px solid #ccc',
                  fontWeight: 'bold'
                }}>
                  <span>가게명</span>
                  <span>메뉴</span>
                  <span>판매개수</span>
                  <span>매출액</span>
                  <span>메뉴 총 매출액</span>
                </div>

                {chartData.map((menu, menuIdx) => {
                  const meTotal = menu.count * store.menus.find(m => m.menuName === menu.menuName).price;
                  return (
                      <div
                          key={menuIdx}
                          style={{
                            marginBottom: '20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '10px',
                            borderBottom: '1px solid #ccc'
                          }}
                      >
                        <span>{menu.storeName}</span>
                        <span>{menu.menuName}</span>
                        <span>{menu.count}개</span>
                        <span>{menu.revenue.toLocaleString()}원</span>
                        <span>{meTotal.toLocaleString()}원</span>
                      </div>
                  );
                })}
                {/* 가게 총 매출 */}
                <h3 style={{ marginTop: '40px', marginBottom:"50px" }}>가게 총 매출액: {total.toLocaleString()}원</h3>
              </div>
          );
        })}
      </div>
  );
}

export default PreCh;
