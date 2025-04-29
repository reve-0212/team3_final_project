import React from "react";
import WaitingReg from '../waiting/WaitingReg.jsx';
import WaitingRegPage from "./WaitingRegPage.jsx";
import WaitingInfo from "../waiting/WaitingInfo.jsx";
import Header from "../../JeongSeongYun/layout/Header.jsx";

function WaitingInfoPage() {

  const waitingInfoObj = {
    storeName : "런던베이글 뮤지엄 잠실",
    storeSort : "카페/디저트 잠실",
    waitingTeams : 22,
    waitingNum : 100,
    waitingDate : "2025-01-11 14:50",
    totalPeople : 3,
    noticeContent : "매장내 유의사항 1. 노쇼금지 ~~"
  }

  return (
      <>
        <WaitingInfo info={waitingInfoObj} />
      </>


  );
}
export default WaitingInfoPage






