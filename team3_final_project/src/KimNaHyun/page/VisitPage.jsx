import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from "../components/Button.jsx";
import useUserStore from "../../stores/useUserStore.jsx";
import useResStoreSjh from "../../stores/useResStoreSjh.jsx";
import usePeopleStore from "../../stores/usePeopleStore.jsx";

function VisitorBtn({gender, count, onChange}) {
  const increase = () => onChange(gender, count + 1);
  const decrease = () => onChange(gender, Math.max(0, count - 1));

  return (
    <div className="d-flex justify-content-between mb-2">
      {gender === 'man' ? '남성' : gender === 'woman' ? '여성' : '유아'}
      <div style={{border: '1px solid #dddddd', padding: '0 10px', borderRadius: '10px'}}>
        <button className="prev-btn" onClick={decrease}>-</button>
        <span style={{margin: '0 10px'}}>{count}</span>
        <button className="next-btn" onClick={increase}>+</button>
      </div>
    </div>
  );
}

function VisitPage() {
  const Nv = useNavigate();
  const userIdxStore = useUserStore((state) => state.user)
  const res = useResStoreSjh((state) => state.res)
  const setPeople = usePeopleStore((state) => state.setPeople)

  useEffect(() => {
    console.log(res)
  }, [res]);

  const [visitors, setVisitors] = useState({man: 0, woman: 0, baby: 0});

  useEffect(() => {
    console.log("visitors.man")
    console.log(visitors.man)
  }, [visitors.man]);

  useEffect(() => {
    console.log("visitors.woman")
    console.log(visitors.woman)
  }, [visitors.woman]);

  useEffect(() => {
    console.log("visitors.baby")
    console.log(visitors.baby)
  }, [visitors.baby]);

  const handleCountChange = (gender, quantity) => {
    setVisitors((prev) => ({
      ...prev,
      [gender]: quantity,
    }));
  };

  const handleSubmit = () => {

    const userIdx = userIdxStore.userIdx;
    const resIdx = res.resIdx;

    setPeople(visitors)

    // 다음 페이지로 데이터 전달 (state로)
    Nv(`/book/date/${userIdx}/${resIdx}`);
  };

  return (
    <div className="app-container container py-4" style={{textAlign: 'left'}}>
      <h3 className="waiting-title">방문인원을 선택하세요.</h3>

      <ul>
        <li>
          <h3 style={{fontWeight: 'bold', fontSize: '20px'}}>성인</h3>
          <VisitorBtn gender="man" count={visitors.man} onChange={handleCountChange}/>
          <VisitorBtn gender="woman" count={visitors.woman} onChange={handleCountChange}/>
        </li>
      </ul>

      <ul className="pt-5 border-top">
        <li>
          <h3 style={{fontWeight: 'bold', fontSize: '20px'}}>유아</h3>
          <VisitorBtn gender="baby" count={visitors.baby} onChange={handleCountChange}/>
        </li>
      </ul>

      <Button btnName="다음" onClick={handleSubmit}/>
    </div>
  );
}

export default VisitPage;