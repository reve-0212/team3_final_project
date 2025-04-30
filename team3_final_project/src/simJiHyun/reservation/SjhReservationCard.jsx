function SjhReservationCard(props) {
    return (
        <div style={{height: "350px", border: "1px solid #929292"}}
             className={"rounded-4 p-3 my-2"}>
            <div className={"d-flex align-items-center justify-content-between"}>
                <p className={"fw-bold fs-5"}>{props.restName}</p>
                {/*방문했다면 이용 완료, 방문하지 않았다면 이용 예정을 출력한다*/}
                <p className={"text-light fw-bold p-2"}
                   style={{backgroundColor: "#FFA31C", borderRadius: "10px"}}>
                    {props.isUse === true ? "이용 완료" : "이용 예정"}
                </p>
            </div>

            <div className={"fw-bold"}>
                <div className={"d-flex justify-content-between"}>
                    <p style={{color: "#929292"}}>접수 일시</p>
                    <p>{props.time}</p>
                </div>
                <div className={"d-flex justify-content-between"}>
                    <p style={{color: "#929292"}}>대기번호</p>
                    <p>{props.number}번</p>
                </div>
                <div className={"d-flex justify-content-between"}>
                    <p style={{color: "#929292"}}>인원</p>
                    <p>{props.people}명</p>
                </div>
            </div>

            {/*방문 여부에 따라 버튼 갯수가 달라진다*/}
            {props.isUse === true ?
                <div className={"d-flex flex-column gap-2"}>
                    <button type={"button"} className={"btn rounded-3"}
                            style={{border: "1px solid #929292"}}>대기 상세
                    </button>
                    <button type={"button"} className={"btn rounded-3"}
                            style={{border: "1px solid #C0C0C0", color: "#C0C0C0"}}>리뷰 등록하기
                    </button>
                </div>
                :
                <div className={"d-flex flex-column gap-2"}>
                    <button type={"button"} className={"btn rounded-3"}
                            style={{border: "1px solid #929292"}}>대기 상세
                    </button>
                    <button type={"button"} className={"btn rounded-3"}
                            style={{border: "1px solid #929292"}}>대기 취소하기
                    </button>
                </div>
            }
        </div>
    );
}

export default SjhReservationCard