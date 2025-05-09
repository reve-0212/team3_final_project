import BookInfo from "../components/BookInfo.jsx";
import React from "react";


function BookInfoPage() {
  const bkInfoObj = {
    bkStoreName : "런던베이글 뮤지엄 잠실",
    // 카테고리
    bkStoreSort : "카페/디저트 잠실",
    bkStoreFood: "블루베리 베이글 3개",
    bkDate : "2025-01-11 14:50",
    bkTotalPeople : 3,
    bkNoticeContent : "매장내 유의사항 1. 노쇼금지 ~~"
  }

  return (
      <>
        <BookInfo bkinfo={bkInfoObj} />
      </>
    );
}

export default BookInfoPage






