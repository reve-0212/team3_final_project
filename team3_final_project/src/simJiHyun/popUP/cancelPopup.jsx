function cancelPopup() {
    return (
        <div className={"overLay"}>
            <div className={"card-container"}>
                <p className={"restaurant-name"}><span>런던 베이글 뮤지엄 잠실</span>
                    웨이팅을 취소할까요?</p>
                <button className={"notCancel"} type={"button"}>아니요</button>
                <button className={"cancel"}>네, 취소할게요</button>
            </div>
        </div>
    );
}

export default cancelPopup