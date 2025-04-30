import React from "react";
import Button from "./Button.jsx";

function BookReg({bkReg}) {
    return (
        <div className={'app-container'}>
            <section>
                <h3 className={'waiting-title'}>
                    {bkReg.bkName}에 예약하시겠어요?
                </h3>
            </section>
            <section>
                <ul className={'d-flex justify-content-between mb-2 fw-bold'}>
                    <li>이용 방식</li>
                    <li>먹고갈게요 (매장 내 취식)</li>
                </ul>
                <ul className={'d-flex justify-content-between mb-2 fw-bold'}>
                    <li>예약 메뉴</li>
                    <li>{bkReg.bkFood}</li>
                </ul>
                <ul className={'d-flex justify-content-between mb-2 fw-bold'}>
                    <li>총 입장 인원</li>
                    <li>{bkReg.bkPerson}명</li>
                </ul>
                <ul className={'d-flex justify-content-between mb-2 fw-bold'}>
                    <li>예약 일시</li>
                    <li>{bkReg.bkDate}</li>
                </ul>
            </section>
            <section className={'p-3'} style={{background:'#ececec', borderRadius: '10px'}}>
                <div className={'waiting-title-sub pb-2'} style={{color:'#FFA31C'}}>매장 예약시 유의사항</div>
                <p>{bkReg.bkNotice}</p>
                <div></div>


            </section>
            <Button btnName={'예약 등록하기'} />
        </div>
    );
}

export default BookReg






