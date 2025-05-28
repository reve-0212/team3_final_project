import Button from "./Button.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faCircleUser, faLocationDot, faCircleExclamation, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import StoreMap from "./StoreMap.jsx";
function WaitingInfo({info}) {


    // 부모객체에서 받아온 값을 수정할 수 있는 방법 1
    const [WaitingInfo, setWaitingInfo] = useState(info);

    useEffect(() => {
        setWaitingInfo(info);
    }, [info]);

    const handleClick = () =>{
        setWaitingInfo(...WaitingInfo);
    }

    return (
        <div className={'app-container  container py-4'}>
            <section>
                <h3>{info.storeName} <FontAwesomeIcon icon={faAngleRight} /></h3>
                <div className={'text-secondary'}>{info.storeSort}</div>

            </section>
            <section>
                <ul className={'d-flex mb-2 waiting-title-sub basic-font'}>
                    <li><FontAwesomeIcon icon={faCircleUser}/></li>
                    <li style={{paddingLeft:'6px'}}>나의순서</li>
                </ul>
                <ul className={'lh-lg'}>
                    <li><span className={'point-font'}>{info.waitingTeams}</span> 번째</li>
                    <li className={'fw-bold'}>웨이팅 번호 {info.waitingNum} 번</li>
                    <li className={'text-secondary'}>{info.waitingDate} 등록</li>
                </ul>
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
                    <li>총 입장 인원</li>
                    <li>{info.totalPeople}명</li>
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
                <div>{info.noticeContent}</div>


            </section>

            <Button btnName={'웨이팅 취소하기'} onClick={handleClick}/>
        </div>
    );
}

export default WaitingInfo