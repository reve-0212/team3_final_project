function LoginText(props) {
    return (
        <div className={"row mt-4"}>
            <input type={"text"} className={"form-control shadow-sm py-3"}
                   placeholder={props.holder}/>
        </div>
    );
}

export default LoginText