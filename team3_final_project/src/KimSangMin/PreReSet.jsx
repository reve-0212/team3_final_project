import {useState} from "react";
import Banner from "./Banner.jsx";
import {Link} from "react-router-dom";


function PreReSet() {

  const [input, setInput] = useState(['']);

  // 예약 가능한 시간 관리
  const [resTime, setReTime] = useState(['']);


  // 시간 추가
  const addTime = () => {
    setReTime([...resTime, '']);
  };

  // 시간 삭제
  const delTime = () => {
    setReTime(resTime.slice(0, -1));
  };

  // 시간 값 변경
  const chTime = (index, value) => {
    const upTime = [...resTime];
    upTime[index] = value;
    setReTime(upTime);
  };



  // 편의시설 적는 칸 추가하기.
  const addInput = () => {
    setInput([...input, '']);
  };

  // 편의시설 적는 칸 삭제하기.
  const rmInput = () => {
    setInput(input.slice(0, -1));
  }

  // input 안의 값 변경하기
  const chInput = (index, value) => {
    const upInput = [...input];
    upInput[index] = value;
    setInput(upInput);
  };

  const hChange = (e, field) => {
    const upRest = [...Rest];
    upRest[0][field] = e.target.value;
    SetRest(upRest);
  };


  const [Rest, SetRest] = useState([
    {
      Title: "가게이름",
      Phone: "가게번호",
      Address: "가게주소",
      HashTag: "가게 해시태그",
      Content: "가게 소개",
      Function: "가게 기능"
    },
  ]);

  const hSub = (e) => {
    e.preventDefault();

    const {Title, Phone, Address, Content, time} = Rest[0];

    if (!Title || !Phone || !Address || !Content || !time ||input.some(i => i.trim() === '')) {
      alert("필수 항목이 입력되지 않았습니다.");
      return;
    }

    const storeData = {
      ...Rest[0],
      facilities: input,
    };

    console.log("저장할 데이터 : ", storeData);

  };


  return (
      <div
          style={{
            marginLeft: '300px',
            paddingTop: '8rem',
            paddingLeft: '1rem',
            width: 'calc(100% - 200px)',
            maxWidth: '1000px'
          }}
      >
        <form onSubmit={hSub}>
        <Banner/>
          <div style={{display:'flex'}}>
        <Link to="/pre/PreReSet" style={{textDecoration:'none',color:"black"}}><h4 className="text-start me-4">가게정보</h4></Link>
            <Link to="/pre/PreTimeSet" style={{textDecoration:'none',color:"black"}}><h4>운영정보</h4></Link>
          </div>
        <hr/>
        <br/>


        <h4 className="text-start"><strong>가게 대표 이미지</strong></h4>

        <div className="mb-4">

          <input
              type="file"
              id="imageUpload"
              className="form-control"
              accept="image/*"
              style={{ width: '300px', height: '35px' }}
          />
        </div>

        <hr/>
        <br/>

        {/* 가게 이름 */}
        <h4 className="text-start"><strong>가게 이름</strong>
          <span style={{color:"#FFD727", fontSize: "14px"}}> *필수</span></h4>
        <div className="mb-4">

          <input
              type="text"
              id="Title"
              className="form-control"
              style={{ width: '300px', height: '50px' }}
              value={Rest[0].Title}
              onChange={(e) => hChange(e,'Title')}
              required={true}
          />
        </div>

        <hr/>
        <br/>

        {/* 가게 전화번호 */}
        <h4 className="text-start"><strong>가게 번호</strong>
          <span style={{color:"#FFD727", fontSize: "14px"}}> *필수</span></h4>
        <div className="mb-4">

          <input
              type="text"
              id="Phone"
              className="form-control"
              style={{ width: '300px', height: '50px' }}
              value={Rest[0].Phone}
              onChange={(e) => hChange(e,'Phone')}
              required={true}
          />
        </div>

        <hr/>
        <br/>

        {/* 가게주소 */}
        <h4 className="text-start"><strong>가게 주소</strong>
          <span style={{color:"#FFD727", fontSize: "14px"}}> *필수</span></h4>

        <div className="mb-4">
          <input
              type="text"
              id="Address"
              className="form-control"
              style={{ width: '300px', height: '50px' }}
              value={Rest[0].Address}
              onChange={(e) => hChange(e,'Address')}
              required={true}
          />
        </div>

        <hr/>
        <br/>

        {/* 가게 소개 */}
        <h4 className="text-start"><strong>가게 소개</strong>
          <span style={{color:"#FFD727", fontSize: "14px"}}> *필수</span></h4>

        <div className="mb-4">
            <textarea
                id="Content"
                className="form-control"
                style={{ width: '800px', height: '100px' }}
                value={Rest[0].Content}
                onChange={(e) => hChange(e,'Content')}
                required={true}
            />
        </div>

        <hr/>
        <br/>

        {/* 편의시설 작성 */}
        <h4 className="text-start"><strong>편의시설</strong>
          <span style={{color:"#FFD727", fontSize: "14px"}}> *필수</span></h4>

        <div className="mb-4">
          {input.map((val, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input
                    type="text"
                    value={val}
                    onChange={(e) => chInput(index, e.target.value)}
                    className="form-control"
                    style={{ width: '300px', height: '50px' }}
                    required
                />
                {index === input.length - 1 && (
                    <div style={{ marginLeft: '10px' }}>
                      <button className='btn btn-sm' onClick={addInput} style={{ marginRight: '5px', border :'1px solid #FFD727' }}>
                        추가
                      </button>
                      <button className='btn btn-sm' style={{ border :'1px solid #FFD727'}} onClick={rmInput}>삭제</button>
                    </div>
                )}
              </div>
          ))}
        </div>

        <hr/>
        <br/>

        {/* 예약 가능한 시간 설정 */}
        <h4 className="text-start"><strong>예약 가능한 시간</strong>
          <span style={{color:"#FFD727", fontSize: "14px"}}> *필수</span></h4>

        <div className="mb-4">
          {resTime.map((time, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => chTime(index, e.target.value)}
                    className="form-control"
                    style={{ width: '300px', height: '50px' }}
                    required
                />
                {index === resTime.length - 1 && (
                    <div style={{ marginLeft: '10px' }}>
                      <button className='btn btn-sm' onClick={addTime} style={{ marginRight: '5px', border: '1px solid #FFD727' }}>
                        추가
                      </button>
                      <button className='btn btn-sm' style={{ border: '1px solid #FFD727' }} onClick={delTime}  disabled={resTime.length === 1} >삭제</button>
                    </div>
                )}
              </div>
          ))}
        </div>

        <hr/>
        <br/>
          <div className="text-end mt-4">
            <button
                type="submit"
                className="btn"
                style={{ backgroundColor: "#FFD727", color: "black", padding: "10px 20px", marginBottom:'50px' }}
            >
              저장하기
            </button>
          </div>
        </form>
      </div>
  );
}
export default PreReSet

