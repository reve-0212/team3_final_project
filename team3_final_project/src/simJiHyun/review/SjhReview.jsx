import {faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera, faStar} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import ReviewTitle from "../reviewTitle.jsx";
import {useNavigate} from "react-router-dom";

function SjhReview() {
    // 별점 초기값은 0
    const [starScore, setStarScore] = useState(0);

    const Nv = useNavigate();

    // 별점 매기기 위한 핸들러
    // 별을 누르면 해당하는 i+1 번째 별에 i+1 점수가 매겨진다
    // i+1 이 starScore 보다 같거나 작다면 꽉 찬 별을, 아니면 빈 별을 출력한다
    const ratingStarHandler = () => {
        let result = [];
        for (let i = 0; i < 5; i++) {
            result.push(<span key={i + 1} onClick={() => setStarScore(i + 1)}>
                {i + 1 <= starScore ?
                    <FontAwesomeIcon icon={faStar}/> : <FontAwesomeIcon icon={faStarRegular}/>}
            </span>)
            console.log("starScore : " + starScore);
        }
        return result;
    }

    return (
        <div className={"container"}>
            <ReviewTitle review={"일반리뷰 등록"} onePick={"원픽리뷰 등록"}/>

            <div className={"d-flex flex-column justify-content-center align-items-center"}>
                <p className={"fs-6 mb-0"}>방문한 가게는 어떠셨나요?</p>

                <div className={"fs-3"}>
                    {ratingStarHandler()}
                </div>

                <textarea className={"form-control mt-3"} rows={10} style={{resize: "none"}}/>
            </div>

            <div className={"mt-3 mb-5"}>
                <div
                    style={{
                        width: "100px", height: "100px", backgroundColor: "white",
                        border: "1px solid #A9A9A9"
                    }}
                    className={"rounded-3 d-flex flex-column justify-content-center align-items-center"}>
                    <FontAwesomeIcon icon={faCamera} className={"fs-3"}/>
                    <p className={"fs-6 mb-0"}>사진 0/5</p>
                </div>
            </div>

            <div className={"d-flex justify-content-center"}>
                <button type={"button"} className={"btn rounded-3 text-light fw-bold flex-fill py-3 mt-5"}
                        style={{backgroundColor: "#FFA31C"}}
                        onClick={() => {
                            Nv("/reviewList")
                        }}>등록하기
                </button>
            </div>


        </div>
    );
}

export default SjhReview