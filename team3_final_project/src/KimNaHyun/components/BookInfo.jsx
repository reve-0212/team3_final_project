import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faCircleExclamation, faLocationDot, faPen} from "@fortawesome/free-solid-svg-icons";
import StoreMap from "./StoreMap.jsx";
import WaitingInfo from "./WaitingInfo.jsx";
import Button from "./Button.jsx";
import CancelPopup from "../../simJiHyun/popUP/cancelPopup.jsx";
import {useState} from "react";

function BookInfo({bkinfo}) {
    // 모달을 열지 말지 결정한다
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className={'app-container container py-4'}>
            <section>
                <h3 style={{color:'#5D4037',fontWeight:'bold'}}>{bkinfo.bkStoreName} <FontAwesomeIcon icon={faAngleRight}/></h3>
                <div className={'text-secondary'}>{bkinfo.bkStoreSort}</div>
            </section>
            <section>

            </section>
            <section>
                <ul className={'d-flex  mb-2 waiting-title-sub basic-font'}>
                    <li><FontAwesomeIcon icon={faPen}/></li>
                    <li style={{paddingLeft: '6px'}}>등록정보</li>
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
                    <li style={{paddingLeft: '6px'}}>매장 위치</li>
                </ul>
                <StoreMap/>

            </section>
            <section>
                <ul className={'d-flex mb-2 waiting-title-sub basic-font'}>
                    <li><FontAwesomeIcon icon={faCircleExclamation}/></li>
                    <li style={{paddingLeft: '6px'}}>매장 유의사항</li>
                </ul>
                <div>{bkinfo.bkNoticeContent}</div>


            </section>

            <Button btnName={'예약 취소하기'} onClick={() => {
                setOpenModal(true)
            }}/>
            {/*A && B 일 때 둘다 true 라면 B 렌더링
                        onClose 함수를 넘긴다 (openModal 상태를 false 로 만든다)*/}
            {openModal && <CancelPopup onClose={() => setOpenModal(false)}/>}
        </div>
    );
}

export default BookInfo






