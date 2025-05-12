import React, { useEffect, useState } from 'react';
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useRestaurantStore from "../../stores/useRestaurantStore.jsx";

const MenuSelector = () => {
    const Nv = useNavigate();
    const [menuItems, setMenuItems] = useState([]);
    const [quantities, setQuantities] = useState({});
    const resIdx = useRestaurantStore((state) => state.restaurantIdx);

    useEffect(() => {
        if (!resIdx) return;

        axios
            .get(`http://localhost:8080/api/menu/${resIdx}`)
            .then(res => {
                setMenuItems(res.data);
            })
            .catch(err => {
                console.error(err);
                alert("메뉴 데이터를 불러오는 데 실패했습니다.");
            });
    }, [resIdx]);

    const handleIncrease = (menuIdx) => {
        const selectedMenuIdxs = Object.keys(quantities);
        const alreadySelected = selectedMenuIdxs.includes(menuIdx.toString());

        if (!alreadySelected && selectedMenuIdxs.length >= 1) {
            alert("하나의 메뉴만 선택할 수 있습니다.");
            return;
        }

        setQuantities((prev) => ({
            ...prev,
            [menuIdx]: (prev[menuIdx] || 0) + 1,
        }));
    };

    const handleDecrease = (menuIdx) => {
        setQuantities((prev) => {
            const current = prev[menuIdx] || 0;
            if (current <= 1) {
                const newQuantities = { ...prev };
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

        const [menu, setMenu] = useState({
            menuIdx: 0,
            rsvMenuCount: 0,
        });

        const userIdx = 1;
        const resIdx = 22;

        axios.post(`http://localhost:8080/api/menu/select/${userIdx}/${resIdx}`, {
            menuIdx: menu.menuIdx,
            resMenuCount: menu.rsvMenuCount
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
            <div style={{ padding: '20px' }}>
                <h2 className="waiting-title-sub">메뉴 선택</h2>

                {menuItems.length === 0 ? (
                    <p>메뉴를 불러오는 중입니다...</p>
                ) : (
                    menuItems.map((item) => (
                        <div
                            key={item.menuIdx}
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                borderBottom: '1px solid #eee',
                                paddingBottom: '20px',
                                marginBottom: '20px',
                            }}
                        >
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
                                    <span style={{ margin: '0 10px' }}>
                                        {quantities[item.menuIdx] || 0}
                                    </span>
                                    <button className="next-btn" onClick={() => handleIncrease(item.menuIdx)}>+</button>
                                </div>
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                                    {item.menuName}
                                </div>
                                <div style={{ fontSize: '14px', color: '#555', marginTop: '4px' }}>
                                    {item.menuExplanation}
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
                            const menu = menuItems.find((item) => item.menuIdx.toString() === menuIdx);
                            return (
                                <li
                                    key={menuIdx}
                                    style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}
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
                        <Button btnName={'다음'} onClick={handleSubmit} />
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MenuSelector;
