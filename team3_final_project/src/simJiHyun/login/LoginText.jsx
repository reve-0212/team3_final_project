import {useState} from "react";

function LoginText(props) {

    const [id, setId] = useState("");

    const idChange = (event) => {
        setId(event.target.value);
    }

    return (
        <div className={"mt-4 d-flex justify-content-center"}>
            <input type={props.type || 'text'}
                   className={"form-control py-3"}
                   placeholder={props.holder}
                   style={{width: '400px'}}
                   name={props.name}
                   onChange={idChange}/>
        </div>
    );
}

export default LoginText