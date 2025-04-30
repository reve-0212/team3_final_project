function ReservationOrWaiting(props) {
    // true : 예약 , false : 웨이팅
    return (
        <div className={"d-flex justify-content-start mb-0 gap-3"}>
            <p onClick={() => props.switchRW(true)}
               style={{
                   border: `1px solid ${props.isReservation ? "#FFA31C" : "#A3A3A3"}`,
                   color: props.isReservation ? "#FFA31C" : "#A3A3A3",
                   cursor: "pointer"
               }}
               className={"rounded-5 px-2"}>예약</p>
            <p onClick={() => props.switchRW(false)}
               style={{
                   border: `1px solid ${props.isReservation ? "#A3A3A3" : "#FFA31C"}`,
                   color: props.isReservation ? "#A3A3A3" : "#FFA31C",
                   cursor: "pointer"
               }}
               className={"rounded-5 px-2"}>웨이팅</p>
        </div>
    );
}

export default ReservationOrWaiting