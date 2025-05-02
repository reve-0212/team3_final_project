import WaBanner from "../KimSangMin/WaBanner.jsx";
import {useState} from "react";
import "./CeoMenuList.css"
import {useNavigate} from "react-router-dom";

function CeoMenuList() {

    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState(''); // 사용자가 입력한 검색어
    const [searchKeyword, setSearchKeyword] = useState(''); // 검색 버튼 누른 뒤 확정된 값

    // 더미
    const menuList = [
        {
            id: 1,
            name: '김치찌개',
            price: 8000,
            description: '진한 국물의 한국 전통 찌개입니다.',
            imageUrl: 'https://i.namu.wiki/i/xL-2HW3J4OiXkmNKUw_W6cdP00Mn82IyUM0Vh7FQtTZLSo-dglgtvr2s0X4f2JyhB-lhI_2Szfe5Rv9KBC6sR3NaTQorLxN8C-tx_IZoufEqsS6AsL3KMwfIMQ_tFzT-P2FXIomZJRMUl7sKhRTN_Q.webp'
        },
        {
            id: 2,
            name: '불고기',
            price: 12000,
            description: '달콤한 간장 소스에 재운 소고기 요리입니다.',
            imageUrl: 'https://i.namu.wiki/i/9J4ompBW5dVO8tWN6b_FiQom3Zp0MtjVAbXt3RRZkBw0k18x66Mp0kI9YufnaMiK67FMu00n1pkw60GRVQadHtJiS38NOw-ld71BO0MqmphfFoqEVQ0ESwgGgepXy9-7aov7aJS93WJq_MFA4YvpXA.webp'
        },
    ];

    // 검색어에 따라 필터링된 리스트
    const filteredMenu = menuList.filter(menu =>
        menu.name.includes(searchKeyword) // 포함된 메뉴만 보여줌
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
        navigate("/pre/NewMenu");
    };

    return (
        <div className={'ceo-menu-main'}>
          <WaBanner />
          <div style={{ marginTop: '10vh', marginLeft: '200px', position: 'relative' }}>
              <h2 className={'new-menu-title mb-4'}>가게 메뉴</h2>
              <div className={'menu-search-box d-flex align-items-center'} style={{ borderRadius: '2rem', overflow: 'hidden', width: '500px', paddingRight: '5px', marginLeft: '3rem'}}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown} // 엔터키 검색 이벤트
                    placeholder={'검색어를 입력하세요'}
                    className={'menu-search-input'}
                    style={{ border: 'none', width: '100%', height: '100%'}}
                  />
                  <button className="btn" style={{ height: '3.5vw', whiteSpace: 'nowrap', paddingRight: '2rem' }} onClick={handleSearchButtonClick}>검색</button>
              </div>
              <hr />
              <div className={'d-flex gap-3 justify-content-end mt-4 me-5'}>
                  <button className={'btn btn-menu-edit'}>메뉴판 수정</button>
                  <button className={'btn btn-menu-add'} onClick={handleAdd}>+ 메뉴 추가</button>
              </div>
              <div className={'menu-list-container mt-4'}>
                  <ul className={'list-unstyled'}>
                      {filteredMenu.map(menu => (
                          <li key={menu.id} className={'border-bottom py-3 mx-3 d-flex align-items-start justify-content-between flex-wrap menu-item'}>
                              <div className={'flex-grow-1'} style={{ minWidth: '150px' }}>
                                  <h5 className={'mb-1'}>{menu.name}</h5>
                                  <small className={'text-muted'}>{menu.price}원</small>
                              </div>
                              <div className={'flex-grow-2 text-start text-muted'} style={{ minWidth: '200px' }}>
                                  {menu.description}
                              </div>
                              <div className={'flex-grow-1 text-end'} style={{ minWidth: '100px' }}>
                                  <img src={menu.imageUrl} alt={menu.name} className={'img-fluid rounded'} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                              </div>
                          </li>
                      ))}
                  </ul>
              </div>
          </div>

        </div>
    );
}

export default CeoMenuList