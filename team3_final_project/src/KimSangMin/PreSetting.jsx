import {useState} from "react";
import Banner from "./Banner.jsx";
import AdminSeatEditor from "./AdminSeatEditor.jsx";
import UserSeatReservation from "./UserSeatReservation.jsx";


function PreSetting() {

    const [input, setInput] = useState(['']);

    const addInput = () => {
        setInput([...input, '']);
    };

    const rmInput = () => {
        setInput(input.slice(0, -1));
    }

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
        {
            Title: "가게이름",
            Phone: "가게번호",
            Address: "가게주소",
            HashTag: "가게 해시태그",
            Content: "가게 소개",
            Function: "가게 기능"
        }
    ]);



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

            <Banner/>
            <div className="d-flex">
                <h4 className="text-start me-5">가게정보</h4>
                <h4 className="text-start">운영정보</h4>
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

            <div style={{ display: 'flex', justifyContent: 'flex-end',marginTop:'30px'}}>
                <button className="btn me-2" style={{backgroundColor:'#FFCD83'}}>저장</button>
                <button className="btn " style={{backgroundColor:'#FFD727'}}>수정</button>
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

            <div style={{ display: 'flex', justifyContent: 'flex-end',marginTop:'30px'}}>
                <button className="btn me-2" style={{backgroundColor:'#FFCD83'}}>저장</button>
                <button className="btn " style={{backgroundColor:'#FFD727'}}>수정</button>
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

            <div style={{ display: 'flex', justifyContent: 'flex-end',marginTop:'30px'}}>
                <button className="btn me-2" style={{backgroundColor:'#FFCD83'}}>저장</button>
                <button className="btn " style={{backgroundColor:'#FFD727'}}>수정</button>
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

            <div style={{ display: 'flex', justifyContent: 'flex-end',marginTop:'30px'}}>
                <button className="btn me-2" style={{backgroundColor:'#FFCD83'}}>저장</button>
                <button className="btn " style={{backgroundColor:'#FFD727'}}>수정</button>
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

            <div style={{ display: 'flex', justifyContent: 'flex-end',marginTop:'30px'}}>
                <button className="btn me-2" style={{backgroundColor:'#FFCD83'}}>저장</button>
                <button className="btn " style={{backgroundColor:'#FFD727'}}>수정</button>
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
                <div style={{ display: 'flex', justifyContent: 'flex-end',marginTop:'30px'}}>
                    <button className="btn me-2" style={{backgroundColor:'#FFCD83'}}>저장</button>
                    <button className="btn " style={{backgroundColor:'#FFD727'}}>수정</button>
                </div>
            </div>

            <hr/>
            <br/>

            <AdminSeatEditor/>
        </div>
    );
}
export default PreSetting

