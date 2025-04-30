import React from "react";
import Button from "./Button.jsx";



function WaitingReg({reg}) {
    return (
        <div className={'app-container'}>
            <section>
                <h3 className={'waiting-title'}>
                    {reg.regName}에 웨이팅 등록 하시겠어요?
                </h3>
                <div style={{ border: '1px solid #dddddd', padding: '40px 10px', borderRadius: '10px', textAlign:'center'}}>
                    <div>현재 웨이팅</div>
                    <h4 className={'point-font pt-2'}>
                        {reg.regTeams}팀
                    </h4>
                </div>
            </section>
            <Button btnName={'웨이팅 등록하기'} />
        </div>
    );
}

export default WaitingReg;







