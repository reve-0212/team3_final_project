import React from "react";
import ReciptIcon from "../svg/ReciptIcon.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import SpeechBubble from "../svg/SpeechBubble.jsx";
import {Link} from "react-router-dom";

function MyPageContent() {

    return (
        <div className={'container py-4 vh-100'}>
            <div className={'mt-3 border-bottom pb-3'}>
                <p className="text-muted small fs-7">결제</p>
                <div className={'d-flex justify-content-between'}>
                    <p className="mb-1 fs-6 fs-sm-4 ms-1"><span className={'me-3'}><ReciptIcon/></span>예약 내역</p>
                    <Link className={'text-muted'} to={'/user/ReceiptList'}><FontAwesomeIcon icon={faAngleRight} className={'me-2'} /></Link>
                </div>
            </div>
            <div className={'mt-3 pt-3'}>
                <p className="text-muted small fs-7">이용 정보</p>
                <div className={'d-flex justify-content-between'}>
                    <p className="mb-1 fs-6 fs-sm-4 ms-1"><span className={'me-3'}><SpeechBubble/></span>내 리뷰 관리</p>
                    <Link className={'text-muted'} to={'/user/ReviewList'}><FontAwesomeIcon icon={faAngleRight} className={'me-2'} /></Link>
                </div>
            </div>
        </div>
    );
}

export default MyPageContent