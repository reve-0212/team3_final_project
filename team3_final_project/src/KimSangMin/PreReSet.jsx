import { useState } from "react";
import { Link } from "react-router-dom";
import ReBanner from "./ReBanner.jsx";
import SeatManager from "./SeatManager.jsx";
import axios from "axios";

function PreReSet() {
  const [restData, setRestData] = useState({
    Title: "가게이름",
    Phone: "가게번호",
    Address: "가게주소",
    HashTag: "가게 해시태그",
    Content: "가게 소개",
    Function: "가게 기능",
  });
  const options = [
    { value: "dong1", label: "중앙동" },
    { value: "dong2", label: "대청동" },
    { value: "dong3", label: "동광동" },
    { value: "dong4", label: "남포동" },
    { value: "dong5", label: "영주동" },
    { value: "dong6", label: "대신동" },
    { value: "dong7", label: "초량동" },
    { value: "dong8", label: "부평동" },
    { value: "dong9", label: "동삼동" },
    { value: "dong10", label: "동대신동" },
    { value: "dong11", label: "서대신동" },
    { value: "dong12", label: "충무동" },
    { value: "dong13", label: "아미동" },
    { value: "dong14", label: "서서동" },
    { value: "dong15", label: "범일동" },
    { value: "dong16", label: "좌천동" },
    { value: "dong17", label: "만덕동" },
    { value: "dong18", label:  "영도동" },
    { value: "dong19", label: "해양동" },
    { value: "dong20", label: "동삼동" },
    { value: "dong21", label: "부전동" },
    { value: "dong22", label: "전포동" },
    { value: "dong23", label: "범천동" },
    { value: "dong24", label: "온천동" },
    { value: "dong25", label: "명장동" },
    { value: "dong26", label: "사직동" },
    { value: "dong27", label: "용호동" },
    { value: "dong28", label: "대연동" },
    { value: "dong29", label: "감만동" },
    { value: "dong30", label: "구포동" },
    { value: "dong31", label: "만덕동" },
    { value: "dong32", label: "덕천동" },
    { value: "dong33", label: "우동" },
    { value: "dong34", label: "중동" },
    { value: "dong35", label: "송정동" },
    { value: "dong36", label: "하단동" },
    { value: "dong37", label: "괴정동" },
    { value: "dong38", label: "신평동" },
    { value: "dong39", label: "장전동" },
    { value: "dong40", label: "부곡동" },
    { value: "dong41", label: "대저동" },
    { value: "dong42", label: "녹산동" },
    { value: "dong43", label:  "거제동" },
    { value: "dong44", label: "연산동" },
    { value: "dong45", label: "수영동" },
    { value: "dong46", label: "민락동" },
    { value: "dong47", label: "괘법동" },
    { value: "dong48", label: "감전동" },
  ];

  //  이미지 업로드

  const [img, setImg] = useState([]);
  const [address, setAddress] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [input, setInput] = useState([""]);
  const [resTime, setReTime] = useState([""]);
  const [dongOption, setDongOption] = useState("option1"); // 기본 옵션 설정


  //-----------------------------  주소 검색 api로 요청받아오기------------------------
   const hSearch = (e) => {
    e.preventDefault();

    if (!address) {
      alert("주소를 입력해주세요.");
      return;
    }

    const apiKey = "36bd79108879c504308c80d28fe7829d";
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`;

    axios
        .get(url, {
          headers: {
            Authorization: `KakaoAK ${apiKey}`,
          },
        })
        .then((response) => {
          setSearchResults(response.data.documents);
        })
        .catch((error) => {
          console.error("주소 검색 중 오류 발생:", error);
          alert("주소 검색에 실패했습니다.");
        });
  };
// ------------------------------------------------------------------------------------------------

  // 이미지 업로드
  const chImage = (e) => {
      const file = Array.from(e.target.files)

    if (img.length + file.length > 3){
      alert("이미지는 최대 3개까지 업로드 가능합니다. ");
    return
  }
    const seImage = file.slice(0, 3);

    const newImages  = seImage.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImg((prevImg) => [...prevImg, ...newImages]);
  };



  const chInput = (e, index) => {
    const updatedInput = [...input];
    updatedInput[index] = e.target.value;
    setInput(updatedInput);
  };

  // input 추가 삭제 기능
  const addInput = () => setInput([...input, ""]);
  const removeInput = () => setInput(input.slice(0, -1));

  // 예약시간 input 추가 / 삭제 기능
  const addTime = () => setReTime([...resTime, ""]);
  const removeTime = () => setReTime(resTime.slice(0, -1));

  // input에 설정한 예약시간 상태 변경
  const chTime = (index, value) => {
    const updatedTime = [...resTime];
    updatedTime[index] = value;
    setReTime(updatedTime);
  };


  const hfChange = (e, field) => {
    setRestData({ ...restData, [field]: e.target.value });
  };

  // 데이터 저장 폼
  const hSubmit = (e) => {
    e.preventDefault();

    const { Title, Phone, Address, Content } = restData;

    if (!Title || !Phone || !Address || !Content || resTime.some((t) => !t) || input.some((i) => i.trim() === "")) {
      alert("필수 항목이 입력되지 않았습니다.");
      return;
    }

    const storeData = {
      ...restData,
      facilities: input,
      availableTimes: resTime,
      dong : dongOption,
    };

    console.log("저장할 데이터: ", storeData);

  };

  return (
      <div
          style={{
            marginLeft: "300px",
            paddingTop: "8rem",
            paddingLeft: "1rem",
            width: "calc(100% - 200px)",
            maxWidth: "1000px",
          }}
      >
        <form onSubmit={hSubmit}>
          <ReBanner />
          <div style={{ display: "flex" }}>
            <Link to="/pre/PreReSet" style={{ textDecoration: "none", color: "black" }}>
              <h4 className="text-start me-4">가게정보</h4>
            </Link>
            <Link to="/pre/PreTimeSet" style={{ textDecoration: "none", color: "black" }}>
              <h4>운영정보</h4>
            </Link>
          </div>
          <hr />
          <br />

          {/* 가게 이미지 설정 */}
          <h4 className="text-start">
            <strong>가게 대표 이미지</strong>
          </h4>
          <div className="mb-4">
            <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="form-control"
                multiple
                style={{ width: "300px", height: "35px" }}
                onChange={chImage}
            />
          </div>

          <div className="d-flex gap-3">
            {img.slice(0,3).map((img, index) => (
                <img
                key={index}
                src={img.preview}
                alt={`preview-${index}`}
                style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                />
            ))}
          </div>


          <hr />
          <br />


          {/* 가게 이름 설정 */}
          <h4 className="text-start">
            <strong>가게 이름</strong>
            <span style={{ color: "#FFD727", fontSize: "14px" }}> *필수</span>
          </h4>
          <div className="mb-4">
            <input
                type="text"
                id="Title"
                className="form-control"
                style={{ width: "300px", height: "50px" }}
                value={restData.Title}
                onChange={(e) => hfChange(e, "Title")}
            />
          </div>


          <hr />
          <br />


          <h4 className="text-start">
            <strong>가게 번호</strong>
            <span style={{ color: "#FFD727", fontSize: "14px" }}> *필수</span>
          </h4>
          <div className="mb-4">
            <input
                type="text"
                id="Phone"
                className="form-control"
                style={{ width: "300px", height: "50px" }}
                value={restData.Phone}
                onChange={(e) => hfChange(e, "Phone")}
            />
          </div>
          <hr />
          <br />


          {/* --------------------- 주소 입력 창 / 검색 , 동 선택 ----------------  */}
          <h4 className="text-start">
            <strong>주소 검색 </strong>
            <span style={{ color: "#FFD727", fontSize: "14px" }}> *필수</span>
          </h4>
          <div className="mb-4">
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="주소를 입력하세요"
                className="form-control"
                style={{ width: "300px", height: "50px", display: "inline-block", marginRight: "10px" }}
            />
            <button type="button" onClick={hSearch} className="btn btn-outline-warning btn-sm">
              검색
            </button>

            {/* 검색 후 결과 선택 시 값 입력됨 */}
            <ul style={{ marginTop: "10px" }}>
              {searchResults.map((result, index) => (
                  <li
                      key={index}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        hfChange({ target: { value: result.address_name } }, "Address");
                        setSearchResults([]);
                        setAddress("");
                      }}
                  >
                    📍 {result.address_name}
                  </li>
              ))}
            </ul>
          </div>

          <hr />
          <br />


          {/* option에 동 설정 후 select 으로 원하는 동 선택 */}
          <h4 className="text-start">
            <strong>동 선택</strong>
            <span style={{ color: "#FFD727", fontSize: "14px" }}> *필수</span>
          </h4>
          <div className="mb-4" style={{ display: "flex", alignItems: "center" }}>
          <input
              type="text"
              id="Address"
              className="form-control"
              style={{ width: "300px", height: "50px" }}
              value={restData.Address}
              onChange={(e) => hfChange(e, "Address")}
          />
            <select
                value={dongOption}
                onChange={(e) => setDongOption(e.target.value)}
                className="form-control"
                style={{ width: "150px", height: "50px", marginLeft: "10px" }}
            >
              {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
              ))}
            </select>
          </div>


          <hr />
          <br />
          <h4 className="text-start">
            <strong>가게 소개</strong>
            <span style={{ color: "#FFD727", fontSize: "14px" }}> *필수</span>
          </h4>
          <div className="mb-4">
            <textarea
                id="Content"
                className="form-control"
                style={{ width: "800px", height: "100px" }}
                value={restData.Content}
                onChange={(e) => hfChange(e, "Content")}
            />
          </div>


          <hr />
          <br />


          <h4 className="text-start">
            <strong>편의시설</strong>
            <span style={{ color: "#FFD727", fontSize: "14px" }}> *필수</span>
          </h4>
          <div className="mb-4">
            {input.map((val, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <input
                      type="text"
                      value={val}
                      onChange={(e) => chInput(e, index)}
                      className="form-control"
                      style={{ width: "300px", height: "50px" }}
                  />
                  {index === input.length - 1 && (
                      <div style={{ marginLeft: "10px" }}>
                        <button className="btn btn-sm" onClick={addInput} style={{ marginRight: "5px", border: "1px solid #FFD727" }}>
                          추가
                        </button>
                        <button className="btn btn-sm" style={{ border: "1px solid #FFD727" }} onClick={removeInput}>
                          삭제
                        </button>
                      </div>
                  )}
                </div>
            ))}
          </div>


          <hr />
          <br />
          <h4 className="text-start">
            <strong>예약 가능한 시간</strong>
            <span style={{ color: "#FFD727", fontSize: "14px" }}> *필수</span>
          </h4>
          <div className="mb-4">
            {resTime.map((time, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => chTime(index, e.target.value)}
                      className="form-control"
                      style={{ width: "300px", height: "50px" }}
                  />
                  {index === resTime.length - 1 && (
                      <div style={{ marginLeft: "10px" }}>
                        <button className="btn btn-sm" onClick={addTime} style={{ marginRight: "5px", border: "1px solid #FFD727" }}>
                          추가
                        </button>
                        <button className="btn btn-sm" style={{ border: "1pxsolid #FFD727" }} onClick={removeTime}>
                          삭제
                        </button>
                      </div>
                  )}
                </div>
            ))}
          </div>


          <hr />
          <br />
          <h4 className="text-start">
            <strong>좌석배치도</strong>
          </h4>
          <SeatManager/>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="btn btn-warning btn-lg mb-3">
              저장
            </button>
          </div>
        </form>
      </div>
  );
}

export default PreReSet;
