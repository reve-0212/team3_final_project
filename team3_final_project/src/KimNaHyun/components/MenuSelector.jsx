import React, { useState } from 'react';
import Button from "./Button.jsx";
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const MenuSelector = () => {
    const Nv = useNavigate();

    const menuItems = [
        {
            id: 1,
            name: '기본 베이글',
            description: '담백하고 쫄깃한 기본 베이글입니다.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Bagel.jpg',
        },
        {
            id: 2,
            name: '블루베리 베이글',
            description: '상큼한 블루베리로 채워진 베이글입니다.',
            image: 'https://m.shinjinbakery.com/web/product/big/202310/577012d6dd81a7e5759dd4a0b4a78b78.jpg',
        },
        {
            id: 3,
            name: '치즈 베이글',
            description: '고소한 치즈가 듬뿍 들어간 베이글입니다.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Bagel.jpg',
        },
        {
            id: 4,
            name: '초코맛 베이글',
            description: '달콤한 초콜릿이 가득한 베이글입니다.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Bagel.jpg',
        },
    ];

    const [quantities, setQuantities] = useState({});

    const handleIncrease = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    const handleDecrease = (id) => {
        setQuantities((prev) => {
            const current = prev[id] || 0;
            if (current <= 1) {
                const newQuantities = {...prev};
                delete newQuantities[id];
                return newQuantities;
            }
            return {
                ...prev,
                [id]: current - 1,
            };
        });
    };

    return (
        <div className="app-container container py-4">
            <h3 className="waiting-title">메뉴를 선택하세요</h3>
            <div style={{padding: '20px'}}>
                <h2 className="waiting-title-sub">메뉴 선택</h2>

                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            borderBottom: '1px solid #eee',
                            paddingBottom: '20px',
                            marginBottom: '20px',
                        }}
                    >
                        {/* 이미지 + 수량 버튼 (세로) */}
                        <div style={{
                            marginRight: '15px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start'
                        }}>
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                    marginRight: '15px',
                                    display: 'flex',
                                    width: "120px",
                                    borderRadius: '10px',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                }}
                            />
                            <div style={{
                                marginTop: '10px',
                                border: '1px solid #dddddd',
                                padding: '0 10px',
                                borderRadius: '10px'
                            }}>
                                <button className="prev-btn" onClick={() => handleDecrease(item.id)}>-</button>
                                <span style={{margin: '0 10px'}}>{quantities[item.id] || 0}</span>
                                <button className="next-btn" onClick={() => handleIncrease(item.id)}>+</button>
                            </div>
                        </div>

                        {/* 이름 + 설명 */}
                        <div style={{flex: 1}}>
                            <div style={{fontWeight: 'bold', fontSize: '16px'}}>{item.name}</div>
                            <div style={{fontSize: '14px', color: '#555', marginTop: '4px'}}>
                                {item.description}
                            </div>
                        </div>
                    </div>
                ))}

                {Object.keys(quantities).length === 0 ? (
                    <p className="waiting-title-sub">메뉴를 선택해주세요.</p>
                ) : (
                    <ul>
                        {Object.entries(quantities).map(([id, quantity]) => {
                            const menu = menuItems.find((item) => item.id.toString() === id);
                            return (
                                <li key={id} style={{marginBottom: '12px', display: 'flex', alignItems: 'center'}}>
                                    <img
                                        src={menu.image}
                                        alt=""
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            marginRight: '10px',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <span>{menu.name} {quantity}개</span>
                                </li>
                            );
                        })}
                        <Button btnName={'다음'}/>
                    </ul>
                )}

                <button type={"button"} className={"btn rounded-3"}
                        style={{color: "#A9A9A9"}}
                        onClick={() => {
                            Nv("/book/reg")
                        }}>다음으로
                </button>
            </div>
        </div>
    );
};

export default MenuSelector;





