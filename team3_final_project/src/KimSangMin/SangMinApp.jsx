import PreReSet from "./PreReSet.jsx";
import PreWaSet from "./PreWaSet.jsx";
import PreSelect from "./PreSelect.jsx";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import PreCh from "./PreCh.jsx";
import PreDayCh from "./PreDayCh.jsx";
import PreRe from "./PreRe.jsx";
import PreTime from "./PreTime.jsx";
import PreTimeSet from "./PreTimeSet.jsx";

function SangMinApp()
{
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<PreSelect />} />
                  <Route path="/PreCh" element={<PreCh />} />
                  <Route path="/PreRe" element={<PreRe />} />
                  <Route path="/PreTime" element={<PreTime />} />
                  <Route path="/PreTimeSet" element={<PreTimeSet />} />
                  <Route path="/PreDayCh" element={<PreDayCh />} />
                  <Route path="/PreWaSet" element={<PreWaSet />} />
                  <Route path="/PreReSet" element={<PreReSet />} />
              </Routes>
          </BrowserRouter>

      </div>
  )
}

export default SangMinApp

