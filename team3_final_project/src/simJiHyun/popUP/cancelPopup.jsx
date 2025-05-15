function CancelPopup(props) {
    // onClose 함수를 받는다
    return (
        <div className="position-fixed top-0 start-0 w-100 h-100
        d-flex justify-content-center align-items-center"
             style={{background: "rgba(0,0,0,0.4)", zIndex: 1050}}>
            <div className="bg-white p-4 text-center rounded-4"
                 style={{maxWidth: "400px", width: "100%"}}>
                <p className="fs-5 mb-0">{props.restName}</p>
                <p className="fs-5">예약을 취소할까요?</p>

                <div className="d-flex flex-row justify-content-center gap-3 mt-3">
                    {/*버튼을 누르면 onClose 로 인해서 openModal 의 값이 false 가 된다
                        따라서 모달은 사라진다*/}
                    <button type="button"
                            className="btn rounded-3 flex-fill"
                            style={{border: "1px solid #D9D9D9", maxWidth: "180px"}}
                            onClick={props.onClose}>
                        아니요
                    </button>
                    <button type="button"
                            className="btn rounded-3 flex-fill text-white"
                            style={{backgroundColor: "#FFA31C", maxWidth: "180px"}}
                            onClick={props.onCancelConfirm}>
                        네, 취소할게요
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CancelPopup;
