function UseOrNoShow(props) {
    return (
        <div>
            {props.inUse===true?
                <div className={"d-flex justify-content-start gap-3"}>
                    <p className={"fw-bold fs-6"}
                       style={{color: "#FFA31C", borderBottom: "2px solid #FFA31C"}}>이용예정/완료</p>
                    <p className={"fw-bold fs-6"} style={{color: "#9E9E9E"}}>취소/노쇼</p>
                </div>
                :
                <div className={"d-flex justify-content-start gap-3"}>
                    <p className={"fw-bold fs-6"} style={{color: "#9E9E9E"}}>이용예정/완료</p>
                    <p className={"fw-bold fs-6"}
                       style={{color: "#FFA31C", borderBottom: "2px solid #FFA31C"}}>취소/노쇼</p>
                </div>
            }
        </div>
    );
}

export default UseOrNoShow