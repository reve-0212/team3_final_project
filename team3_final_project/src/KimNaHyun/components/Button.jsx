import React from "react";
import '../KnhMain.css';
const Button = ({btnName, onClick}) => {

    return (
        <div className={'m-5'}>
          <button className={'common-btn'} onClick={onClick}>{btnName}</button>
        </div>

    );
}

export default Button






