import PreReSet from "./PreReSet.jsx";
import PreWaSet from "./PreWaSet.jsx";
import PreSelect from "./PreSelect.jsx";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import PreCh from "./PreCh.jsx";
import PreDayCh from "./PreDayCh.jsx";
import PreRe from "./PreRe.jsx";
import PreTime from "./PreTime.jsx";
import PreTimeSet from "./PreTimeSet.jsx";
import PreReserve from "./PreReserve.jsx";
import PreWait from "./PreWait.jsx";

function SangMinApp()
{
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<PreSelect />} />
                  <Route path="/pre/PreReserve" element={<PreReserve />} />
                  <Route path="/pre/PreWait" element={<PreWait />} />
                  <Route path="/pre/PreCh" element={<PreCh />} />
                  <Route path="/pre/PreRe" element={<PreRe />} />
                  <Route path="/pre/PreTime" element={<PreTime />} />
                  <Route path="/pre/PreTimeSet" element={<PreTimeSet />} />
                  <Route path="/pre/PreDayCh" element={<PreDayCh />} />
                  <Route path="/pre/PreWaSet" element={<PreWaSet />} />
                  <Route path="/pre/PreReSet" element={<PreReSet />} />
              </Routes>
          </BrowserRouter>

      </div>
  )
}

export default SangMinApp

