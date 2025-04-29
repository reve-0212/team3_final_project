import SjhReservationCard from "./SjhReservationCard.jsx";

function SjhReservation() {
    return (
        <div className={"container vh-100 my-3"}>

            <div className={"input-box ms-3"}>
                <div className={"d-flex justify-content-start ms-3"}>
                    <p className={"me-3 fw-bold fs-6"}
                       style={{color: "#FFA31C", borderBottom: "3px solid #FFA31C"}}>이용예정/완료</p>
                    <p className={"fw-bold fs-6"} style={{color: "#9E9E9E"}}>취소/노쇼</p>
                </div>

                <div className={"d-flex justify-content-start ms-3 mb-0"}>
                    <p>예약</p>
                    <p>웨이팅</p>
                </div>

                <div>
                    <SjhReservationCard isUse={false}
                                        restName={"해운대암소갈비집"}
                                        time={"2010-10-10"}
                                        number={200}
                                        people={2}/>

                    <SjhReservationCard isUse={true}
                                        restName={"블랙업커피"}
                                        time={"2010-11-11"}
                                        number={10}
                                        people={5}/>
                </div>
            </div>


        </div>
    );
}

export default SjhReservation