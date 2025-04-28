import SjhNavWithText from "../nav/SjhNavWithText.jsx";
import "../SjhCss.css"
import SjhReservationCard from "./SjhReservationCard.jsx";

function SjhReservation() {
    return (
        <div className={"container app-container"}>
            <SjhNavWithText/>

            <div className={"input-box ms-3"}>
                <div className={"d-flex justify-content-start mt-2 mb-0 ms-3"}>
                    <p className={"me-3 fw-bold fs-6"}
                       style={{color: "#FFA31C", borderBottom: "3px solid #FFA31C"}}>이용예정/완료</p>
                    <p className={"fw-bold fs-6"} style={{color: "#9E9E9E"}}>취소/노쇼</p>
                </div>

                <SjhReservationCard isUse={true}
                                    restName={"해운대암소갈비집"}
                                    time={"2010-10-10"}
                                    number={200}
                                    people={2}/>

                <SjhReservationCard isUse={false}
                                    restName={"블랙업커피"}
                                    time={"2010-11-11"}
                                    number={10}
                                    people={5}/>
            </div>


        </div>
    );
}

export default SjhReservation