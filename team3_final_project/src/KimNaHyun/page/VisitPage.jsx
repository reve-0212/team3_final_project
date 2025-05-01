import Button from "../components/Button.jsx";
import VisitorBtn from "../components/VisitorBtn.jsx";
import {useNavigate} from "react-router-dom";

function visitPage(props) {
    const {gender} = props;
    const Nv = useNavigate();
    const path = window.location.pathname

    const handlePath = (e) => {
        e.preventDefault();

        if (path.includes("waiting")) {
            Nv("/waiting/seat")
        } else {
            Nv("/book/date")
        }
    }


    return (
        <div className={'app-container'} style={{textAlign: 'left'}}>
            <h3 className={'waiting-title'}>방문인원을 선택하세요.</h3>
            <ul>
                <li>
                    <h3 style={{fontWeight: 'bold', fontSize: '25px'}}>성인</h3>
                    <VisitorBtn gender={"남성"}/>
                    <VisitorBtn gender={"여성"}/>

                </li>
            </ul>
            <ul>
                <li>
                    <h3 style={{fontWeight: 'bold', fontSize: '25px'}}>유아</h3>
                    <VisitorBtn gender={"유아"}/>
                </li>
            </ul>
            <Button btnName={'다음'} onClick={handlePath}/>
        </div>

    );

}


export default visitPage






