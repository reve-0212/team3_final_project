function SignMini(props) {
    return (
        <div className={"mt-4 d-flex justify-content-center"}>
            <div>
                <label htmlFor={props.id} className={"form-label fs-3"}>{props.label}</label>
                <input type={"text"} className={"form-control py-3 input-box"}
                       id={props.id} placeholder={props.holder}/>
            </div>
        </div>
    );
}

export default SignMini