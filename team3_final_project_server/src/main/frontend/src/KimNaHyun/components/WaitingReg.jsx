import React, {useState} from "react";
import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";

function WaitingReg({reg}) {
    const Nv = useNavigate()
    // 모달을 열지 말지 결정한다
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className={'app-container container py-4'}>
            <section>
                <h3 className={'waiting-title'}>
                    {reg.regName}에 <br />웨이팅 등록 하시겠어요?
                </h3>
                <div style={{ border: '1px solid #dddddd', padding: '40px 10px', borderRadius: '10px', textAlign:'center'}}>
                    <div>현재 웨이팅</div>
                    <h4 className={'point-font pt-2'}>
                        {reg.regTeams}팀
                    </h4>
                </div>
            </section>
            <section>
                <ul className={'d-flex justify-content-between mb-2 fw-bold'}>
                    <li>이용 방식</li>
                    <li>먹고갈게요 (매장 내 취식)</li>
                </ul>
                <ul className={'d-flex justify-content-between mb-2 fw-bold'}>
                    <li>총 입장 인원</li>
                    <li>{reg.regPerson}명</li>
                </ul>
            </section>
            <section className={'p-3'} style={{background:'#FFF8E1', borderRadius: '10px'}}>
                    <div className={'waiting-title-sub pb-2'} style={{color:'#FFA31C'}}>매장 예약시 유의사항</div>
                    <p>{reg.regNotice}</p>
                <div></div>


            </section>
            <Button btnName={'웨이팅 등록하기'} onClick={()=>{Nv("/waiting/info")}}/>
        </div>
    );
}

export default WaitingReg;







