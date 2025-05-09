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

function PreCh() {
  // const stores = [
  //   {
  //     storeName: '김또깡 식당',
  //     menus: [
  //       {
  //         menuName: '김치찌개',
  //         price: 8000,
  //         sales: [
  //           { date: '2025-04-27', count: 5 },
  //           { date: '2025-04-28', count: 4 },
  //         ],
  //       },
  //       {
  //         menuName: '된장찌개',
  //         price: 9000,
  //         sales: [
  //           { date: '2025-04-27', count: 3 },
  //         ],
  //       },
  //       {
  //         menuName: '제육볶음',
  //         price: 10000,
  //         sales: [
  //           { date: '2025-04-28', count: 7 },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  const [storeData, setStoreData] = useState([]);
  const today = new Date();
  // 확정 날짜
  const [seDay, setSeDay] = useState({ from: today, to: today });
  // 확정 전 날짜
  const [yetDay, setYetDay] = useState({ from: today, to: today });
  // 캘린더
  const [cal, setCal] = useState(false);

  const formatDate = (date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  // 날짜 범위
  // const isInRange = (dateStr, from, to) => {
  //   const d = new Date(dateStr);
  //   return (!from || d >= from) && (!to || d <= to);
  // };

  // api 호출 (판매 메뉴 데이터)
  const fetchData = async () => {
    try {
    //   서버에서 데이터 받아옴
      const response = await axios.get('http://localhost:8080/api/history/sales/menu', {
        params: {
          startDate: formatDate(seDay.from),
          endDate: formatDate(seDay.to),
          resIdx: 1
        }
      });
    //   응답받은 데이터 상태ㅐ에 저장
      setStoreData(response.data);
    }
    catch (error) {
      console.error("데이터 가져오기 실패", error);
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchData();  // 컴포넌트가 처음 렌더링 될 때 호출
  }, [seDay]);  // 빈 배열을 두 번째 인자로 주면 한 번만 호출됨

  // 메뉴별 판매량 및 매출 계산
  const filteredData = storeData.map(menu => ({
    menuName: menu.menu_name,
    price: menu.menu_price,
    count: menu.soldCount,  // 백엔드에서 계산된 값 사용
    totalPrice: menu.soldTotalPrice,  // 백엔드에서 계산된 값 사용
  }));

  return (
      <div className={'ceo-main'}>
        <ReBanner />
        <div style={{ marginTop: '10vh', marginLeft: '200px', position: 'relative' }}>
          <div style={{ display: "flex", position: 'relative' }}>
            <Link to="/pre/PreCh" style={{ textDecoration: 'none', color: 'black' }}><h4 className="me-5">매출통계</h4></Link>
            <Link to="/pre/PreDayCh" style={{ textDecoration: 'none', color: 'black' }}><h4>예약통계</h4></Link>
          </div>
          <br />
          <hr />
          <div className={'d-flex align-items-center gap-3 flex-wrap mb-4'}>
            <h2 className={'waiting-chart-title'}>매출 통계</h2>
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

          {/* 메뉴별 판매량 바 차트 */}
          <h4 className={'mt-5 mb-3'}>메뉴별 판매량</h4>
          <div className={'d-flex gap-4 justify-content-center align-items-center mb-5 flex-wrap'}>
            <div style={{ flex: 4, minWidth: '300px' }}>
              <ResponsiveContainer width={'100%'} height={250}>
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="menuName" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey={"count"} fill={'#FFCD83'} barSize={25} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ flex: 3, minWidth: '200px' }}>
              <div className={'mb-3 p-3 bg-light rounded d-flex justify-content-between align-items-center'}>
                <h5 className={'mb-0'}>총 매출 금액</h5>
                <h3 className={'mb-0'} style={{ color: '#FFCD83' }}>
                  {filteredData.reduce((sum, item) => sum + item.totalPrice, 0).toLocaleString()}원
                </h3>
              </div>
              <table
                  className={'table table-bordered table-sm text-center'}
                  style={{ tableLayout: 'fixed', width: '100%', fontSize: '14px' }}
              >
                <thead>
                <tr>
                  <th>메뉴</th>
                  <th>가격</th>
                  <th>판매량</th>
                  <th>메뉴별 매출</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.menuName}</td>
                      <td>{item.price.toLocaleString()}원</td>
                      <td>{item.count}개</td>
                      <td>{item.totalPrice.toLocaleString()}원</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
}

export default PreCh;
