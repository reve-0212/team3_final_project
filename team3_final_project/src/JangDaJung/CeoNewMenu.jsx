import WaBanner from "../KimSangMin/WaBanner.jsx";
import "./CeoNewMenu.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function CeoNewMenu() {

    const navigate = useNavigate()

    const [previewImg, setPreviewImg] = useState(null);

    // 파일 선택 시 실행
    const handleImgChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const imgUrl = URL.createObjectURL(file);
            setPreviewImg(imgUrl);
        }
    };

    // 사진 삭제 버튼 클릭 시 미리보기 초기화
    const handleRemoveImg = (e) => {
        e.stopPropagation(); // 부모 div 클릭 방지
        setPreviewImg(null);
    };

    // 등록 버튼 클릭시 모달
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    // 취소 버튼 클릭 시 모달
    const [showCancelModal, setShowCancelModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccessModal(true);
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
        <div className={'ceo-menu-main'}>
            <WaBanner />
            <div style={{ marginTop: '10vh', marginLeft: '200px', position: 'relative' }}>
                <h2 className={'new-menu-title mb-4'}>메뉴 추가</h2>
                <hr />
                <form className={'new-menu-container mt-5'}>
                    <div className={'mb-5 menu-item-text'}>
                        <label className={'form-label fw-bold'}>메뉴명을 입력해주세요. <span className={'menu-item-essential'}>* 필수</span></label>
                        <input type={'text'} className={'new-menu-input mt-2'} placeholder={'예) 하와이안 피자'} />
                    </div>

                    <div className={'mb-5 menu-item-text'}>
                        <label className={'form-label fw-bold'}>사진을 추가해주세요. <span className={'menu-item-essential'}>* 필수</span></label>
                        <div
                            className={'upload-box border rounded p-4 text-center mt-2'}
                            onClick={() => document.getElementById('menu-image-upload').click()}
                            style={{ cursor: 'pointer' }}
                        >
                            {previewImg ? (
                                <>
                                    <img
                                        src={previewImg}
                                        alt={'미리보기'}
                                        style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '0.5rem' }}
                                    />
                                    <button
                                        className="btnImgDel"
                                        onClick={handleRemoveImg}
                                    >
                                        &times;
                                    </button>
                                </>
                            ): (
                                <>
                                    <i className={'bi bi-camera'} style={{ fontSize: "2rem" }}></i>
                                    <p className={'mb-1'} style={{ fontSize: '0.9rem'}}>사진추가</p>
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
                        <label className="form-label fw-bold">메뉴를 소개해주세요. <span className="menu-item-essential">* (최대 100자)</span></label>
                        <textarea className="new-menu-input mt-2" rows="3" placeholder="메뉴의 구성이나 재료 등 구체적인 설명을 제공해주세요."></textarea>
                    </div>

                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-cancel me-2" onClick={handleCancel}>취소</button>
                        <button type="submit" className="btn btn-warning text-white" onClick={handleSubmit}>등록</button>
                    </div>
                </form>

                {/* 등록 성공 모달 */}
                {showSuccessModal && (
                    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)'}}>
                        <div className="modal-dialog" style={{width: '25rem'}}>
                            <div className="modal-content" style={{ border: 'none' }}>
                                <div className="modal-body mt-4 extra-bold">
                                    <p style={{ color: '#5D4037'}}>메뉴 등록이 완료되었습니다.</p>
                                </div>
                                <div className="modal-footer" style={{border: 'none',  paddingTop: '0px'}}>
                                    <button className="btn btn-warning text-white" onClick={goToList}>확인</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 취소 확인 모달 */}
                {showCancelModal && (
                    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog" style={{width: '20rem'}}>
                            <div className="modal-content">
                                <div className="modal-menu-header">
                                    <h5 className="modal-title" style={{ fontWeight: 'bold'}}>메뉴 등록을<br/>취소하시겠습니까?</h5>
                                </div>
                                <div className="modal-body">
                                    <p style={{ color: '#87898B', fontSize: '0.85rem',marginTop:'0px', paddingTop: '0px'}}>지금까지 입력된 정보는<br/>저장되지 않습니다.</p>
                                </div>
                                <div className="modal-footer" style={{border: 'none', justifyContent: 'center', paddingTop: '0px'}}>
                                    <button className="btn btn-cancel" style={{width: '4rem'}} onClick={() => setShowCancelModal(false)}>아니오</button>
                                    <button className="btn btn-warning text-white" style={{width: '4rem'}} onClick={confirmCancel}>예</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
}

export default CeoNewMenu