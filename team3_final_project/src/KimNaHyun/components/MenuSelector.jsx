import React, {useEffect, useState} from 'react';
import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import useUserStore from "../../stores/useUserStore.jsx";
import useReservationIdxStore from "../../stores/useReservationIdxStore.jsx"
import useResStoreSjh from "../../stores/useResStoreSjh.jsx";
import usePeopleStore from "../../stores/usePeopleStore.jsx";
import useRsvDateTimeStore from "../../stores/useRsvDateTimeStore.jsx";
import useMenuIdxStore from "../../stores/useMenuIdxStore.jsx";

const MenuSelector = () => {
  const Nv = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  const userStore = useUserStore((state) => state.user)
  const res = useResStoreSjh((state) => state.res)
  const people = usePeopleStore((state) => state.people)
  const rsvDateTime = useRsvDateTimeStore((state) => state.rsvDateTime)
  const [allPeople, setAllPeople] = useState(0)

  const resIdx = res.resIdx
  const userIdx = userStore.userIdx

  // 좌석 세팅에서 선택한 reservationIdx 가지고 있기
  const reservationIdx = useReservationIdxStore((state) => state.reservationIdx)



  useEffect(() => {
    console.log("userIdx")
    console.log(userIdx)
  }, [userIdx])

  useEffect(() => {
    console.log("resIdx")
    console.log(resIdx)
  }, [resIdx]);

  useEffect(() => {
    console.log("reservationIdx")
    console.log(reservationIdx)
  }, [reservationIdx]);

  useEffect(() => {
    console.log("people")
    console.log(people)
    console.log("people.woman")
    console.log(people.woman)
    console.log("people.man")
    console.log(people.man)
    console.log("people.baby")
    console.log(people.baby)

    setAllPeople(people.woman + people.man + people.baby)
  }, [people]);
  console.log("-----allPeople-----")
  console.log(allPeople)

  useEffect(() => {
    console.log("rsvDateTime")
    console.log(rsvDateTime)
  }, []);

  // window.addEventListener("popstate", () => {
  //   console.log("뒤로가기")
  // })

  // 메뉴 데이터 로드
  useEffect(() => {
    if (!resIdx) return; // resIdx가 없는 경우 API 호출을 하지 않도록 처리

    axios.get(`http://localhost:8080/api/menu/${resIdx}`)
      .then(res => {
        console.log(res.data);
        setMenuItems(res.data);
      })
      .catch(err => {
        console.log(err);
        alert("메뉴 데이터를 불러오는 데 실패했습니다.");
      });
  }, [resIdx]);  // resIdx가 변경될 때마다 다시 데이터 로딩

  const handleIncrease = (menuIdx) => {
    setQuantities((prev) => ({
      ...prev,
      [menuIdx]: (prev[menuIdx] || 0) + 1,
    }));
  };

  console.log("-----menuItems-----")
  console.log(menuItems)

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

    const menuList = Object.entries(quantities).map(([menuIdx, quantity]) => {
      // item.menuIdx 와 menuIdx 가 같은 것을 찾아 menu 에 넣는다
      const menu = menuItems.find((item) => item.menuIdx === parseInt(menuIdx));

      // menu 안에 들어간 메뉴 이름과 가격을 가져온다
      return {
        menuIdx: parseInt(menuIdx),
        menuName: menu.menuName,
        menuPrice: menu.menuPrice,
        quantity,
        totalPrice: menu.menuPrice * quantity
      }
    });

    console.log("-----menuList-----")
    console.log(menuList)

    for (let i = 0; i < menuList.length; i++) {
      console.log(menuList[i])
      console.log(menuList[i].menuIdx)
      console.log(menuList[i].menuName)
      console.log(menuList[i].menuPrice)
      console.log(menuList[i].quantity)
      console.log(menuList[i].totalPrice)
      console.log(allPeople)

      axios.all([
        axios.put("http://localhost:8080/reserveMenu", null, {
          params: {
            reservationIdx: reservationIdx,
            menuIdx: menuList[i].menuIdx,
            menuQuantity: menuList[i].quantity
          }, headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          }
        }),
        axios.put("http://localhost:8080/saveHistory", null, {
          params: {
            reservationIdx: reservationIdx,
            resIdx: resIdx,
            reservationDate: rsvDateTime,
            rsvPeople: allPeople,
            rsvMan: people.man,
            rsvWoman: people.woman,
            rsvBaby: people.baby,
            menuIdx: menuList[i].menuIdx,
            menuName: menuList[i].menuName,
            menuPrice: menuList[i].menuPrice,
            menuSCount: menuList[i].quantity,
            menuSTP: menuList[i].totalPrice
          }, headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          }
        })
      ]).then(
        axios.spread((res1, res2) => {
          console.log(res1)
          console.log(res2)
        })
      ).catch((err) => {
        console.log(err)
      })

      // axios.put("http://localhost:8080/reserveMenu", null, {
      //   params: {
      //     reservationIdx: reservationIdx,
      //     menuIdx: menuList[i].menuIdx,
      //     menuQuantity: menuList[i].quantity
      //   }, headers: {
      //     Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      //   }
      // }).then((res) => {
      //   console.log(res)
      // }).catch((err) => {
      //   console.log(err)
      // })
    }
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
            <Button btnName={'다음'} onClick={() => {
              handleSubmit()
              // Nv("/book/reg")
            }}/>
          </ul>
        )}
      </div>
    </div>
  );
};

export default MenuSelector;
