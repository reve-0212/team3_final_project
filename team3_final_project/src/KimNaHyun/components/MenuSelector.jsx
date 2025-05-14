import React, {useEffect, useState} from 'react';
import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import useRestaurantStore from "../../stores/useRestaurantStore.jsx";
import useUserStore from "../../stores/useUserStore.jsx";
import useReservationIdxStore from "../../stores/useReservationIdxStore.jsx"
import useResStoreSjh from "../../stores/useResStoreSjh.jsx";

const MenuSelector = () => {
  // 좌석 세팅에서 선택한 reservationIdx 가지고 있기
  const reservationIdx = useReservationIdxStore((state) => state.reservationIdx)

  useEffect(() => {
    console.log("reservationIdx")
    console.log(reservationIdx)
  }, [reservationIdx]);


  // 이전 페이지에서 전달받은 예약 정보
  // const {
  //   // userIdx,
  //   // resIdx,
  //   rsvDate,
  //   rsvTime,
  // } = location.state || {};
  // console.log(rsvDate)
  // console.log(rsvTime)

  const Nv = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  // const [reservationIdx, setReservationIdx] = useState(null);

  const userStore = useUserStore((state) => state.user)
  const res = useResStoreSjh((state)=>state.res)
  const resIdx = res.resIdx
  // const resIdx = useRestaurantStore((state) => state.restaurantIdx);
  const userIdx = userStore.userIdx
  console.log("userIdx")
  console.log(userIdx)
  console.log("resIdx")
  console.log(resIdx)


  // 메뉴 데이터 로드
  useEffect(() => {
    if (!resIdx) return; // resIdx가 없는 경우 API 호출을 하지 않도록 처리

    axios
      .get(`http://localhost:8080/api/menu/${resIdx}`)
      .then(res => {
        console.log(res.data);
        setMenuItems(res.data);
      })
      .catch(err => {
        console.log(err);
        alert("메뉴 데이터를 불러오는 데 실패했습니다.");
      });
  }, [resIdx]);  // resIdx가 변경될 때마다 다시 데이터 로딩

  // useEffect(() => {
  //     axios.get(`http://localhost:8080/api/menu/${resIdx}`)
  //         .then(res => {
  //             console.log(res.data);
  //             setReservationItem(res.data);
  //         })
  //         .catch(err => {
  //             console.log(err);
  //         });
  // }, [resIdx]);


  // 예약번호 조회
  // useEffect(() => {
  //   if (!userIdx || !resIdx || !rsvDate || !rsvTime) return;
  //   axios.get(`http://localhost:8080/api/menu/find`, {
  //     params: {
  //       userIdx,
  //       resIdx,
  //       rsvDate,
  //       rsvTime
  //     }
  //   })
  //     .then(res => {
  //       setReservationIdx(res.data.reservationIdx); // 예약번호 저장
  //       console.log("예약번호:", res.data.reservationIdx);
  //     })
  //     .catch(err => {
  //       console.error("예약 정보 조회 실패", err);
  //     });
  // }, [userIdx, resIdx, rsvDate, rsvTime]);


  const handleIncrease = (menuIdx) => {
    setQuantities((prev) => ({
      ...prev,
      [menuIdx]: (prev[menuIdx] || 0) + 1,
    }));
  };

  const handleDecrease = (menuIdx) => {
    setQuantities((prev) => {
      const current = prev[menuIdx] || 0;
      if (current <= 1) {
        const newQuantities = {...prev};
        delete newQuantities[menuIdx];
        return newQuantities;
      }
      return {
        ...prev,
        [menuIdx]: current - 1,
      };
    });
  };

  const handleSubmit = () => {
    if (Object.keys(quantities).length === 0) {
      alert("메뉴를 하나 이상 선택하세요.");
      return;
    }

    const menuList = Object.entries(quantities).map(([menuIdx, quantity]) => ({
      menuIdx: parseInt(menuIdx),
      quantity,
    }));

    // const userIdx = 1; // 임의 사용자 ID
    // const resIdx = 1; // 임의 예약 ID

    axios.post(`http://localhost:8080/api/menu/${userIdx}/${resIdx}`, {
      menuIdx: menuList
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
      }
    })
      .then(() => {
        alert("메뉴 선택이 완료되었습니다.");
        Nv(`/book/reg/${userIdx}/${resIdx}`);
      })
      .catch((err) => {
        alert("메뉴 전송 실패");
        console.error(err);
      });
  };

  return (
    <div className="app-container container py-4">
      <h3 className="waiting-title">메뉴를 선택하세요</h3>
      <div style={{padding: '20px'}}>
        <h2 className="waiting-title-sub">메뉴 선택</h2>

        {menuItems.length === 0 ? (
          <p>메뉴를 불러오는 중입니다...</p>
        ) : (
          menuItems.map((item) => (
            <div
              key={item.menuIdx}  // 수정된 부분
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                borderBottom: '1px solid #eee',
                paddingBottom: '20px',
                marginBottom: '20px',
              }}
            >
              {/* 이미지 + 수량 버튼 (세로) */}
              <div
                style={{
                  marginRight: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <img
                  src={item.menuImage}
                  alt={item.menuName}
                  style={{
                    width: '120px',
                    borderRadius: '10px',
                  }}
                />
                <div
                  style={{
                    marginTop: '10px',
                    border: '1px solid #dddddd',
                    padding: '0 10px',
                    borderRadius: '10px',
                  }}
                >
                  <button className="prev-btn" onClick={() => handleDecrease(item.menuIdx)}>-</button>
                  <span style={{margin: '0 10px'}}>
                                        {quantities[item.menuIdx] || 0} {/* 수정된 부분 */}
                                    </span>
                  <button className="next-btn" onClick={() => handleIncrease(item.menuIdx)}>+</button>
                </div>
              </div>

              {/* 이름 + 설명 */}
              <div style={{flex: 1}}>
                <div style={{fontWeight: 'bold', fontSize: '16px'}}>
                  {item.menuName} {/* 수정된 부분 */}
                </div>
                <div style={{fontSize: '14px', color: '#555', marginTop: '4px'}}>
                  {item.menuExplanation} {/* 수정된 부분 */}
                </div>
              </div>
            </div>
          ))
        )}

        {Object.keys(quantities).length === 0 ? (
          <p className="waiting-title-sub">메뉴를 선택해주세요.</p>
        ) : (
          <ul>
            {Object.entries(quantities).map(([menuIdx, quantity]) => {
              const menu = menuItems.find((item) => item.menuIdx.toString() === menuIdx); // 수정된 부분
              return (
                <li
                  key={menuIdx}
                  style={{marginBottom: '12px', display: 'flex', alignItems: 'center'}}
                >
                  <img
                    src={menu.menuImage}
                    alt=""
                    style={{
                      width: '60px',
                      height: '60px',
                      marginRight: '10px',
                      borderRadius: '8px',
                    }}
                  />
                  <span>{menu.menuName} {quantity}개</span>
                </li>
              );
            })}
            <Button btnName={'다음'} onClick={handleSubmit}/>
          </ul>
        )}
      </div>
    </div>
  );
};

export default MenuSelector;
