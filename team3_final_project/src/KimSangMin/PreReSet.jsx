import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ReBanner from "./ReBanner.jsx";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function PreReSet() {
  // restData : 가게에 입력하고자하는 기본정보 저장객체
  const [restData, setRestData] = useState({
    Name: "",
    Call: "",
    Address1: "",
    Address2: "",
    Introduce: "",
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


  // 이미지 저장용 배열
  const [resImage, setResImage] = useState([])

  // 미리보기 활성화 여부
  // const [isPreview, setIsPreview] = useState([]);

  const [address, setAddress] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const [resTime, setResTime] = useState([""]);
  const [dongOption, setDongOption] = useState(""); // 기본 옵션 설정
  const [isSave, setIsSave] = useState(true);
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
  // const chImage = (e, index) => {
  //   const newImg = [...img]; // ..img 는 현재이미지 배열을 복사, newImg에 저장
  //   newImg[index] = e.target.value; // 주어진 index에 해당하는 이미지를 업데이트한다.
  //   setImg(newImg); // 새로운 이미지를 기존에 이미지 상태에 저장
  // }
  // const hPreview = () => {
  //   // 입력된 URL을 미리보기 배열에 추가
  //   setIsPreview(img.filter(url => url !== ""));
  // };

  // 이미지 미리보기
  // const imagePreviews = isPreview.map((url, index) => (
  //     url && (
  //         <div key={index} style={{display: 'inline-block', marginRight: '10px'}}>
  //           <img
  //               src={url}
  //               alt={`가게 이미지 ${index + 1}`}
  //               style={{width: '100px', height: '100px', objectFit: 'cover'}}
  //           />
  //         </div>
  //     )
  // ));

  // 예약시간 input 추가 / 삭제 기능
  // const addTime = () => setResTime([...resTime, ""]);

  const addTime = () => {
    Swal.fire({
      title: '예약 시간을 추가하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#FFD727',
      cancelButtonColor: '#d33',
      confirmButtonText: '추가',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        setResTime([...resTime, ""]);
        Swal.fire({
          title: '추가되었습니다!',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
        });
      }
    });
  };

  const removeTime = () => {
    if (resTime.length <= 1) return; // 최소 1개는 유지

    Swal.fire({
      title: '마지막 예약 시간을 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FFD727',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        setResTime(resTime.slice(0, -1));
        Swal.fire({
          title: '삭제되었습니다!',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
        });
      }
    });
  };

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
  const token = localStorage.getItem('ACCESS_TOKEN');

  // 가게 이미지 저장용
  const uploadToCloudinary = async (file) => {
    console.log("업로드할 파일:", file);
    console.log("name:", file.name);
    console.log("type:", file.type);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "waitable");

    for (let pair of formData.entries()) {
      if (pair[0] === "file") {
        const f = pair[1];
        console.log(`file name: ${f.name}`);
        console.log(`file size: ${f.size}`);
        console.log(`file type: ${f.type}`);
      } else {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    }

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dot2phme3/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Cloudinary 응답:", data);
      return data.secure_url;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const uploadImagesToCloudinary = async (files) => {
    const urls = []

    for (const file of files) {
      const url = await uploadToCloudinary(file)
      if (url) urls.push(url)
    }
    return urls;
  }

  // 가게 정보 가져오기
  useEffect(() => {
    if (!token) return;
    axios.get("http://localhost:8080/pre/owner/getRestaurant", {
      headers: {Authorization: `Bearer ${token}`}
    })
      .then(response => {
        const storeData = response.data.data;
        console.log(storeData)
        if (storeData && storeData.resName) {
          setIsSave(false);
          setResIdx(storeData.resIdx);
          setRestData({
            Name: storeData.resName,
            Call: storeData.resCall,
            Address1: storeData.resAddress1,
            Introduce: storeData.resIntroduce,
          });
          setDongOption(storeData.resAddress2);
          setResTime(storeData.resReserveTime ? storeData.resReserveTime.split(",") : []);
          setResImage([
            storeData.resImage1 || "",
            storeData.resImage2 || "",
            storeData.resImage3 || ""
          ]);
        } else {
          setIsSave(true);
        }
      })
      .catch(error => {
        console.log("사용자 정보 가져오기 실패", error);
        if (error.response) {
          if (error.response.status === 401) {
            alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
          } else if (error.response.status === 404) {
            console.log("가게 정보 없음, 신규 등록 상태로 이동");
            setIsSave(true);
          } else {
            console.error("기타 오류:", error.response.data);
          }
        } else {
          console.error("네트워크 오류:", error.message);
        }
      });
  }, [token]);

// 데이터 저장 폼
  const hSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('ACCESS_TOKEN');
    console.log("로컬 스토리지에서 가져온 토큰: ", token);
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const imageUrls = await uploadImagesToCloudinary(resImage);

    const storeData = {
      resName: restData.Name,
      resCall: restData.Call,
      resAddress1: restData.Address1,
      resAddress2: dongOption,
      resIntroduce: restData.Introduce,
      resReserveTime: resTime.filter(Boolean).join(","),
      resImage1: imageUrls[0] || "",
      resImage2: imageUrls[1] || "",
      resImage3: imageUrls[2] || "",
    };

    console.log("저장할 데이터: ", storeData);

    // 가게 저장 시 수정 기능으로 체인지
    if (!isSave && resIdx) {
      axios.put(`http://localhost:8080/pre/owner/updateRest/${resIdx}`, storeData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          console.log("수정 성공", response.data);
          Swal.fire({
            icon: 'success',
            title: '수정 완료!',
            text: '가게 정보가 수정되었습니다.',
            confirmButtonColor: '#FFD727'
          });
        })
        .catch(error => {
          console.log("오류 발생", error);
          Swal.fire({
            icon: 'error',
            title: '오류',
            text: '수정 중 오류가 발생했습니다.',
            confirmButtonColor: '#FF3B30'
          });
        });
    }

    // 처음 저장할 때
    else {
      axios.post("http://localhost:8080/pre/owner/resave", storeData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          console.log("저장 성공", response.data);
          Swal.fire({
            icon: 'success',
            title: '저장 완료!',
            text: '가게 정보가 저장되었습니다.',
            confirmButtonColor: '#FFD727'
          });
          setIsSave(false);
          setResIdx(response.data.resIdx || "");
        })
        .catch((error) => {
          console.log("오류 발생", error);
          if (error.response && error.response.status === 401) {
            Swal.fire({
              icon: 'error',
              title: '오류',
              text: '토큰이 만료되었습니다. 다시 로그인 해주세요.',
              confirmButtonColor: '#FF3B30'
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: '오류',
              text: '저장 중 오류가 발생하였습니다.',
              confirmButtonColor: '#FF3B30'
            });
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

        <div className={"mt-3 mb-4 d-flex justify-content-between me-5"}>
          <label
            htmlFor={"resImageUpload"}
            style={{
              width: "100px", height: "100px",
              backgroundColor: "white", border: "1px solid #A9A9A9",
            }}
            className={"rounded-3 d-flex flex-column justify-content-center align-items-center"}>
            <FontAwesomeIcon icon={faCamera} className={"fs-3"}/>
            <p className={"fs-6 mb-0"}>
              사진 {resImage.filter(file => {
              if (typeof file === "string") {
                return file.trim() !== "";  // 공백이나 빈 문자열 제외
              }
              return true;  // File 객체는 포함
            }).length}/3
            </p>
          </label>
          <input id={"resImageUpload"}
                 type={"file"}
                 multiple accept={"image/*"}
                 style={{display: "none"}}
                 onChange={(e) => {
                   const files = Array.from(e.target.files).slice(0, 3)
                   setResImage(files)
                 }}/>
          <div
              className="d-flex flex-row-reverse"
              style={{ gap: "100px", flexGrow: 1 }}
          >
            {resImage.map((file, idx) => {
              const src = typeof file === "string" ? file : URL.createObjectURL(file);
              if (typeof src === "string" && src.trim() === "") return null;
              return (
                  <img
                      key={idx}
                      src={src}
                      alt={`preview=${idx}`}
                      style={{width: "100px", height: "100px", objectFit: "cover", borderRadius: "50px"}}
                      className={'border border-1'}
                  />
              )
            })}
          </div>

        </div>


        <hr/>
        <br/>


        {/* 가게 이름, 가게 번호 한 줄에 배치 */}
        <div className="mb-4 d-flex justify-content-between" style={{ maxWidth: "660px" }}>
          {/* 가게 이름 */}
          <div style={{ flex: "0 0 48%" }}>
            <h4 className="text-start">
              <strong>가게 이름</strong>
              <span style={{ color: "#FFD727", fontSize: "14px" }}> *필수</span>
            </h4>
            <input
                type="text"
                id="Name"
                className="form-control"
                style={{ width: "100%", height: "50px" }}
                value={restData.Name}
                onChange={(e) => hfChange(e, "Name")}
            />
          </div>

          {/* 가게 번호 */}
          <div style={{ flex: "0 0 48%" }}>
            <h4 className="text-start">
              <strong>가게 번호</strong>
              <span style={{ color: "#FFD727", fontSize: "14px" }}> *필수</span>
            </h4>
            <input
                type="text"
                id="Call"
                className="form-control"
                style={{ width: "100%", height: "50px" }}
                value={restData.Call}
                onChange={(e) => hfChange(e, "Call")}
            />
          </div>
        </div>

        <hr/>
        <br/>


        <div className="d-flex justify-content-between align-items-start mb-4" style={{gap: "30px", maxWidth: "850px", minWidth: "850px"}}>
          {/* 왼쪽: 주소 검색 */}
          <div style={{flex: "1"}}>
            <h4 className="mb-2">
              <strong>주소 검색</strong>
              <span style={{ color: "#FFD727", fontSize: "14px" }}> *필수</span>
            </h4>
            <div>
              <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="주소를 입력하세요"
                  className="form-control d-inline-block"
                  style={{ width: "300px", height: "50px", marginRight: "10px" }}
              />
              <button
                  type="button"
                  onClick={openDaumPostcode}
                  className="btn btn-outline-warning btn-sm"
                  style={{ height: "50px" }}
              >
                검색
              </button>
            </div>
          </div>

          {/* 오른쪽: 동 선택 */}
          <div style={{flex: "1"}}>
            <h4 className="mb-2">
              <strong>동 선택</strong>
              <span style={{ color: "#FFD727", fontSize: "14px" }}> *필수</span>
            </h4>
            <div className="d-flex align-items-center">
              <input
                  type="text"
                  id="Address"
                  disabled={true}
                  className="form-control"
                  style={{ width: "300px", height: "50px" }}
                  value={restData.Address1}
                  onChange={(e) => hfChange(e, "Address")}
              />
              <select
                  value={dongOption}
                  onChange={(e) => setDongOption(e.target.value)}
                  className="form-control custom-select-arrow"
                  style={{
                    width: "150px",
                    height: "50px",
                    marginLeft: "10px",
                    paddingRight: "30px", // 화살표 공간 확보
                    appearance: "none",   // 기본 화살표 제거
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    textAlignVertical: "center", // 세로중앙정렬 시도 (윈도우)
                    textAlign: "center",           // 텍스트 가로 중앙정렬
                    textAlignLast: "center",
                  }}
              >
                <option value="" disabled>
                  동 선택
                </option>
                {options.map((opt, i) => (
                    <option key={i} value={opt.value}>
                      {opt.label}
                    </option>
                ))}
              </select>
            </div>
          </div>
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
              style={{width: "800px", height: "200px", resize: "none"}}
              value={restData.Introduce}
              onChange={(e) => hfChange(e, "Introduce")}
            />
        </div>

        <hr/>
        <br/>


        <h4 className="text-start d-flex align-items-center" style={{ gap: "10px" }}>
          <strong>예약 가능한 시간</strong>
          <span style={{color: "#FFD727", fontSize: "14px"}}> *필수</span>
          <div style={{ display: "flex", gap: "5px" }}>
            <button
                type="button"
                className="btn btn-sm"
                style={{ border: "1px solid #FFD727" }}
                onClick={addTime}
            >
              추가
            </button>
            <button
                type="button"
                className="btn btn-sm"
                style={{ border: "1px solid #FFD727" }}
                onClick={removeTime}
            >
              삭제
            </button>
          </div>
        </h4>
        <div className="mb-4" style={{ display: "flex", gap: "10px",flexWrap: "wrap", maxWidth: "calc(150px * 5 + 10px * 4)" }}>
          {resTime.map((time, index) => (
              <input
                  key={index}
                  type="time"
                  value={time}
                  onChange={(e) => chTime(index, e.target.value)}
                  className="form-control"
                  style={{ width: "150px", height: "50px", flexShrink: 0 }}
              />
          ))}
        </div>


        <hr/>

        <div style={{ display: "flex", justifyContent: "flex-end" }} className={'mb-4'}>
          <button
              type="submit"
              className="btn btn-warning"
              style={{
                padding: "12px 24px",
                fontSize: "18px",
                minWidth: "120px",
                height: "50px",
              }}
          >
            {!isSave ? "수정" : "저장"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PreReSet;