import React from 'react';
import { Link } from "react-router-dom";
// import SeatLayout from './SeatLayout';

const ReservationPage = () => {
  return (
      <div>
        <h1>레스토랑 좌석 배치도</h1>
        <Link to="/pre/loadSeat/1">1번 레스토랑 좌석 보기</Link>
      </div>
  );
};

export default ReservationPage;
