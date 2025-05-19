function reviewTitle(props) {
    return (
        <div className={"d-flex flex-row justify-content-center align-items-center gap-3 my-3"}>
            <p className={"fs-5 fw-bold"} style={{color: "#FFD727"}}>{props.review}</p>
            <p className={"fs-5 fw-bold"} style={{color: "#A9A9A9"}}>|</p>
            <p className={"fs-5 fw-bold"} style={{color: "#A9A9A9"}}>{props.onePick}</p>
        </div>
    );
}

export default reviewTitle