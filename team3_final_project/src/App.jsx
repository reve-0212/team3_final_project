import './App.css'
import Test from "./simJiHyun/Test.jsx";

// import axios from "axios";
import Banner from "./KimSangMin/Banner.jsx";
import PreSetting from "./KimSangMin/PreSetting.jsx";

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
        <PreSetting/>
      {/*<button type={"button"} onClick={() => axiosTest()}>테스트</button>*/}
    </div>
  )
}

export default App
