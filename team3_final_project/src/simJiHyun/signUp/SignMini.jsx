function SignMini(props) {
    return (
        <div className={"row mt-4"}>
            <div className={"col"}>
                <label htmlFor={props.id} className={"form-label fs-3"}>{props.label}</label>
                <input type={"text"} className={"form-control shadow-sm py-3"}
                       id={props.id} placeholder={props.holder}/>
            </div>
        </div>
    );
}

export default SignMini