import React from "react";
import '../KnhMain.css';
const Button = ({btnName}) => {
    return (
        <div className={'m-5'}>
            <div className={'common-btn'}>
                {btnName}
            </div>
        </div>

    );
}

export default Button






