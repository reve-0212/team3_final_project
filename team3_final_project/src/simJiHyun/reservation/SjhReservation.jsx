import SjhReservationCard from "./SjhReservationCard.jsx";
import ReservationOrWaiting from "./ReservationOrWaiting.jsx";
import UseOrNoShow from "./UseOrNoShow.jsx";
import {useState} from "react";

// state
function SjhReservation() {
    // true : 이용예정/완료 , false : 취소/노쇼
    const [isUsed, setIsUsed] = useState(true)

    // true : 예약 , false : 웨이팅
    const [isReservation, setIsReservation] = useState(true)

    const allReservations = [
        // 웨이팅 (isReservation:false)
        // isUse : true(이용예정/완료), false(취소/노쇼)

        // isUse -> true
        // isVisit : true(이용 완료), false(이용 예정)

        // isUse -> false
        // isCancel : true(취소함), false(노쇼)

        // 왔다 간 가게
        {
            id: 1,
            isUse: true,
            isVisit: true,
            isReservation: false,
            restName: "해운대 암소 갈비집 (이용 완료/웨이팅)",
            time: "2024-05-02",
            visitTime:"00:00",
            number: 100,
            people: 2
        },
        // 아직 안간 가게
        {
            id: 2,
            isUse: true,
            isVisit: false,
            isReservation: false,
            restName: "블랙업 커피 (이용 예정/웨이팅)",
            time: "2024-05-03",
            number: 10,
            people: 4
        },
        // 취소한 가게
        {
            id: 3,
            isUse: false,
            isCancel: true,
            isReservation: false,
            restName: "간장게장 (취소/웨이팅)",
            time: "2024-05-02",
            number: 23,
            people: 1
        },
        // 노쇼한 가게
        {
            id: 4,
            isUse: false,
            isCancel: false,
            isReservation: false,
            restName: "장춘동왕족발보쌈 (노쇼/예약)",
            time: "2025-03-01",
            number: 32,
            people: 4
        },

        // 예약 (isReservation:true)
        // 왔다 간 가게
        {
            id: 5,
            isUse: true,
            isVisit: true,
            isReservation: true,
            restName: "해운대 암소 갈비집 (이용 완료/예약)",
            date: "2024-05-02",
            time: "00:00",
            people: 2
        },
        // 아직 안간 가게
        {
            id: 6,
            isUse: true,
            isVisit: false,
            isReservation: true,
            restName: "블랙업 커피 (이용 예정/예약)",
            date: "2024-05-02",
            time: "00:00",
            people: 4
        },
        // 취소한 가게
        {
            id: 7,
            isUse: false,
            isCancel: true,
            isReservation: true,
            restName: "간장게장 (취소/예약)",
            date: "2024-05-02",
            time: "00:00",
            people: 1
        },
        // 노쇼한 가게
        {
            id: 8,
            isUse: false,
            isCancel: false,
            isReservation: true,
            restName: "장춘동왕족발보쌈 (노쇼/예약)",
            date: "2024-05-02",
            time: "00:00",
            people: 4
        },
    ]

    const filteredReservations = allReservations.filter(r => r.isUse === isUsed && r.isReservation === isReservation)

    return (
        <div className={"container py-4"}>

            <UseOrNoShow
                switchUN={(val) => setIsUsed(val)}
                isUsed={isUsed}/>

            <ReservationOrWaiting
                switchRW={(val) => setIsReservation(val)}
                isReservation={isReservation}/>

            <div>
                {filteredReservations.map(r => (
                    <SjhReservationCard
                        key={r.id}
                        isUse={r.isUse}
                        isVisit={r.isVisit}
                        isCancel={r.isCancel}
                        isReservation={r.isReservation}
                        restName={r.restName}
                        date={r.date}
                        time={r.time}
                        visitTime={r.visitTime}
                        number={r.number}
                        people={r.people}/>
                ))}
            </div>
        </div>
    );
}

export default SjhReservation