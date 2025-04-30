import {useState} from "react";

function LoginText(props) {

    const idChange = (event) => {
        setId(event.target.value);
        console.log(id);
    }

    return (
        <div className={"mt-4 d-flex justify-content-center"}>
            <input type={"text"}
                   className={"form-control py-3"}
                   placeholder={props.holder}
                   style={{width: '400px'}}
                   onChange={idChange}/>
        </div>
    );
}

export default LoginText