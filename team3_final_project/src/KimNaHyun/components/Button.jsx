import React from "react";
import '../KnhMain.css';
const Button = ({btnName, onClick}) => {

    return (
        <div className={'mt-5 d-flex justify-content-center'}>
          <button className={'common-btn'} onClick={onClick}>{btnName}</button>
        </div>

    );
}

export default Button






