import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import ReBanner from "./ReBanner.jsx";
import axios from "axios";

function PreReSet() {
  // restData : 가게에 입력하고자하는 기본정보 저장객체
  const [restData, setRestData] = useState({
    Name: "가게이름",
    Call: "가게번호",
    Address1: "가게주소",
    Address2: "가게 해시태그",
    Introduce: "가게 소개",
    resTime: []
  });


  const options = [
    {value: "중앙동", label: "중앙동"},
    {value: "대청동", label: "대청동"},
    {value: "동광동", label: "동광동"},
    {value: "남포동", label: "남포동"},
    {value: "영주동", label: "영주동"},
    {value: "대신동", label: "대신동"},
    {value: "초량동", label: "초량동"},
    {value: "부평동", label: "부평동"},
    {value: "동대신동", label: "동대신동"},
    {value: "서대신동", label: "서대신동"},
    {value: "충무동", label: "충무동"},
    {value: "아미동", label: "아미동"},
    {value: "서서동", label: "서서동"},
    {value: "범일동", label: "범일동"},
    {value: "좌천동", label: "좌천동"},
    {value: "만덕동", label: "만덕동"},
    {value: "영도동", label: "영도동"},
    {value: "해양동", label: "해양동"},
    {value: "동삼동", label: "동삼동"},
    {value: "전포동", label: "전포동"},
    {value: "범천동", label: "범천동"},
    {value: "온천동", label: "온천동"},
    {value: "명장동", label: "명장동"},
    {value: "사직동", label: "사직동"},
    {value: "용호동", label: "용호동"},
    {value: "대연동", label: "대연동"},
    {value: "감만동", label: "감만동"},
    {value: "구포동", label: "구포동"},
    {value: "덕천동", label: "덕천동"},
    {value: "우동", label: "우동"},
    {value: "중동", label: "중동"},
    {value: "송정동", label: "송정동"},
    {value: "하단동", label: "하단동"},
    {value: "괴정동", label: "괴정동"},
    {value: "신평동", label: "신평동"},
    {value: "장전동", label: "장전동"},
    {value: "부곡동", label: "부곡동"},
    {value: "대저동", label: "대저동"},
    {value: "녹산동", label: "녹산동"},
    {value: "거제동", label: "거제동"},
    {value: "연산동", label: "연산동"},
    {value: "수영동", label: "수영동"},
    {value: "민락동", label: "민락동"},
    {value: "괘법동", label: "괘법동"},
    {value: "감전동", label: "감전동"},
  ];

  //  이미지 업로드
  const [img, setImg] = useState(["", "", ""]);
  // 미리보기 활성화 여부
  const [isPreview, setIsPreview] = useState([]);

  const [address, setAddress] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const [resTime, setResTime] = useState([""]);
  const [dongOption, setDongOption] = useState(""); // 기본 옵션 설정
  const [isSave,setIsSave] = useState(false);
  const [resIdx, setResIdx] = useState("");


  //-----------------------------  주소 검색 api로 요청받아오기------------------------
  const openDaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const fullAddress = data.address;
        setRestData((prevData) => ({
          ...prevData,
          Address1: fullAddress,
        }));
      },
    }).open({
      q: address
    });
  };
// ------------------------------------------------------------------------------------------------

  // 이미지 업로드
  const chImage = (e, index) => {
    const newImg = [...img]; // ..img 는 현재이미지 배열을 복사, newImg에 저장
    newImg[index] = e.target.value; // 주어진 index에 해당하는 이미지를 업데이트한다.
    setImg(newImg); // 새로운 이미지를 기존에 이미지 상태에 저장
  }
  const hPreview = () => {
    // 입력된 URL을 미리보기 배열에 추가
    setIsPreview(img.filter(url => url !== ""));
  };

  // 이미지 미리보기
  const imagePreviews = isPreview.map((url, index) => (
      url && (
          <div key={index} style={{display: 'inline-block', marginRight: '10px'}}>
            <img
                src={url}
                alt={`가게 이미지 ${index + 1}`}
                style={{width: '100px', height: '100px', objectFit: 'cover'}}
            />
          </div>
      )
  ));


  // 예약시간 input 추가 / 삭제 기능
  const addTime = () => setResTime([...resTime, ""]);
  const removeTime = () => setResTime(resTime.slice(0, -1));

  // input에 설정한 예약시간 상태 변경
  const chTime = (index, value) => {
    const updatedTime = [...resTime];
    updatedTime[index] = value;
    setResTime(updatedTime);
  };

  const hfChange = (e, field) => {
    setRestData({...restData, [field]: e.target.value});
  };




  // 데이터 불러오기
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:8080/pre/getRestaurant", {  // 사용자 정보 API 호출
        headers: { Authorization: `Bearer ${token}` }
      })
          .then(response => {
            const storeData = response.data;  // 예시로 사용자 가게 정보 받기
            console.log(response.data)
            if (storeData && storeData.Name) {
              setIsSave(false);
              setResIdx(storeData.resIdx);
              setRestData({
                Name : storeData.Name,
                Call : storeData.Call,
                Address1: storeData.Address1,
                Introduce: storeData.Introduce,
              });
              setDongOption(storeData.Address2); // 주소 2부분을 처리
              setResTime(storeData.ReserveTime.split(","));
              setImg([storeData.Image1, storeData.Image2, storeData.Image3]);
            } else {
              setIsSave(true);
            }
          })
          .catch(error => {
            console.log("사용자 정보 가져오기 실패", error);
            if (error.response && error.response.status === 401) {
              alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
            }
          });
    }
  }, [token]);


// 데이터 저장 폼
  const hSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('jwtToken');
    console.log("로컬 스토리지에서 가져온 토큰: ", token);
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const storeData = {
      resName: restData.Name,
      resCall: restData.Call,
      resAddress1: restData.Address1,
      resAddress2: dongOption,
      resIntroduce: restData.Introduce,
      resReserveTime: resTime.filter(Boolean).join(","),
      resImage1: img[0],
      resImage2: img[1],
      resImage3: img[2],
    };

    console.log("저장할 데이터: ", storeData);

    // 가게 저장 시 수정 기능으로 체인지
    if (!isSave && resIdx) {
      axios.put(`http://localhost:8080/pre/updateRest/${resIdx}`, storeData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
          .then(response => {
            console.log("수정 성공", response.data);
            alert("가게 정보가 수정되었습니다.");
          })
          .catch(error => {
            console.log("오류 발생", error);
            alert("수정 중 오류가 발생했습니다.");
          });
    } else {
      // 저장이 안되있을 시에는 기본적으로 저장 버튼 활성화
      axios.post("http://localhost:8080/pre/resave", storeData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
          .then((response) => {
            console.log("저장 성공", response.data);
            alert("가게 정보가 저장되었습니다.");
            setIsSave(true);
          })
          .catch((error) => {
            console.log("오류 발생", error);
            if (error.response && error.response.status === 401) {
              alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
            } else {
              alert("오류가 발생했습니다.");
            }
          });
    }
  };



  return (
      <div
          // style={{
          //   marginLeft: "300px",
          //   paddingTop: "8rem",
          //   paddingLeft: "1rem",
          //   width: "calc(100% - 200px)",
          //   maxWidth: "1000px",
          // }}
      >
        <ReBanner/>
        <form onSubmit={hSubmit}>
          {/* 가게 이미지 설정 */}
          <h4 className="text-start">
            <strong>가게 대표 이미지</strong>
          </h4>
          <div className="mb-4">
            {img.map((url, index) => (
                <input
                    key={index}
                    type="text"
                    className="form-control"
                    style={{width: '300px', height: '35px', marginBottom: '10px'}}
                    placeholder={`이미지 ${index + 1} URL을 입력하세요`}
                    value={url}
                    onChange={(e) => chImage(e, index)}
                />
            ))}
          </div>

          {/* 확인 버튼 */}
          <button type="button" className="btn btn-primary" onClick={hPreview}>
            확인
          </button>

          {/* 미리보기 활성화 */}
          <div style={{marginTop: '20px'}}>
            <h5>미리보기:</h5>
            <div>{imagePreviews}</div>
          </div>


          <hr/>
          <br/>


          {/* 가게 이름 설정 */}
          <h4 className="text-start">
            <strong>가게 이름</strong>
            <span style={{color: "#FFD727", fontSize: "14px"}}> *필수</span>
          </h4>
          <div className="mb-4">
            <input
                type="text"
                id="Name"
                className="form-control"
                style={{width: "300px", height: "50px"}}
                value={restData.Name}
                onChange={(e) => hfChange(e, "Name")}
            />
          </div>


          <hr/>
          <br/>


          <h4 className="text-start">
            <strong>가게 번호</strong>
            <span style={{color: "#FFD727", fontSize: "14px"}}> *필수</span>
          </h4>
          <div className="mb-4">
            <input
                type="text"
                id="Call"
                className="form-control"
                style={{width: "300px", height: "50px"}}
                value={restData.Call}
                onChange={(e) => hfChange(e, "Call")}
            />
          </div>
          <hr/>
          <br/>


          {/* --------------------- 주소 입력 창 / 검색 , 동 선택 ----------------  */}
          <h4 className="text-start">
            <strong>주소 검색 </strong>
            <span style={{color: "#FFD727", fontSize: "14px"}}> *필수</span>
          </h4>
          <div className="mb-4">
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="주소를 입력하세요"
                className="form-control"
                style={{width: "300px", height: "50px", display: "inline-block", marginRight: "10px"}}
            />
            {/*<button type="button" onClick={hSearch} className="btn btn-outline-warning btn-sm">*/}
            {/*  검색*/}
            {/*</button>*/}
            <button type="button" onClick={openDaumPostcode} className="btn btn-outline-warning btn-sm">
              검색
            </button>

            {/*/!* 검색 후 결과 선택 시 값 입력됨 *!/*/}
            {/*<ul style={{marginTop: "10px"}}>*/}
            {/*  {searchResults.map((result, index) => (*/}
            {/*      <li*/}
            {/*          key={index}*/}
            {/*          style={{cursor: "pointer"}}*/}
            {/*          onClick={() => {*/}
            {/*            hfChange({target: {value: result.address_name}}, "Address1");*/}
            {/*            setSearchResults([]);*/}
            {/*            setAddress("");*/}
            {/*          }}*/}
            {/*      >*/}
            {/*        📍 {result.address_name}*/}
            {/*      </li>*/}
            {/*  ))}*/}
            {/*</ul>*/}
          </div>

          <hr/>
          <br/>


          {/* option에 동 설정 후 select 으로 원하는 동 선택 */}
          <h4 className="text-start">
            <strong>동 선택</strong>
            <span style={{color: "#FFD727", fontSize: "14px"}}> *필수</span>
          </h4>
          <div className="mb-4" style={{display: "flex", alignItems: "center"}}>
            <input
                type="text"
                id="Address"
                disabled={true}
                className="form-control"
                style={{width: "300px", height: "50px"}}
                value={restData.Address1}
                onChange={(e) => hfChange(e, "Address")}
            />
            <select
                value={dongOption}
                onChange={(e) => setDongOption(e.target.value)}
                className="form-control"
                style={{width: "150px", height: "50px", marginLeft: "10px"}}
            >
              <option value="" disabled>동을 선택하세요</option>
              {options.map((opt, i) => (
                  <option key={i} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>


          <hr/>
          <br/>
          <h4 className="text-start">
            <strong>가게 소개</strong>
            <span style={{color: "#FFD727", fontSize: "14px"}}> *필수</span>
          </h4>
          <div className="mb-4">
            <textarea
                id="Introduce"
                className="form-control"
                style={{width: "800px", height: "100px"}}
                value={restData.Introduce}
                onChange={(e) => hfChange(e, "Introduce")}
            />
          </div>

          <hr/>
          <br/>


          <h4 className="text-start">
            <strong>예약 가능한 시간</strong>
            <span style={{color: "#FFD727", fontSize: "14px"}}> *필수</span>
          </h4>
          <div className="mb-4">
            {resTime.map((time, index) => (
                <div key={index} style={{display: "flex", alignItems: "center", marginBottom: "10px"}}>
                  <input
                      type="time"
                      value={time}
                      onChange={(e) => chTime(index, e.target.value)}
                      className="form-control"
                      style={{width: "300px", height: "50px"}}
                  />
                  {index === resTime.length - 1 && (
                      <div style={{marginLeft: "10px"}}>
                        <button className="btn btn-sm" onClick={addTime}
                                style={{marginRight: "5px", border: "1px solid #FFD727"}}>
                          추가
                        </button>
                        <button className="btn btn-sm" style={{border: "1pxsolid #FFD727"}} onClick={removeTime}>
                          삭제
                        </button>
                      </div>
                  )}
                </div>
            ))}
          </div>


          <hr/>
          <br/>

          <div style={{display: "flex", justifyContent: "flex-end"}}>
            {isSave ? (
                <button type="submit" className="btn btn-warning btn-lg mb-3">
                  수정
                </button>) : (
                <button type="submit" className="btn btn-warning btn-lg mb-3">
                  저장
                </button>
            )}
          </div>
        </form>
      </div>
  );
}

export default PreReSet;