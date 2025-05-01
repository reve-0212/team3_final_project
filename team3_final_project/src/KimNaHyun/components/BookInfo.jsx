import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faCircleExclamation, faLocationDot, faPen} from "@fortawesome/free-solid-svg-icons";
import StoreMap from "./StoreMap.jsx";
import WaitingInfo from "./WaitingInfo.jsx";
import Button from "./Button.jsx";

function BookInfo({bkinfo}) {


    return (
        <div className={'app-container'}>
          <section>
            <h3>{bkinfo.bkStoreName} <FontAwesomeIcon icon={faAngleRight} /></h3>
            <div className={'text-secondary'}>{bkinfo.bkStoreSort}</div>
          </section>
          <section>

          </section>
          <section>
            <ul className={'d-flex  mb-2 waiting-title-sub basic-font'}>
              <li><FontAwesomeIcon icon={faPen}/></li>
              <li style={{paddingLeft:'6px'}}>등록정보</li>
            </ul>
            <ul className={'d-flex justify-content-between mb-2 fw-bold'}>
              <li>이용 방식</li>
              <li>먹고 갈게요 (매장 내 취식)</li>
            </ul>
            <ul className={'d-flex justify-content-between mb-2 fw-bold'}>
              <li>선택 메뉴</li>
              <li>{bkinfo.bkStoreFood}</li>
            </ul>
            <ul className={'d-flex justify-content-between mb-2 fw-bold'}>
              <li>총 입장 인원</li>
              <li>{bkinfo.bkTotalPeople}명</li>
            </ul>
            <ul className={'d-flex justify-content-between mb-2 fw-bold'}>
              <li>예약 일시</li>
              <li>{bkinfo.bkDate}</li>
            </ul>
          </section>
          <section>
            <ul className={'d-flex  mb-2 waiting-title-sub basic-font'}>
              <li><FontAwesomeIcon icon={faLocationDot}/></li>
              <li style={{paddingLeft:'6px'}}>매장 위치</li>
            </ul>
            <StoreMap />

          </section>
          <section>
            <ul className={'d-flex mb-2 waiting-title-sub basic-font'}>
              <li><FontAwesomeIcon icon={faCircleExclamation}/></li>
              <li style={{paddingLeft:'6px'}}>매장 유의사항</li>
            </ul>
            <div>{bkinfo.bkNoticeContent}</div>


          </section>

          <Button btnName={'예약 취소하기'}/>
        </div>
    );
}

export default BookInfo






