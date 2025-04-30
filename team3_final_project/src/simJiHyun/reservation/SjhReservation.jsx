import SjhReservationCard from "./SjhReservationCard.jsx";
import ReservationOrWaiting from "./ReservationOrWaiting.jsx";
import UseOrNoShow from "./UseOrNoShow.jsx";

function SjhReservation() {
    return (
        <div className={"container py-3 d-flex justify-content-center"}>
            <div className={"input-box"}>
                <UseOrNoShow inUse={true}/>

                <ReservationOrWaiting reservation={true}/>

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