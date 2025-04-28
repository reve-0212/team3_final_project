import Button from "./Button.jsx";
function WaitingInfo() {
    return (
        <div className={'app-container'}>
          <section>
            <h3>런던 베이글 뮤지엄 잠실</h3>
            <div>카페, 디저트 · 잠실</div>

          </section>
          <section>
            <ul className={'d-flex justify-content-between mb-2'}>
              <li>이모티콘</li>
              <li>나의순서</li>
              <li>새로고침</li>
            </ul>
            <ul>
             <li>22번째</li>
              <li>웨이팅 번호 173번</li>
              <li>2025.04.24 12:29 등록</li>
            </ul>
          </section>
          <section>

          </section>
          <section>

          </section>
          <section>

          </section>

          <Button btnName={'웨이팅 취소하기'} />
        </div>
    );
}

export default WaitingInfo






