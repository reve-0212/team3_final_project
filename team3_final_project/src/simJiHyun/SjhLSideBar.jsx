function SjhLSideBar() {
    return (
        <div className={"col-3 align-items-center"}
             style={{backgroundColor: '#FAFAFA', height: '100vh'}}>
            <ul style={{listStyle: 'none'}}>
                <li style={{marginTop: '20px', color: '#5D4037'}}>홈</li>
                <li style={{marginTop: '20px', color: '#5D4037'}}>가게 정보</li>
                <li style={{marginTop: '20px', color: '#5D4037'}}>가게 통계</li>
                <hr style={{marginTop: '20px', marginRight: '20px', backgroundColor: '#F2F2F2'}}/>
                <li style={{marginTop: '20px', color: '#5D4037'}}>가게 메뉴</li>
                <li style={{marginTop: '20px', color: '#5D4037'}}>리뷰 관리</li>
            </ul>
        </div>
    );
}

export default SjhLSideBar