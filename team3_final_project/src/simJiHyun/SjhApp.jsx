import Login from "./login/Login.jsx";
import SignUp from "./signUp/SignUp.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SjhMain from "./SjhMain.jsx";
import SjhReservation from "./reservation/SjhReservation.jsx";

function SjhApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<SjhMain/>}/>
                <Route path={"logIn"} element={<Login/>}/>
                <Route path={"signUp"} element={<SignUp/>}/>
                <Route path={"reservation"} element={<SjhReservation/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default SjhApp