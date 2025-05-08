function UseOrNoShow(props) {
  console.log(props.isUsed)
    // true : 이용 예정/완료 , false : 취소/노쇼
    return (
        <div className={"d-flex justify-content-start gap-3"}>
            <p onClick={() => {
                props.switchUN(true)
            }}
               className={"fw-bold fs-6"}
               style={{
                   color: props.isUsed ? "#FFA31C" : "#9E9E9E",
                   cursor: "pointer",
                   borderBottom: props.isUsed ? "2px solid #FFA31C" : ""
               }}>이용예정/완료</p>
            <p onClick={() => {
                props.switchUN(false)
            }}
               className={"fw-bold fs-6"}
               style={{
                   color: props.isUsed ? "#9E9E9E" : "#FFA31C",
                   cursor: "pointer",
                   borderBottom: props.isUsed ? "" : "2px solid #FFA31C"
               }}>취소/노쇼</p>
        </div>
    );
}

export default UseOrNoShow