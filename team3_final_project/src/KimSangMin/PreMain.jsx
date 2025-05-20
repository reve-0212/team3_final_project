import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import '../JangDaJung/css/CeoMain.css';
import ReBanner from "./ReBanner.jsx";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function PreMain() {
    // console.log(localStorage.getItem('ACCESS_TOKEN'));
    const token = localStorage.getItem('ACCESS_TOKEN');

    const [timeSlots, setTimeSlots] = useState([]);
    const [reservationData, setReservationData] = useState([]);
    const [storeName, setStoreName] = useState([]);
    const {resIdx} = useParams();
    // const navigate = useNavigate();

    const today = new Date().toISOString().split('T')[0];

    const startDateTime = today + ' 00:00:00';
    const endDateTime = today + ' 23:59:59';
    // 리뷰
    const [reviewScoreData, setReviewScoreData] = useState([]);
    // const [reviewData, setReviewData] = useState([]);
    const [averageScore, setAverageScore] = useState(0);

    // 총 리뷰수
    const totalReviews = reviewScoreData.reduce((acc, item) => acc + item.count, 0);

    useEffect(() => {
        if (resIdx !== null) {
            fetchResName();
        }
    }, [resIdx]);

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

    useEffect(() => {
        if (resIdx !== null) {
            fetchReview();
        }
    }, [resIdx]);

    const fetchResName = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/history/storeInfo`, {
                params: { resIdx: resIdx },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            const data = response.data;
            if (data && data.res_name) {
                setStoreName(data.res_name);
            }
        } catch (err) {
            console.error("가게 이름 불러오기 실패", err);
        }
    };
    const fetchResTime = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/history/restaurant/${resIdx}/reservationTime`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
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
            const response = await axios.get(`http://localhost:8080/api/history/reservation/hourMain`, {
                params: {
                    startDate: startDateTime,
                    endDate: endDateTime,
                    resIdx: resIdx
                },
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
            const fetched = response.data; // [{time: "11:00", count: 3}, ...]

            // 응답 데이터를 Map으로 변환
            const timeMap = {};
            fetched.forEach(item => {
                timeMap[item.hour] = item.teamCount;
            });

            // timeSlots 기준으로 항상 시간대 만들기
            const data = timeSlots.map(time => ({
                time,
                count: timeMap[time] || 0 // 데이터가 없으면 0으로 설정
            }));
            setReservationData(data);
            console.log(data);
        } catch (err) {
            console.error("예약 기록 가져오기 실패", err);
        }
    };

    const totalWaitingCount = reservationData.reduce((acc, item) => acc + item.count, 0);

    const fetchReview = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/pre/review/main`,{
                params: {resIdx: resIdx},
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("리뷰 응답:", response.data);
            const data = response.data;
            setAverageScore(data.averageScore || 0);
            setReviewScoreData(data.reviewScoreData || []);
            console.log("리뷰 점수별 데이터:", reviewScoreData);
            // setReviewData(data.monthlyCounts || []);
        } catch (err) {
            console.log("리뷰 들고오기 실패", err);
        }
    }

    return (
        <div>
            <ReBanner/>
            <div className={'ceo-main'} style={{marginTop: '10vh'}}>
                <div className={'CeoMain-content'}>
                    <h2 className={'CeoMain-title mb-4'}>{storeName}</h2>
                    <div className={'row g-4'}>
                        {/*  카드 1 - 예약 수 */}
                        <div className={'col-12 col-md-6'}>
                            <Link to={`/pre/PreCh/${resIdx}`} className={'text-decoration-none'}>
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
                            <Link to={`/pre/PreRe/${resIdx}`} style={{textDecoration: 'none', color: 'black'}}>
                                <div className={'custom-card'}>
                                    <div className={'card-header-text'}>리뷰</div>
                                    <div className={'d-flex align-items-center mb-4'}>
                                        <div className={'text-center me-4'} style={{minWidth: '80px'}}>
                                            <p style={{fontSize: '1.2rem', margin: 0}}>⭐️</p>
                                            <p className={'review-star-score'}
                                               style={{fontSize: '2rem', margin: 0}}>{averageScore.toFixed(1)}</p>
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
                                    {/*<div className={'chart-wrapper mt-4'}>*/}
                                    {/*    <ResponsiveContainer width={'100%'} height={150}>*/}
                                    {/*        <BarChart data={reviewData} barCategoryGap={'20%'}>*/}
                                    {/*            <XAxis dataKey={'month'}/>*/}
                                    {/*            <YAxis/>*/}
                                    {/*            <Tooltip/>*/}
                                    {/*            <Bar dataKey={'reviews'} fill={'#5a3a2e'} barSize={12}/>*/}
                                    {/*        </BarChart>*/}
                                    {/*    </ResponsiveContainer>*/}
                                    {/*</div>*/}
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
