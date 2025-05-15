import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import '../JangDaJung/css/CeoMain.css';
import ReBanner from "./ReBanner.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

// const stores = [
//     {
//         storeName: '김또깡 식당',
//         check: [
//             {
//                 reserve: [
//                     { day: '2025-05-07', times: '11:00', count: 6 },
//                     { day: '2025-05-07', times: '12:00', count: 8 },
//                     { day: '2025-05-07', times: '13:00', count: 9 },
//                     { day: '2025-05-07', times: '14:00', count: 4 },
//                     { day: '2025-05-07', times: '15:00', count: 9 },
//                     { day: '2025-05-07', times: '16:00', count: 3 },
//                     { day: '2025-05-07', times: '17:00', count: 11 },
//                     { day: '2025-05-07', times: '18:00', count: 2 },
//                 ],
//             },
//         ],
//     },
// ];

// // 표에 나오는 기본 데이터를 기본으로 오늘 날짜로 저장
// const today = new Date().toISOString().split('T')[0]; // 오늘 날짜: "2025-04-29"과 같은 형식
//
// const store = stores[0]; // 현재는 첫 번째 가게만 사용하는 것으로 가정
//
// const waitingData = store.check
//     .flatMap(check => check.reserve)
//     .filter(reserve => reserve.day === today)
//     .map(reserve => ({
//         time: reserve.times,
//         count: reserve.count,
//     }));
//
//
// // 총 웨이팅 수
// const totalWaitingCount = waitingData.reduce((acc, item) => acc + item.count, 0);

const reviewScoreData = [
    {score: 5, count: 30},
    {score: 4, count: 15},
    {score: 3, count: 5},
    {score: 2, count: 1},
    {score: 1, count: 1},
]
// 총 리뷰수
const totalReviews = reviewScoreData.reduce((acc, item) => acc + item.count, 0);

const reviewData = [
    { month: '12월', reviews: 2 },
    { month: '11월', reviews: 4 },
    { month: '1월', reviews: 1 },
    { month: '2월', reviews: 3 },
    { month: '3월', reviews: 2 },
    { month: '4월', reviews: 5 },
];

function PreMain() {
    console.log(localStorage.getItem('ACCESS_TOKEN'));

    const [timeSlots, setTimeSlots] = useState([]);
    const [reservationData, setReservationData] = useState([]);
    const [storeName, setStoreName] = useState('김또깡');
    const [resIdx, setResIdx] = useState(null);
    const navigate = useNavigate();
    // const [tokenChecked, setTokenChecked] = useState(false);

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        axios.get(`http://localhost:8080/api/history/resIdxByUser`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            const resIdx = res.data;
            if (resIdx) {
                setResIdx(resIdx); // 성공적으로 resIdx 설정
                navigate(`/pre/PreMain/${resIdx}`);
            } else {
                alert("등록된 레스토랑이 없습니다.");
                navigate("/pre");
            }
        }).catch((err) => {
            console.error("레스토랑 조회 실패", err);
            alert("레스토랑 정보를 가져오는 데 실패했습니다.");
        });
    }, []);

    // if (!tokenChecked) return null;

    useEffect(() => {
        if (resIdx !== null) {
            fetchResTime();
        }
    }, [resIdx]);

    useEffect(() => {
        if (resIdx !== null && timeSlots.length > 0) {
            fetchReservationHistory();
        }
    }, [resIdx, timeSlots]);

    const fetchResTime = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/history/restaurant/${resIdx}/reservationTime`);
            let slots = response.data;
            if (typeof slots === 'string') slots = JSON.parse(slots);
            const cleanedSlots = slots.map(item => item.replace(/^\[|\]$/g, ''));
            setTimeSlots(cleanedSlots);
        } catch (err) {
            console.error("영업시간 정보 가져오기 실패", err);
        }
    }

    const fetchReservationHistory = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/history/reservation/hour`, {
                params: {
                    startDate: today,
                    endDate: today,
                    resIdx: resIdx
                }
            });
            const fetched = response.data; // [{time: "11:00", count: 3}, ...]

            // 응답 데이터를 Map으로 변환
            const timeMap = {};
            fetched.forEach(item => {
                timeMap[item.time] = item.count;
            });

            // timeSlots 기준으로 항상 시간대 만들기
            const data = timeSlots.map(time => ({
                time,
                count: timeMap[time] || 0 // 데이터가 없으면 0으로 설정
            }));
            setReservationData(data);
        } catch (err) {
            console.error("예약 기록 가져오기 실패", err);
        }
    };

    const totalWaitingCount = reservationData.reduce((acc, item) => acc + item.count, 0);


    return (
        <div>
            <ReBanner/>
            <div className={'ceo-main'} style={{marginTop: '10vh'}}>
                <div className={'CeoMain-content'}>
                    <h2 className={'CeoMain-title mb-4'}>{storeName}</h2>
                    <div className={'row g-4'}>
                        {/*  카드 1 - 예약 수 */}
                        <div className={'col-12 col-md-6'}>
                            <Link to="/pre/PreCh" className={'text-decoration-none'}>
                                <div className={'custom-card'}>
                                    <div className={'card-header-text'}>오늘 예약 수</div>
                                    <div className={'chart-wrapper'}>
                                        <ResponsiveContainer width={'100%'} height={200}>
                                            <BarChart data={reservationData} barCategoryGap={"5%"}>
                                                <XAxis
                                                    dataKey="time"
                                                    interval={0}
                                                    tick={{fontSize: 10}}
                                                    height={40}
                                                />
                                                <YAxis/>
                                                <Tooltip/>
                                                <Bar dataKey={'count'} fill={'#5a3a2e'} barSize={12}/>
                                            </BarChart>
                                        </ResponsiveContainer>
                                        <p className={'chart-bottom-text'}>총 {totalWaitingCount}건</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* 카드 2-리뷰 */}
                        {/* 카드 2 - 리뷰 */}
                        <div className={'col-12 col-md-6'}>
                            <Link to="/pre/PreRe" style={{textDecoration: 'none', color: 'black'}}>
                                <div className={'custom-card'}>
                                    <div className={'card-header-text'}>리뷰</div>
                                    <div className={'d-flex align-items-center mb-4'}>
                                        <div className={'text-center me-4'} style={{minWidth: '80px'}}>
                                            <p style={{fontSize: '1.2rem', margin: 0}}>⭐️</p>
                                            <p className={'review-star-score'}
                                               style={{fontSize: '2rem', margin: 0}}>4.3</p>
                                        </div>
                                        <div className={'flex-grow-1'}>
                                            <ul className={'review-score-list'}>
                                                {reviewScoreData.map((item) => {
                                                    const percent = totalReviews > 0 ? (item.count / totalReviews) * 100 : 0;
                                                    return (
                                                        <li key={item.score}
                                                            className={'d-flex align-items-center justify-content-between mb-2'}>
                                                            <span style={{width: '30px'}}>{item.score}점</span>
                                                            <div style={{flexBasis: "60%", margin: "0 0.5rem"}}>
                                                                <div className={'progress'} style={{height: '8px'}}>
                                                                    <div className={'progress-bar bg-warning'}
                                                                         style={{width: `${percent}%`}}></div>
                                                                </div>
                                                            </div>
                                                            <span style={{
                                                                width: '50px',
                                                                textAlign: 'right'
                                                            }}>{item.count}개</span>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className={'chart-wrapper mt-4'}>
                                        <ResponsiveContainer width={'100%'} height={150}>
                                            <BarChart data={reviewData} barCategoryGap={'20%'}>
                                                <XAxis dataKey={'month'}/>
                                                <YAxis/>
                                                <Tooltip/>
                                                <Bar dataKey={'reviews'} fill={'#5a3a2e'} barSize={12}/>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreMain