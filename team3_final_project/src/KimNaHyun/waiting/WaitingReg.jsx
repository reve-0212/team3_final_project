import Button from "./Button.jsx";



function WaitingReg() {
    return (
        <div className={'app-container'}>
          <section>
            <h3 className={'waiting-title'}>런던베이글 뮤지엄에 웨이팅 등록 하시겠어요?</h3>
            <div  style={{border: '1px solid #dddddd', padding: '40px 10px', borderRadius: '10px'}}>
              <div>현재 웨이팅</div>
              <h4  style={{fontSize:'30px', color:'#FFA31C', fontWeight:'bold'}}>22팀</h4>
            </div>
          </section>
          <section>
            <div>
              <ul className={'d-flex justify-content-between mb-2'}>
                <li>이용방식</li>
                <li>먹고갈게요(매장 내 취식)</li>
              </ul>
              <ul className={'d-flex justify-content-between mb-2'}>
                <li>총 입장 인원</li>
                <li>2명</li>
              </ul>
            </div>
          </section>
          <section>
            <div style={{textAlign:'left', background:'#fcfcfc', padding: '50px 10px', borderRadius:'15px'}}>
              <div style={{fontSize:'20px', color:'#FFA31C', fontWeight:'bold'}}>매장웨이팅 유의사항</div>
              <div>
                매장 내 취식 등록시, 매장 내 취식/포장 모두 이용가능합니다.
              </div>
            </div>

          </section>



          <Button btnName={'웨이팅 등록하기'}/>
        </div>
    );
}

export default WaitingReg






