import './App.css'
// import axios from "axios";
import Banner from "./KimSangMin/Banner.jsx";
import PreSetting from "./KimSangMin/PreSetting.jsx";
import PreTime from "./KimSangMin/PreTime.jsx";

function App() {

  // const axiosTest = () => {
  //   axios.get("/test")
  //     .then(res => {
  //       console.log('success')
  //       console.log(res)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  return (
    <div>
      {/*<h1>team3 final project</h1>*/}
      {/*  <PreSetting/>*/}
        <PreTime/>
      {/*<button type={"button"} onClick={() => axiosTest()}>테스트</button>*/}
    </div>
  )
}

export default App
