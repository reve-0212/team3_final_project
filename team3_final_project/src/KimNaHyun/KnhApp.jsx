
import WaitingInfoPage from "./page/WaitingInfoPage.jsx";
import DatePage from "./page/DatePage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SjhMain from "../simJiHyun/SjhMain.jsx";
import Login from "../simJiHyun/login/Login.jsx";
import SignUp from "../simJiHyun/signUp/SignUp.jsx";
import SjhReservation from "../simJiHyun/reservation/SjhReservation.jsx";
import WaitingRegPage from "./page/WaitingRegPage.jsx";


function KnhApp() {
    return (
        <div>
            <DatePage />
            {/*<WaitingRegPage />*/}
        </div>

    // <BrowserRouter>
    //     <Routes>
    //         <Route index element={<SjhMain/>}/>
    //         <Route path={"logIn"} element={<Login/>}/>
    //         <Route path={"signUp"} element={<SignUp/>}/>
    //         <Route path={"reservation"} element={<SjhReservation/>}/>
    //     </Routes>
    // </BrowserRouter>
    );
}

export default KnhApp






