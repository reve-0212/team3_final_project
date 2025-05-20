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

function PreCh() {

    const [storeData, setStoreData] = useState([]);
    const today = new Date();
    // 확정 날짜
    const [seDay, setSeDay] = useState({ from: today, to: today });
    // 확정 전 날짜
    const [yetDay, setYetDay] = useState({ from: today, to: today });
    // 캘린더
    const [cal, setCal] = useState(false);
    const calendarRef = useRef(null);

    // 로딩중
    const [loading, setLoading] = useState(false);
    const { resIdx } =useParams();

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

    // api 호출 (판매 메뉴 데이터)
    const fetchData = async () => {
        setLoading(true);
        try {
            //   서버에서 데이터 받아옴
            const response = await api.get('/api/history/sales', {
                params: {
                    startDate: formatDateStart(seDay.from),
                    endDate: formatDateEnd(seDay.to),
                    resIdx: resIdx
                }
            });
            //   응답받은 데이터 상태ㅐ에 저장
            setStoreData(response.data);
        }
        catch (error) {
            console.error("데이터 가져오기 실패", error);
        }
        setLoading(false);
    };

    // 컴포넌트 마운트 시 데이터 가져오기
    useEffect(() => {
        fetchData();  // 컴포넌트가 처음 렌더링 될 때 호출
    }, [seDay]);  // 날짜 선택 될때마다 다시 렌더링

    // 메뉴별 판매량 및 매출 계산
    const filteredData = storeData.map(menu => ({
        menuName: menu.menu_name,
        price: menu.menu_price,
        count: menu.soldCount,  // 백엔드에서 계산된 값 사용
        totalPrice: menu.soldTotalPrice,  // 백엔드에서 계산된 값 사용
    }));

  return (
      <>
        <ReBanner />
        <div>
          <div>
            <div className={'d-flex align-items-center gap-3 flex-wrap mb-4'}>
              <h2 className={'waiting-chart-title ms-3'}>메뉴별 판매량</h2>
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

            {/* 메뉴별 판매량 바 차트 */}
            <div className={'d-flex gap-4 justify-content-center align-items-center mb-5 flex-wrap'}>
              <div style={{flex: 4, minWidth: '300px'}}>
                {loading ? (
                            <p className={'text-center'}>로딩 중...<br/>잠시만 기다려 주세요</p>
                        ) : (<ResponsiveContainer width={'100%'} height={250}>
                  <BarChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="menuName"/>
                    <YAxis/>
                    <Tooltip/>
                    <Bar dataKey={"count"} fill={'#FFCD83'} barSize={25}/>
                  </BarChart>
                </ResponsiveContainer>)}
              </div>
              <div style={{flex: 3, minWidth: '200px'}}>
                <div className={'mb-3 p-3 bg-light rounded d-flex justify-content-between align-items-center'}>
                  <h5 className={'mb-0'}>총 매출 금액</h5>
                  <h3 className={'mb-0'} style={{color: '#FFCD83'}}>
                    {filteredData.reduce((sum, item) => sum + item.totalPrice, 0).toLocaleString()}원
                  </h3>
                </div>
                  {!loading && (
                      <div  style={{maxHeight: '35vh', overflowY: 'auto'}}>
                        <table
                            className={'table table-bordered table-sm text-center PreChTable'}
                            style={{tableLayout: 'fixed', width: '100%', fontSize: '14px' }}
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
                  )}
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default PreCh;
