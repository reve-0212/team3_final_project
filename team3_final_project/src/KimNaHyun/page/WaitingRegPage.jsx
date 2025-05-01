import React from "react";
import WaitingReg from '../components/WaitingReg.jsx';
import WaitingInfo from "../components/WaitingInfo.jsx";

function WaitingRegPage() {
  const regInfoObj = {
    regName : "런던베이글 뮤지엄",
    regTeams : 22,
    regPerson: 5,
    regNotice: "저희매장 유의사항 입니다."
  }
  return (
      <WaitingReg reg={regInfoObj} />
  );
}
export default WaitingRegPage






