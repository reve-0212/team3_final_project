import {useEffect, useState} from "react";
import ReBanner from "./ReBanner.jsx";
import {useParams} from "react-router-dom";
import axios from "axios";

function PreRe() {
  const { resIdx } = useParams();
  const [reviews, setReviews] = useState([]);
  // 답글 상태관리
  // const [edIndex, setEdIndex] = useState (null);
  // const [chReply, setChReply] = useState("");

  useEffect(() => {
    fetchReviews();
  }, [resIdx]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/pre/review/list`, {
        params: { resIdx }
      });
      setReviews(response.data);
    } catch (err){
      console.error("리뷰 불러오기 실패 : ", err);
    }
  };

  // 답글 수정하기
  // const upIndex = (index) => {
  //   setEdIndex(index);
  //   setChReply(reviews[index].reply || "");
  // };

  // 답글 저장하기
  // const saIndex = async (index) => {
  //   try {
  //     const review = reviews[index];
  //     const payload = {
  //       reviewIdx: review.reviewIdx,
  //       reviewOwnerContents: chReply
  //     };
  //
  //     await axios.post("http://localhost:8080/reply", payload);
  //
  //     await fetchReviews(); // 등록 후 리스트 다시 불러오기
  //     const newReviews = [...reviews];
  //     newReviews[index].reviewOwnerContents = chReply;
  //     setReviews(newReviews);
  //     setEdIndex(null);
  //   } catch (err) {
  //     console.error("답글 저장 실패 : ", err);
  //   }
  // };

  // 답글 삭제하기
  // const delReply = async (index) => {
  //   try {
  //     const review = reviews[index];
  //
  //     const payload = {
  //       reviewIdx: review.reviewIdx,
  //       reviewOwnerContents: ""
  //     };
  //     await axios.post("http://localhost:8080/reply", payload);
  //
  //     const newReviews = [...reviews];
  //     newReviews[index].reviewOwnerContents = "";
  //     setReviews(newReviews);
  //   } catch (err) {
  //     console.error("답글 삭제 실패 : ", err);
  //     alert("답글 삭제 실패");
  //   }
  // };

  return (
      <div
          style={{
            marginLeft: "250px",
            paddingTop: "8rem",
            paddingLeft: "1rem",
            width: "calc(100% - 200px)",
            // maxWidth: "1000px",
            minHeight: "100vh",
          }} className={'container'}
      >
        <ReBanner/>
        <div className={'d-flex gap-3 justify-content-start align-items-center me-5'}>
          <h2 className={'new-menu-title'}>리뷰 관리</h2>

          {/*검색창*/}
          <div className={'menu-search-box d-flex align-items-center'} style={{
            borderRadius: '2rem',
            overflow: 'hidden',
            width: '500px',
            paddingRight: '5px',
            marginLeft: '3rem'
          }}>
            <input
                type="text"
                placeholder={'검색어를 입력하세요'}
                className={'menu-search-input'}
                style={{border: 'none', width: '100%', height: '100%'}}
            />
            <button className="btn"
                    style={{height: '3.5vw', whiteSpace: 'nowrap', paddingRight: '2rem'}}
                    >검색
            </button>
          </div>
        </div>
        <hr/>
        <ul className="list-group">
          {reviews.map((review, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                {/* 왼쪽 내용 */}
                <div className="text-start w-100">
                  <div><strong>작성자:</strong> {review.userNick}</div>
                  <div><strong>작성일:</strong> {review.reviewWriteDate}</div>
                  <div><strong>별점:</strong> {'⭐'.repeat(review.reviewRating)}</div>
                  <div><strong>리뷰:</strong> {review.reviewContent}</div>
                  {/*<div className="mt-2">*/}
                  {/*  <strong>답글:</strong>*/}
                  {/*  {edIndex === index ? (*/}
                  {/*      <textarea*/}
                  {/*          value={chReply}*/}
                  {/*          onChange={(e) => setChReply(e.target.value)}*/}
                  {/*          className="form-control mt-1"*/}
                  {/*      />*/}
                  {/*  ) : (*/}
                  {/*      <div>{review.reviewOwnerContents}</div>*/}
                  {/*  )}*/}
                  {/*</div>*/}
                </div>

                {/* 오른쪽 - 사진 + 버튼 */}
                <div className="d-flex flex-column align-items-end ms-3" style={{minWidth: '120px'}}>
                  <img
                      src={review.reviewImage1}
                      alt="리뷰 이미지"
                      style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  {/*<div className="mt-2 d-flex gap-2">*/}
                  {/*  {edIndex === index ? (*/}
                  {/*      <button className="btn btn-sm btn-outline-success" onClick={() => saIndex(index)}>저장</button>*/}
                  {/*  ) : review.reviewOwnerContents ? (*/}
                  {/*      <>*/}
                  {/*        <button className="btn btn-sm btn-outline-secondary" onClick={() => upIndex(index)}>수정</button>*/}
                  {/*        <button className="btn btn-sm btn-outline-danger" onClick={() => delReply(index)}>삭제</button>*/}
                  {/*      </>*/}
                  {/*  ) : (*/}
                  {/*      <button className="btn btn-sm btn-outline-primary" onClick={() => upIndex(index)}>작성</button>*/}
                  {/*  )}*/}
                  {/*</div>*/}
                </div>
              </li>
          ))}
        </ul>

      </div>
  );
}
export default PreRe;
