import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './PreDay.css';
import Banner from "./Banner.jsx";
import { Link } from "react-router-dom";

function PreCh() {
  const [calOpen, setCalOpen] = useState(false);
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [confirm, setConfirm] = useState({ from: undefined, to: undefined });
  const [sortType, setSortType] = useState('default');

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('ko-KR').replace(/\./g, '').replace(/ /g, '.');
  };

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

  const getChartData = () => {
    if (!confirm.from || !confirm.to) return [];

    const from = new Date(confirm.from);
    const to = new Date(confirm.to);

    return stores.map((store) => {
      const chartData = store.menus.map((menu) => {
        let count = 0;
        menu.sales.forEach(sale => {
          const saleDate = new Date(sale.date);
          if (saleDate >= from && saleDate <= to) {
            count += sale.count;
          }
        });
        const revenue = count * menu.price;
        return {
          menuName: menu.menuName,
          count,
          revenue,
          storeName: store.storeName,
          price: menu.price,
        };
      });

      if (sortType === 'revenue') {
        chartData.sort((a, b) => b.revenue - a.revenue);
      } else if (sortType === 'count') {
        chartData.sort((a, b) => b.count - a.count);
      }

      return { storeName: store.storeName, chartData };
    });
  };

  const allStoreData = getChartData();

  return (
      <div style={{
        marginLeft: '300px',
        paddingTop: '8rem',
        paddingLeft: '1rem',
        width: 'calc(100% - 200px)',
        maxWidth: '1000px'
      }}>
        <Banner />
        <div style={{ display: "flex" }}>
          <Link to="/PreCh" style={{ textDecoration: 'none', color: 'black' }}><h4 className="me-5">매출통계</h4></Link>
          <Link to="/PreDayCh" style={{ textDecoration: 'none', color: 'black' }}><h4>예약통계</h4></Link>
        </div>
        <br />
        <hr />
        <h3>날짜별 매출 통계</h3>

        {/* 날짜 범위 선택 UI */}
        <div
            className="date-box d-flex align-items-center justify-content-center"
            style={{ width: '300px', position: 'relative', border: '1px solid #ccc', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
            onClick={() => {
              setCalOpen(true);
              setRange(confirm);
            }}
        >
          <p style={{ margin: 0 }}>
            {confirm.from && confirm.to
                ? `${formatDate(confirm.from)} ~ ${formatDate(confirm.to)}`
                : '날짜 선택'}
          </p>

          {calOpen && (
              <div className="calendar-popup" style={{ position: 'absolute', top: '50px', zIndex: 1000 }} onClick={(e) => e.stopPropagation()}>
                <DayPicker
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                    pagedNavigation
                />
                <div className="d-flex justify-content-end mt-3" style={{ gap: '10px' }}>
                  <button className="btn btn-secondary" onClick={(e) => { e.stopPropagation(); setCalOpen(false); }}>취소</button>
                  <button className="btn btn-primary" onClick={(e) => {
                    e.stopPropagation();
                    setConfirm(range);
                    setCalOpen(false);
                  }}>확인</button>
                </div>
              </div>
          )}
        </div>

        {/* 정렬 버튼 */}
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <button onClick={() => setSortType('revenue')} style={{ marginRight: '10px', backgroundColor: '#FFD727' }}>매출순 정렬</button>
          <button onClick={() => setSortType('count')} style={{ backgroundColor: '#FFCD83' }}>판매개수순 정렬</button>
        </div>

        {confirm.from && confirm.to && allStoreData.map((store, idx) => {
          const total = store.chartData.reduce((sum, item) => sum + item.revenue, 0);

          return (
              <div key={idx} style={{ marginTop: '30px' }}>
                <h2>{store.storeName}</h2>

                {/* 차트 출력 */}
                <div style={{ marginTop: '40px', height: '300px', marginBottom: "30px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={store.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="menuName" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#8884d8" name="판매개수" />
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

                {store.chartData.map((menu, menuIdx) => (
                    <div key={menuIdx} style={{
                      marginBottom: '20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '10px',
                      borderBottom: '1px solid #ccc'
                    }}>
                      <span>{menu.storeName}</span>
                      <span>{menu.menuName}</span>
                      <span>{menu.count}개</span>
                      <span>{menu.revenue.toLocaleString()}원</span>
                      <span>{(menu.count * menu.price).toLocaleString()}원</span>
                    </div>
                ))}

                <h3 style={{ marginTop: '40px', marginBottom: "50px" }}>가게 총 매출액: {total.toLocaleString()}원</h3>
              </div>
          );
        })}
      </div>
  );
}

export default PreCh;
