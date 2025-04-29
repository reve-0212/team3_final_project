import Button from "../waiting/Button.jsx";
import VisitorBtn from "../waiting/VisitorBtn.jsx";

function visitPage(props) {
    const {gender} = props;


    return (
        <div className={'app-container'} style={{ textAlign:'left'  }}>
            <h3 className={'waiting-title'}>방문인원을 선택하세요.</h3>
            <ul>
                <li>
                    <h3 style={{fontWeight:'bold', fontSize:'25px'}}>성인</h3>
                    <VisitorBtn gender={"남성"} />
                    <VisitorBtn gender={"여성"} />

                </li>
            </ul>
            <ul>
                <li>
                    <h3 style={{fontWeight:'bold', fontSize:'25px'}}>유아</h3>
                    <VisitorBtn gender={"유아"} />
                </li>
            </ul>
            <Button btnName={'다음'}/>
        </div>

    );

            }




export default visitPage






