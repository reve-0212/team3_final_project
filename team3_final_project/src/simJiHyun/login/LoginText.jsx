function LoginText(props) {
    return (
        <div className={"mt-4 d-flex justify-content-center"}>
            <input type={"text"}
                   className={"form-control py-3"}
                   placeholder={props.holder}
                   style={{width: '400px'}}/>
        </div>
    );
}

export default LoginText