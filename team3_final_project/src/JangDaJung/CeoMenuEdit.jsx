import WaBanner from "../KimSangMin/WaBanner.jsx";
import "./CeoNewMenu.css";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ReBanner from "../KimSangMin/ReBanner.jsx";

function CeoMenuEdit() {
  const navigate = useNavigate()
  const { menuId } = useParams();  // URL 파라미터로 menuId 받음

  // 메뉴 정보 상태
  const [menuName, setMenuName] = useState("");
  const [menuDesc, setMenuDesc] = useState("");
  const [previewImg, setPreviewImg] = useState(null); // 화면용
  const [selectedFile, setSelectedFile] = useState(null);  // 백엔드용

  // 페이지 진입 시 기존 메뉴 데이터 로딩 (더미 데이터)
  useEffect(() => {
    // TODO: 백엔드 연동시 이 부분에 fetch 또는 axios로 GET 호출
    // 예시 더미 데이터
    const dummyMenuData = {
      id: menuId,
      name: "하와이안 피자",
      description: "파인애플과 햄이 어우러진 트로피컬한 맛",
      imageUrl: "https://via.placeholder.com/300x200.png?text=하와이안+피자"
    };

    setMenuName(dummyMenuData.name);
    setMenuDesc(dummyMenuData.description);
    setPreviewImg(dummyMenuData.imageUrl);
  }, [menuId]);

  // 파일 선택 시 실행
  const handleImgChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setPreviewImg(imgUrl);  // 미리보기용 URL
      setSelectedFile(file);  // 백엔드 전송용 파일 객체
    }
  };

// 사진 삭제 버튼 클릭 시 초기화
  const handleRemoveImg = (e) => {
    e.stopPropagation();
    setPreviewImg(null);
    setSelectedFile(null);
  };

  // 확인 버튼 클릭시 모달
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // 취소 버튼 클릭 시 모달
  const [showCancelModal, setShowCancelModal] = useState(false);

  // 수정 완료 시
  const handleSubmit = (e) => {
    e.preventDefault();
// 입력한 값 콘솔에 출력
    console.log("수정할 메뉴명:", menuName);
    console.log("수정할 설명:", menuDesc);
    console.log("수정할 이미지(preview URL):", previewImg);
    console.log("제출할 파일:", selectedFile);

    // 나중에 백엔드 연동시 쓸 코드 (주석 해제해서 사용)
    /*
    const formData = new FormData();
    formData.append("menuName", menuName);
    formData.append("menuDesc", menuDesc);

    // 새로 업로드한 이미지 파일이 있는 경우
    if (file) {
      formData.append("image", file);
    }
    위아래 둘중에 뭐써야하누

    if (selectedFile) {
      formData.append("image", selectedFile);  // 파일은 반드시 File 객체로 보내야 함
    }

    axios.put(`/api/menus/${menuId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(response => {
      console.log("수정 성공", response.data);
      setShowSuccessModal(true);
    })
    .catch(error => {
      console.error("수정 실패", error);
    });
    */

    // 임시로 모달 띄우기 (백 연결 전)
    setShowSuccessModal(true);

    // TODO: 백엔드 연결시 axios.post 또는 .put으로 수정 API 호출
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    navigate('/pre/MenuList');  // 리스트 페이지로 이동
  };

  const goToList = () => {
    setShowSuccessModal(false);
    navigate('/pre/MenuList');  // 리스트 페이지로 이동
  };

  return (
      <>
        <ReBanner />
        <div className={'ceo-menu-main'}>
          <div style={{marginTop: '10vh', marginLeft: '200px', position: 'relative'}}>
            <h2 className={'new-menu-title mb-4'}>메뉴 수정</h2>
            <hr/>

            <form className={'new-menu-container mt-5'}>
              <div className={'mb-5 menu-item-text'}>
                <label className={'form-label fw-bold'}>메뉴명을 입력해주세요. <span className={'menu-item-essential'}>* 필수</span></label>
                <input
                    type={'text'}
                    className={'new-menu-input mt-2'}
                    placeholder={'예) 하와이안 피자'}
                    value={menuName}
                    onChange={(e) => setMenuName(e.target.value)}
                />
              </div>

              <div className={'mb-5 menu-item-text'}>
                <label className={'form-label fw-bold'}>사진을 추가해주세요. <span className={'menu-item-essential'}>* 필수</span></label>
                <div
                    className={'upload-box border rounded p-4 text-center mt-2'}
                    onClick={() => document.getElementById('menu-image-upload').click()}
                    style={{cursor: 'pointer'}}
                >
                  {previewImg ? (
                      <>
                        <img
                            src={previewImg}
                            alt={'미리보기'}
                            style={{width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '0.5rem'}}
                        />
                        <button
                            className="btnImgDel"
                            onClick={handleRemoveImg}
                        >
                          &times;
                        </button>
                      </>
                  ) : (
                      <>
                        <i className={'bi bi-camera'} style={{fontSize: "2rem"}}></i>
                        <p className={'mb-1'} style={{fontSize: '0.9rem'}}>사진추가</p>
                      </>
                  )}
                </div>
                <small className="menu-item-essential">* 한 장 선택 가능</small>
                {/* 숨긴 파일 선택 input */}
                <input
                    type="file"
                    id="menu-image-upload"
                    className="d-none"
                    accept="image/*"
                    onChange={handleImgChange}
                />
              </div>

              <div className="mb-5 menu-item-text">
                <label className="form-label fw-bold">메뉴를 소개해주세요. <span
                    className="menu-item-essential">* (최대 100자)</span></label>
                <textarea
                    className="new-menu-input mt-2"
                    rows="3"
                    placeholder="메뉴의 구성이나 재료 등 구체적인 설명을 제공해주세요."
                    value={menuDesc}
                    onChange={(e) => setMenuDesc(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-cancel me-2" onClick={handleCancel}>취소</button>
                <button type="submit" className="btn btn-warning text-white" onClick={handleSubmit}>수정</button>
              </div>
            </form>

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
          </div>
        </div>
      </>
  );
}

export default CeoMenuEdit