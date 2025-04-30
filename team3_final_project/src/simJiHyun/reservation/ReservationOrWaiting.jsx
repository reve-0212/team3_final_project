function ReservationOrWaiting(props) {
    return (
        <div>
            {props.reservation === true ?
                <div className={"d-flex justify-content-start mb-0 gap-3"}>
                    <p style={{border: "1px solid #FFA31C", color: "#FFA31C"}}
                       className={"rounded-5 px-2"}>웨이팅</p>
                    <p style={{border: "1px solid #A3A3A3", color: "#A3A3A3"}}
                       className={"rounded-5 px-2 "}>예약</p>
                </div>
                :
                <div className={"d-flex justify-content-start mb-0 gap-3"}>
                    <p style={{border: "1px solid #A3A3A3", color: "#A3A3A3"}}
                       className={"rounded-5 px-2"}>웨이팅</p>
                    <p style={{border: "1px solid #FFA31C", color: "#FFA31C"}}
                       className={"rounded-5 px-2 "}>예약</p>
                </div>
            }

        </div>

    );
}

export default ReservationOrWaiting