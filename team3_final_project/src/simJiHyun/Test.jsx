import axios from "axios";
import UseUrlStore from "../stores/UrlStore.jsx";
import {useEffect} from "react";

function Test() {
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

  // 실험용 url
  const {setUpUrl, url} = UseUrlStore();

  useEffect(() => {
    console.log(url)
  }, []);

  useEffect(() => {
    setUpUrl("asdf")
    console.log(url)
  }, [url]);

  return (
    <div>
      <h1>테스트</h1>
      <button type={"button"} onClick={() => axiosTest()}>테스트</button>
    </div>
  );
}

export default Test