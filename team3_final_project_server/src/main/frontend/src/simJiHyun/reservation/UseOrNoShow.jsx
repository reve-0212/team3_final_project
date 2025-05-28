function UseOrNoShow(props) {
  return (
    <div className={"d-flex justify-content-start gap-3"}>
      <p onClick={() => {
        props.switchUN("expected")
      }}
         className={"fw-bold fs-6"}
         style={{
           color: props.filterType === "expected" ? "#FFD727" : "#9E9E9E",
           cursor: "pointer",
           borderBottom: props.filterType === "expected" ? "2px solid #FFD727" : ""
         }}>이용 예정</p>

      <p onClick={() => {
        props.switchUN("completed")
      }}
         className={"fw-bold fs-6"}
         style={{
           color: props.filterType === "completed" ? "#FFD727" : "#9E9E9E",
           cursor: "pointer",
           borderBottom: props.filterType === "completed" ? "2px solid #FFD727" : ""
         }}>이용 완료</p>

      <p onClick={() => {
        props.switchUN("cancelled")
      }}
         className={"fw-bold fs-6"}
         style={{
           color: props.filterType === "cancelled" ? "#FFD727" : "#9E9E9E",
           cursor: "pointer",
           borderBottom: props.filterType === "cancelled" ? "2px solid #FFD727" : ""
         }}>취소</p>
    </div>
  );
}

export default UseOrNoShow