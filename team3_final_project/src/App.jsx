import SjhApp from "./simJiHyun/SjhApp.jsx";
import PreTime from "./KimSangMin/PreTime.jsx";
import KnhApp from "./KimNaHyun/KnhApp.jsx";
import Visitor from "./KimNaHyun/waiting/Visitor.jsx";

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
     <KnhApp />
    </div>
  )
}

export default App
