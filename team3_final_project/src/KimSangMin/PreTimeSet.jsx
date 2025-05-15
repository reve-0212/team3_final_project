import { Button } from "react-bootstrap";
import {useEffect, useState} from "react";
import ReBanner from "./ReBanner.jsx";
import axios from "axios";

function PreTimeSet({ onEditClick }) {

    const token = localStorage.getItem('ACCESS_TOKEN');
    useEffect(() => {
        console.log("📦 페이지 로드시 token:", token);
    }, []);


    const input = [
        { day: "월", startHo: 9, startMi: 0, endHo: 18, endMi: 0 },
        { day: "화", startHo: 9, startMi: 0, endHo: 18, endMi: 0 },
        { day: "수", startHo: 9, startMi: 0, endHo: 18, endMi: 0 },
        { day: "목", startHo: 9, startMi: 0, endHo: 18, endMi: 0 },
        { day: "금", startHo: 9, startMi: 0, endHo: 18, endMi: 0 },
        { day: "토", startHo: 10, startMi: 0, endHo: 15, endMi: 0 },
        { day: "일", startHo: 10, startMi: 0, endHo: 15, endMi: 0 }
    ];

    const cateOpt = [
        { value: "한식", label: "한식" },
        { value: "중식", label: "중식" },
        { value: "양식", label: "양식" },
        { value: "일식", label: "일식" },
        { value: "분식", label: "분식" },
        { value: "카페", label: "카페" },
        { value: "퓨전", label: "퓨전" },
        { value: "기타", label: "기타" },
    ];

    const cateAddr = [
        { value: "중앙동", label: "중앙동" },
        { value: "대청동", label: "대청동" },
        { value: "동광동", label: "동광동" },
        { value: "남포동", label: "남포동" },
        { value: "영주동", label: "영주동" },
        { value: "대신동", label: "대신동" },
        { value: "초량동", label: "초량동" },
        { value: "부평동", label: "부평동" },
        { value: "동대신동", label: "동대신동" },
        { value: "서대신동", label: "서대신동" },
        { value: "충무동", label: "충무동" },
        { value: "아미동", label: "아미동" },
        { value: "서서동", label: "서서동" },
        { value: "범일동", label: "범일동" },
        { value: "좌천동", label: "좌천동" },
        { value: "만덕동", label: "만덕동" },
        { value: "영도동", label: "영도동" },
        { value: "해양동", label: "해양동" },
        { value: "동삼동", label: "동삼동" },
        { value: "전포동", label: "전포동" },
        { value: "범천동", label: "범천동" },
        { value: "온천동", label: "온천동" },
        { value: "명장동", label: "명장동" },
        { value: "사직동", label: "사직동" },
        { value: "용호동", label: "용호동" },
        { value: "대연동", label: "대연동" },
        { value: "감만동", label: "감만동" },
        { value: "구포동", label: "구포동" },
        { value: "덕천동", label: "덕천동" },
        { value: "우동", label: "우동" },
        { value: "중동", label: "중동" },
        { value: "송정동", label: "송정동" },
        { value: "하단동", label: "하단동" },
        { value: "괴정동", label: "괴정동" },
        { value: "신평동", label: "신평동" },
        { value: "장전동", label: "장전동" },
        { value: "부곡동", label: "부곡동" },
        { value: "대저동", label: "대저동" },
        { value: "녹산동", label: "녹산동" },
        { value: "거제동", label: "거제동" },
        { value: "연산동", label: "연산동" },
        { value: "수영동", label: "수영동" },
        { value: "민락동", label: "민락동" },
        { value: "괘법동", label: "괘법동" },
        { value: "감전동", label: "감전동" },
    ];

    const [hashTag , setHashTag ] = useState(['']);
    const [selectedCate, setSelectedCate] = useState('');
    const [selectedAddr, setSelectedAddr] = useState('');

    // 태그 값 추가하기
    const addTag = () => setHashTag([...hashTag,'']);


    // 안에 값 바꾸기
    const chTag = (index,value) => {
        const newHashTag = [...hashTag];
        newHashTag[index] = value;
        setHashTag(newHashTag)
    }

    // 길이가 1일때는 삭제 비활성화
    const removeTag = (index) => {
        if (hashTag.length > 1 && hashTag[index].length > 1) {
            const newHashTag = hashTag.filter((_,i) => i !== index);
            setHashTag(newHashTag)
        }
    }

    const hSubmit =(e) => {
        e.preventDefault();
        console.log("토큰 헤더:", {
            Authorization: `Bearer ${token}`,
        });
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        const cateData = {
            categoryName : selectedCate,
            categoryAddr : selectedAddr,
            categoryTag : hashTag.join(","),
        };

        axios.post("http://localhost:8080/pre/owner/saveCate",cateData,{
            headers :{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                // 요청이 성공했을 때 처리
                console.log("서버 응답:", response.data);
                console.log("카테고리 데이터", cateData);
                if (response.status === 200) {
                    alert('데이터가 성공적으로 저장되었습니다!');
                    console.log(response.data); // 응답 데이터 로깅 (필요시)
                    // 예: 다른 페이지로 이동하거나 추가 작업을 할 수 있음
                } else {
                    alert('서버에서 문제가 발생했습니다. 다시 시도해주세요.');
                }
            })
            .catch((error) => {
                // 요청 중 에러가 발생했을 때 처리
                console.error('서버 요청 중 오류 발생:', error);
                alert('서버 오류 발생. 잠시 후 다시 시도해주세요.');
            });
    }


    return (
        <div>
            <ReBanner />

            <div style={{ display: "flex", justifyContent: 'space-between' }}>
                <h4 className="text-start me-5"><strong>운영 시간</strong></h4>
                <Button
                    className="ms-auto"
                    style={{ backgroundColor: "#FFD727" }}
                    onClick={onEditClick}
                >
                    수정하기
                </Button>
            </div>
            <hr />

            <div className="ms-3" style={{ fontSize: '20px' }}>
                {input.map((val, index) => {
                    const stTime = `${String(val.startHo).padStart(2, '0')}:${String(val.startMi).padStart(2, '0')}`;
                    const fiTime = `${String(val.endHo).padStart(2, '0')}:${String(val.endMi).padStart(2, '0')}`;
                    return (
                        <div key={index}>
                            <p>{val.day}: {stTime} ~ {fiTime}</p>
                        </div>
                    );
                })}
            </div>
            <hr />
            {/* 카테고리 선택 */}
            <div className="ms-3 mt-3">
                <h5>카테고리 선택</h5>
                <br/>
                <select
                    style={{width :'200px', height:'60px'}}
                    value={selectedCate}
                    onChange={(e) => {
                        setSelectedCate(e.target.value);
                        console.log("선택한 카테고리:", e.target.value);
                    }}
                >
                    <option value="" >카테고리를 선택하세요</option>
                    {cateOpt.map((cate, index) => (
                        <option key={index} value={cate.value}>{cate.label}</option>
                    ))}
                </select>
            </div>
            <br/>

            <hr />

            {/* 지역 선택 */}
            <div className="ms-3 mt-3">
                <h5>지역 선택</h5>
                <br />
                <select
                    style={{width :'200px', height:'60px'}}
                    value={selectedAddr}
                    onChange={(e) => {
                        setSelectedAddr(e.target.value);
                        console.log("선택한 지역:", e.target.value);
                    }}
                >
                    <option value="">지역을 선택하세요</option>
                    {cateAddr.map((addr, index) => (
                        <option key={index} value={addr.value}>{addr.label}</option>
                    ))}
                </select>
            </div>
            <hr/>
            <br />

            <div className="mt-3">
                <h5>해시태그</h5>
                {hashTag.map((hashTag, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            value={hashTag}
                            onChange={(e) => chTag(index, e.target.value)}
                            placeholder="해시태그 입력"
                            style={{ width: '200px', height: '40px', marginRight: '10px' }}
                        />
                        <Button
                            onClick={() => removeTag(index)}
                            disabled={hashTag.length === 1}
                            style={{ backgroundColor: '#f38313', color: '#fff', height: '40px' }}
                        >
                            삭제
                        </Button>
                    </div>
                ))}
                <Button
                    onClick={addTag}
                    style={{ backgroundColor: '#FFD727', width: '200px', height: '40px' }}
                >
                    해시태그 추가
                </Button>
            </div>

            <div style={{display:'flex',justifyContent:'flex-end'}}>
            <Button
                onClick={hSubmit}
                style={{ backgroundColor: "#FFD727", width:'120px',height:'60px'}}
            >
                저장하기
            </Button>
        </div>
        </div>
    );
}

export default PreTimeSet;
