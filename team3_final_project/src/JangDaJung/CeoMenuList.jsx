import {useEffect, useState} from "react";
import "./css/CeoMenuList.css"
import {useNavigate, useParams} from "react-router-dom";
import ReBanner from "../KimSangMin/ReBanner.jsx";
import axios from "axios";

function CeoMenuList() {

    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState(''); // 사용자가 입력한 검색어
    const [searchKeyword, setSearchKeyword] = useState(''); // 검색 버튼 누른 뒤 확정된 값

    const [menuList, setMenuList] = useState([]);
    // const [resIdx, setResIdx] = useState(null);

    const { resIdx } = useParams();

    // 메뉴 불러오기
    useEffect(() => {
        if (!resIdx) return;

        axios.get('http://localhost:8080/menu/list', {
            params: {resIdx}
        })
            .then(response => {
                setMenuList(response.data);
            })
            .catch(err => {
                console.error("메뉴 불러오기 실패", err);
            });
    }, [resIdx]);

    // 검색어에 따라 필터링된 리스트
    const filteredMenu = menuList.filter(menu =>
        menu.menuName.includes(searchKeyword) // 포함된 메뉴만 보여줌
    );

    const handleSearchButtonClick = () => {
        setSearchKeyword(searchQuery); // 검색 버튼 누르면 확정
    };

    // 엔터 키 눌렀을 때 검색되게 하는 함수
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setSearchKeyword(searchQuery);
        }
    };

    // 메뉴 등록 버튼
    const handleAdd = () => {
        navigate(`/pre/NewMenu/${resIdx}`);
    };

    // 메뉴판 수정 버튼
    const handleListEdit = () => {
        navigate(`/pre/MenuListEdit/${resIdx}`)
    }

    // 리스트 클릭시 해당 메뉴 수정 페이지로 이동
    const handleEdit = (menuIdx) => {
        navigate(`/pre/MenuEdit/${resIdx}/${menuIdx}`);
    };

  // 숨기기 취소
  const handleUnhidden = (menuIdx) => {
    axios.put(`http://localhost:8080/menu/unHidden/${menuIdx}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      }
    })
      .then(() => {
        setMenuList((prev) =>
          prev.map((menu) =>
            menu.menuIdx === menuIdx ? { ...menu, menuHidden: false } : menu
          )
        );
      })
      .catch(err => {
        console.error("숨기기 취소 실패", err);
      });
  };

  // 품절 취소
  const handleUnsoldOut = (menuIdx) => {
    axios.put(`http://localhost:8080/menu/unSoldOut/${menuIdx}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      }
    })
      .then(() => {
        setMenuList((prev) =>
          prev.map((menu) =>
            menu.menuIdx === menuIdx ? { ...menu, menuSoldOut: false } : menu
          )
        );
      })
      .catch(err => {
        console.log("품절 취소 실패", err);
      });
  };

    return (
        <>
        <ReBanner />
            <div style={{
                marginLeft: "250px",
                paddingTop: "8rem",
                paddingLeft: "1rem",
                width: "calc(100% - 200px)",
                maxWidth: "165vh",
                minHeight: "100vh",
            }} className={'container'}>
                <div>

                    <div className={'d-flex gap-3 justify-content-start align-items-center me-5 ms-3'}>
                        <h2 className={'new-menu-title'}>가게 메뉴</h2>
                        {/*검색창*/}
                        <div className={'menu-search-box d-flex align-items-center'} style={{
                            borderRadius: '2rem',
                            overflow: 'hidden',
                            width: '500px',
                            paddingRight: '5px',
                            marginLeft: '3rem'
                        }}>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown} // 엔터키 검색 이벤트
                                placeholder={'검색어를 입력하세요'}
                                className={'menu-search-input'}
                                style={{border: 'none', width: '100%', height: '100%'}}
                            />
                            <button className="btn"
                                    style={{height: '3.5vw', whiteSpace: 'nowrap', paddingRight: '2rem'}}
                                    onClick={handleSearchButtonClick}>검색
                            </button>
                        </div>
                    </div>

                    <hr/>
                    <div style={{ marginLeft: '5rem', marginRight: '5rem'}}>
                        <div className="d-flex flex-column align-items-end ms-3 mt-2">
                            <div className="d-flex gap-2">
                                <button className="btn btn-menu-edit" onClick={handleListEdit}>메뉴판 수정</button>
                                <button className="btn btn-menu-add" onClick={handleAdd}>+ 메뉴 추가</button>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-start mt-4 mb-4">
                            <div className="flex-grow-1">
                                <div className="menu-list-container">
                                    <ul className="list-unstyled">
                                        {filteredMenu.map(menu => (
                                            <li key={menu.menuIdx}
                                                className="border-bottom py-3 d-flex align-items-start justify-content-between flex-wrap menu-item"
                                                onClick={() => handleEdit(menu.menuIdx)}>
                                                {/* 1. 이름, 가격 */}
                                                <div style={{ flexBasis: '30%', flexShrink: 0 }}>
                                                    <h5 className="mb-1">
                                                        {menu.menuName}{" "}
                                                        {menu.menuSoldOut && (
                                                            <span style={{ color: "red", fontSize: "0.8rem" }}>(품절)</span>
                                                        )}
                                                        {menu.menuHidden && (
                                                            <span style={{ color: "red", fontSize: "0.8rem" }}>(숨김)</span>
                                                        )}
                                                    </h5>
                                                    <small className="text-muted d-block">{menu.menuPrice}원</small>
                                                </div>

                                                {/* 2. 설명 */}
                                                <div className="text-start text-muted d-flex flex-column justify-content-between"
                                                     style={{ flexBasis: '50%', flexShrink: 0 }}>
                                                    <div>{menu.menuExplanation}</div>
                                                    <div className="mt-2 text-end">
                                                        {menu.menuHidden && (
                                                            <button
                                                                className="btn btn-sm btn-outline-danger mt-2"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleUnhidden(menu.menuIdx);
                                                                }}
                                                            >
                                                                숨기기 해제
                                                            </button>
                                                        )}
                                                        {menu.menuSoldOut && (
                                                            <button
                                                                className="btn btn-sm btn-outline-danger mt-2"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleUnsoldOut(menu.menuIdx);
                                                                }}
                                                            >
                                                                품절 해제
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* 3. 이미지 */}
                                                <div className="text-end" style={{ flexBasis: '20%', flexShrink: 0 }}>
                                                    <img
                                                        src={menu.menuImage}
                                                        alt={menu.menuName}
                                                        className="img-fluid rounded"
                                                        style={{
                                                            width: '80px',
                                                            height: '80px',
                                                            objectFit: 'cover',
                                                            opacity: menu.menuSoldOut || menu.menuHidden ? 0.5 : 1,
                                                        }}
                                                    />
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CeoMenuList