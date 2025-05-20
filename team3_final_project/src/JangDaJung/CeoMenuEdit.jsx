import "./css/CeoNewMenu.css";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ReBanner from "../KimSangMin/ReBanner.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import api from "../api/axios.js";

function CeoMenuEdit() {
  const navigate = useNavigate()
  const {resIdx, menuIdx} = useParams();

  // 메뉴 정보 상태
  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [menuExplanation, setMenuExplanation] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // 파일로 받아서 메뉴 올리기용 state
  const [menuImage, setMenuImage] = useState(null)

  // 페이지 진입 시 기존 메뉴 데이터 로딩
  useEffect(() => {
    // console.log(resIdx);
    // console.log(menuIdx);
    const fetchMenu = async () => {
      try {
        const response = await api.get(`/menu/${menuIdx}`, {
          params: {
            resIdx: resIdx
          }
        });
        const data = response.data;
        setMenuName(data.menuName);
        setMenuPrice(data.menuPrice);
        setMenuExplanation(data.menuExplanation);
        setImageUrl(data.menuImage);
      } catch (err) {
        console.error("메뉴 정보를 불러오는데 실패했습니다:", err);
      }
    };
    fetchMenu();
  }, [menuIdx]);

  // 확인 버튼 클릭시 모달
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // 취소 버튼 클릭 시 모달
  const [showCancelModal, setShowCancelModal] = useState(false);
  // 삭제시 모달
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 이미지를 cloudinary 로 가져감
  const uploadToCloudinary = async (file) => {
    // console.log("업로드할 파일:", file);
    // console.log("name:", file.name);
    // console.log("type:", file.type);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "waitable");

    // for (let pair of formData.entries()) {
    //   if (pair[0] === "file") {
    //     const f = pair[1];
    //     console.log(`file name: ${f.name}`);
    //     console.log(`file size: ${f.size}`);
    //     console.log(`file type: ${f.type}`);
    //   } else {
    //     console.log(`${pair[0]}: ${pair[1]}`);
    //   }
    // }

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dot2phme3/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      // console.log("Cloudinary 응답:", data);
      return data.secure_url;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // 새 이미지 url 받아옴
  const uploadImageToCloudinary = async (file) => {
    return await uploadToCloudinary(file);
  }

  // 수정 완료 시
  const handleSubmit = async (e) => {
    e.preventDefault();

    // menuImage 를 넣은걸 cloudinary 로 보내서 새 imageUrl 받아옴
    const imageUrl = await uploadImageToCloudinary(menuImage);

    // 입력한 값 콘솔에 출력
    // console.log("수정할 메뉴명:", menuName);
    // console.log("수정할 설명:", menuExplanation);
    // console.log("수정할 이미지:", imageUrl);

    const formData = new FormData();
    formData.append("menuName", menuName);
    formData.append("menuPrice", menuPrice);
    formData.append("menuExplanation", menuExplanation);
    formData.append("menuImage", imageUrl);

    try {
      const response = await api.put(`/menu/edit/${menuIdx}`, formData);
      // console.log("수정 성공:", response.data);
      setShowSuccessModal(true);
    } catch (err) {
      console.error("수정 실패:", err);
    }
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  }

  const confirmCancel = () => {
    setShowCancelModal(false);
    navigate(`/pre/PreMenuList/${resIdx}`);  // 리스트 페이지로 이동
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/menu/delete/${menuIdx}`);
      alert("메뉴가 삭제되었습니다.");
      navigate(`/pre/PreMenuList/${resIdx}`);
    } catch (err) {
      console.error("메뉴 삭제 실패:", err);
      alert("삭제에 실패했습니다.");
    }
    setShowDeleteModal(false);
  };

  const goToList = () => {
    setShowSuccessModal(false);
    navigate(`/pre/PreMenuList/${resIdx}`);  // 리스트 페이지로 이동
  };

  const previewMenu = [
    {
      menuName,
      menuPrice,
      menuExplanation,
      menuImage: imageUrl
    }
  ];

  return (
    <>
      <ReBanner/>
      <div className={'ceo-menu-main'}>
        <div style={{marginTop: '10vh', marginLeft: '200px', position: 'relative'}}>
          <h2 className={'new-menu-title mb-4'}>메뉴 수정</h2>
          <hr/>
          {/* 입력폼 & 미리보기 나란히 배치 */}
          <div className="row px-5">
            {/* 왼쪽 입력 폼 */}
            <div className="col-md-7 pe-5">
              <form className={'new-menu-container mt-5'} onSubmit={handleSubmit}>
                <div className={'mb-4 menu-item-text'}>
                  <label className={'form-label fw-bold'}>메뉴명을 입력해주세요. <span
                    className={'menu-item-essential'}>* 필수</span></label>
                  <input
                    name={'menuName'}
                    type={'text'}
                    className={'new-menu-input mt-1'}
                    placeholder={'예) 하와이안 피자'}
                    value={menuName}
                    onChange={(e) => setMenuName(e.target.value)}
                  />
                </div>

                <div className={'mb-4 menu-item-text'}>
                  <label className={'form-label fw-bold'}>메뉴 금액을 입력해주세요 <span
                    className={'menu-item-essential'}>* 필수</span></label>
                  <input
                    name="menuPrice"
                    type={'text'}
                    className={'new-menu-input mt-1'}
                    placeholder={'예) 12000'}
                    value={menuPrice}
                    onChange={(e) => setMenuPrice(e.target.value)}
                  />
                </div>

                {/*<div className={'mb-4 menu-item-text'}>*/}
                {/*  <label className={'form-label fw-bold'}>이미지 URL을 입력해주세요. <span className={'menu-item-essential'}>* 필수</span></label>*/}
                {/*  <input*/}
                {/*      name="menuImage"*/}
                {/*      type="text"*/}
                {/*      className="new-menu-input mt-1"*/}
                {/*      placeholder="예) https://example.com/image.jpg"*/}
                {/*      value={imageUrl}*/}
                {/*      onChange={(e) => setImageUrl(e.target.value)}*/}
                {/*  />*/}
                {/*  {imageUrl && (*/}
                {/*      <div className="mt-3 upload-box rounded">*/}
                {/*        <img*/}
                {/*            src={imageUrl}*/}
                {/*            alt="미리보기"*/}
                {/*            style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '0.5rem' }}*/}
                {/*        />*/}
                {/*      </div>*/}
                {/*  )}*/}
                {/*</div>*/}

                <div className={"mb-4 menu-item-text"}>
                  <p className={"form-label fw-bold"}>
                    이미지를 등록해주세요
                    <span className={"menu-item-essential"}>* 필수</span>
                  </p>

                  {/*새로 만든 이미지 미리보기*/}
                  <div className={"d-flex justify-content-between align-items-center"}>
                    <label
                      htmlFor={"menuImageUpload"}
                      style={{width: "100px", height: "100px", backgroundColor: "white", border: "1px solid #A9A9A9",}}
                      className={"rounded-3 d-flex flex-column justify-content-center align-items-center"}>
                      <FontAwesomeIcon icon={faCamera} className={"fs-3"}/>
                      <p className={"fs-6 mb-0"}>사진 {menuImage === null ? 0 : 1}/1</p>
                    </label>

                    <input id={"menuImageUpload"}
                           type={"file"}
                           accept={"image/*"}
                           style={{display: "none"}}
                           onChange={(e) => {
                             const file = e.target.files[0]
                             if (file) {
                               setMenuImage(file)
                               setImageUrl(URL.createObjectURL(file))
                             }
                           }}/>

                    {imageUrl && (
                      <img src={imageUrl} alt={""}
                           style={{
                             width: "100px", height: "100px",
                             objectFit: "cover", borderRadius: "10px"
                           }}/>
                    )}
                  </div>
                </div>

                <div className={'mb-4 menu-item-text'}>
                  <label className="form-label fw-bold">메뉴를 소개해주세요. <span
                    className="menu-item-essential">* (최대 100자)</span></label>
                  <textarea
                    className="new-menu-input mt-1"
                    name="menuExplanation"
                    rows="3"
                    placeholder="메뉴의 구성이나 재료 등 구체적인 설명을 제공해주세요."
                    value={menuExplanation}
                    onChange={(e) => setMenuExplanation(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-secondary me-2" onClick={handleCancel}>취소</button>
                  <button type="button" className={'btn btn-cancel me-2'} onClick={handleDelete}>삭제</button>
                  <button type="submit" className="btn btn-warning text-white">수정</button>
                </div>
              </form>
            </div>

            {/* 오른쪽 미리보기 */}
            <div className="col-md-5 ps-4 mt-5">
              <h5 className="mb-3 fw-bold text-center">앱 화면 미리보기</h5>
              <div className={'preview-list'}>
                {previewMenu.map((menu, idx) => (
                  <div key={idx} className="d-flex justify-content-between align-items-center border-bottom py-3">
                    <div className="text-start">
                      <div className="fw-bold">{menu.menuName || '메뉴명'}</div>
                      <div className="text-muted small">{menu.menuExplanation || '메뉴 설명'}</div>
                      <div className="fw-bold mt-3">{menu.menuPrice ? `${menu.menuPrice} 원` : '금액'}</div>
                    </div>
                    <div className="bg-light d-flex justify-content-center align-items-center"
                         style={{width: "64px", height: "64px", borderRadius: "6px", overflow: 'hidden'}}>
                      {menu.menuImage ? (
                        <img src={menu.menuImage} alt="미리보기"
                             style={{width: "100%", height: "100%", objectFit: "cover"}}/>
                      ) : (
                        <span className="text-muted small">사진</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 수정 성공 모달 */}
          {showSuccessModal && (
            <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <div className="modal-dialog" style={{width: '25rem'}}>
                <div className="modal-content" style={{border: 'none'}}>
                  <div className="modal-body mt-4 extra-bold">
                    <p style={{color: '#5D4037'}}>메뉴 수정이 완료되었습니다.</p>
                  </div>
                  <div className="modal-footer" style={{border: 'none', paddingTop: '0px'}}>
                    <button className="btn btn-warning text-white" onClick={goToList}>확인</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 취소 확인 모달 */}
          {showCancelModal && (
            <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <div className="modal-dialog" style={{width: '20rem'}}>
                <div className="modal-content">
                  <div className="modal-menu-header">
                    <h5 className="modal-title" style={{fontWeight: 'bold'}}>메뉴 수정을<br/>취소하시겠습니까?</h5>
                  </div>
                  <div className="modal-body">
                    <p style={{color: '#87898B', fontSize: '0.85rem', marginTop: '0px', paddingTop: '0px'}}>지금까지 입력된
                      정보는<br/>저장되지 않습니다.</p>
                  </div>
                  <div className="modal-footer"
                       style={{border: 'none', justifyContent: 'center', paddingTop: '0px'}}>
                    <button className="btn btn-cancel" style={{width: '4rem'}}
                            onClick={() => setShowCancelModal(false)}>아니오
                    </button>
                    <button className="btn btn-warning text-white" style={{width: '4rem'}}
                            onClick={confirmCancel}>예
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/*  삭제 모달*/}
          {showDeleteModal && (
            <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <div className="modal-dialog" style={{width: '20rem'}}>
                <div className="modal-content">
                  <div className="modal-menu-header">
                    <h5 className="modal-title" style={{fontWeight: 'bold'}}>메뉴를<br/>삭제하시겠습니까?</h5>
                  </div>
                  <div className="modal-body">
                    <p style={{color: '#87898B', fontSize: '0.85rem', marginTop: '0px', paddingTop: '0px'}}>삭제된 메뉴는 복구할
                      수 없습니다.</p>
                  </div>
                  <div className="modal-footer" style={{border: 'none', justifyContent: 'center', paddingTop: '0px'}}>
                    <button className="btn btn-cancel" style={{width: '4rem'}}
                            onClick={() => setShowDeleteModal(false)}>아니오
                    </button>
                    <button className="btn btn-danger text-white" style={{width: '4rem'}} onClick={confirmDelete}>예
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default CeoMenuEdit