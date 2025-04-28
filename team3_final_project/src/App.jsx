
import axios from "axios";

function App() {

  const axiosTest = () => {
    axios.get("/test")
      .then(res => {
        console.log('success')
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <h1>team3 final project</h1>
      <button type={"button"} onClick={() => axiosTest()}>테스트</button>
    </div>
  )
}

export default App
