import ReviewTitle from "../reviewTitle.jsx";
import Reviews from "./Reviews.jsx";

function SjhReviewList() {
    return (
        <div>
            <ReviewTitle review={"일반리뷰"} onePick={"원픽리뷰"}/>

            <Reviews/>
            <Reviews/>
            <Reviews/>
        </div>
    );
}

export default SjhReviewList