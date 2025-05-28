import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import './css/CeoMain.css';
import WaBanner from "../KimSangMin/WaBanner.jsx";

const waitingData = [
    { time: '13시', count: 5 },
    { time: '14시', count: 5 },
    { time: '15시', count: 5 },
    { time: '16시', count: 2 },
    { time: '17시', count: 6 },
    { time: '18시', count: 5 },
    { time: '19시', count: 5 },
];

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

function CeoMain() {
    return (
        <div className={'ceo-main'} style={{ marginTop: '10vh'}}>
            < WaBanner />
            <div className={'CeoMain-content'}>
                <h2 className={'CeoMain-title mb-4'}>가게 이름</h2>
                <div className={'row g-4'}>
                    {/*  카드 1 - 워에팅 수 */}
                    <div className={'col-12 col-md-6'}>
                        <div className={'custom-card'}>
                            <div className={'card-header-text'}>오늘 웨이팅 수</div>
                            <div className={'chart-wrapper'}>
                                <ResponsiveContainer width={'100%'} height={150}>
                                    <BarChart data={waitingData} barCategoryGap={"5%"}>
                                        <XAxis dataKey={'time'}/>
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey={'count'} fill={'#5a3a2e'} barSize={12} />
                                    </BarChart>
                                </ResponsiveContainer>
                                <p className={'chart-bottom-text'}>총 00건</p>
                            </div>
                        </div>
                    </div>
                    {/* 카드 2-리뷰 */}
                    <div className={'col-12 col-md-6'}>
                        <div className={'custom-card'}>
                            <div className={'card-header-text'}>리뷰</div>
                            <div className={'d-flex align-items-center mb-4'}>
                                <div className={'text-center me-4'} style={{ minWidth: '80px'}}>
                                    <p style={{ fontSize: '1.2rem', margin: 0 }}>⭐️</p>
                                    <p className={'review-star-score'} style={{ fontSize: '2rem', margin: 0 }}>4.3</p>
                                </div>
                                {/* 각 점수마다 리뷰 갯수 가로 그래프*/}
                                <div className={'flex-grow-1'}>
                                    <ul className={'review-score-list'}>
                                        {reviewScoreData.map((item) => {
                                            const percent = totalReviews > 0 ? (item.count / totalReviews) * 100 : 0;
                                            return (
                                                <li key={item.score} className={'d-flex align-items-center justify-content-between mb-2'}>
                                                    <span style={{ width: '30px' }}>{item.score}점</span>
                                                    <div style={{ flexBasis: "60%", margin: "0 0.5rem" }}>
                                                        <div className={'progress'} style={{ height: '8px' }}>
                                                            <div className={'progress-bar bg-warning'} style={{ width: `${percent}%`}}></div>
                                                        </div>
                                                    </div>
                                                    <span style={{ width: '50px', textAlign: 'right' }}>{item.count}개</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className={'chart-wrapper mt-4'}>
                                <ResponsiveContainer width={'100%'} height={150}>
                                    <BarChart data={reviewData} barCategoryGap={'20%'}>
                                        <XAxis dataKey={'month'} />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey={'reviews'} fill={'#5a3a2e'} barSize={12} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CeoMain