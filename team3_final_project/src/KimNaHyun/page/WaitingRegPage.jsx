import React from "react";
import WaitingReg from '../waiting/WaitingReg.jsx';
import WaitingInfo from "../waiting/WaitingInfo.jsx";

function WaitingRegPage() {
  const regInfoObj = {
    regName : "런던베이글 뮤지엄 잠실",
    regTeams : 22,
  }
  return (
      <WaitingReg reg={regInfoObj} />
  );
}
export default WaitingRegPage






