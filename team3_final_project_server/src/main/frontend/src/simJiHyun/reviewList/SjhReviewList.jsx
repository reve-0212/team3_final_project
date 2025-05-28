import ReviewTitle from "../reviewTitle.jsx";
import Reviews from "./Reviews.jsx";

function SjhReviewList() {
    return (
        <div>
            <h3 className={'basic-font'} style={{fontSize:'23px', textAlign:'center', fontWeight:'bold'}}>리뷰 목록</h3>

            <Reviews/>

        </div>
    );
}

export default SjhReviewList