import WaBanner from "./WaBanner.jsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ReBanner from "./ReBanner.jsx";
import api from "../api/axios.js";
import Swal from "sweetalert2";
// import PreTimeSet from "./PreTimeSet.jsx";
// import {Link} from "react-router-dom";

function PreTime({onClose}) {

    const wDays = ["월", "화", "수", "목", "금", "토", "일"];
    const token = localStorage.getItem("ACCESS_TOKEN");


    //저장되어있는지 확인
    const [isSave, setIsSave] = useState(false);

    // 요일 순서대로 폼 출력
    const [input , setInput] = useState(
        wDays.map(day => ({
            day,
            startHo: '',
            startMi:'',
            endHo:'',
            endMi:''
        }))
    );

    const chInput = (index, field, value) => {
        const newInput = [...input];
        newInput[index][field] = value;
        setInput(newInput);
    };

    // 저장된 시간 불러오기
    useEffect(() => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        api.get("/pre/owner/getTime", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                const data = response.data.data;
                if (data && data.length > 0) {
                    const load = data.map(item => {
                        const [startHo = '', startMi = ''] = item.startTime?.split(":") || [];
                        const [endHo = '', endMi = ''] = item.endTime?.split(":") || [];
                        return {
                            day: item.day,
                            startHo,
                            startMi,
                            endHo,
                            endMi
                        };
                    });
                    setInput(load);
                    setIsSave(true);
                }
            })
            .catch((error) => {
                console.error("시간 불러오기 실패:", error);
            });
    }, []);

    // 설정한 데이터 저장
    const hSubmit = (e) => {
        e.preventDefault();

        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        const formatted = input.map(item => ({
            day: item.day,
            startTime: item.startHo && item.startMi ? `${item.startHo}:${item.startMi}` : null,
            endTime: item.endHo && item.endMi ? `${item.endHo}:${item.endMi}` : null
        }));

        if(!isSave) {
            api.post("/pre/owner/saveTime",
                formatted, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    if (res.data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: '저장 완료!',
                            text: '운영시간 정보가 저장되었습니다.',
                            confirmButtonColor: '#FFD727'
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: '오류',
                            text: '운영시간 정보 저장이 실패하였습니다.',
                            confirmButtonColor: '#FF3B30'
                        });
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: '오류',
                        text: '저장 중 오류가 발생하였습니다.',
                        confirmButtonColor: '#FF3B30'
                    });
                });
        }
        else{
            api.put(`/pre/owner/updateTime`, formatted, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    if(res.data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: '수정 완료!',
                            text: '수정 된 운영시간 정보가 저장되었습니다.',
                            confirmButtonColor: '#FFD727'
                        });
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: '오류',
                            text: '운영시간 정보 수정이 실패하였습니다.',
                            confirmButtonColor: '#FF3B30'
                        });
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: '오류',
                        text: '수정 중 오류가 발생하였습니다.',
                        confirmButtonColor: '#FF3B30'
                    });
                })
        }
    }

    return (
        <div>
            <ReBanner/>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h4 className="text-start"><strong>운영 시간 설정</strong></h4>
                <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={onClose}
                >
                    ← 돌아가기
                </button>
            </div>

            <hr/>

            <form onSubmit={hSubmit}>
                <div className="mb-4">
                    {input.map((val, index) => {
                        const stTime = val.startHo && val.startMi ? `${String(val.startHo).padStart(2, '0')}:${String(val.startMi).padStart(2, '0')}` : "미정";
                        const fiTime = val.endHo && val.endMi ? `${String(val.endHo).padStart(2, '0')}:${String(val.endMi).padStart(2, '0')}` : "미정";
                    return (
                        <div key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                            <div style={{width: '100px', fontWeight: 'bold'}}>{val.day}</div>

                            <input
                                type="number"
                                placeholder="시작 시간"
                                value={val.startHo}
                                onChange={(e) => chInput(index, 'startHo', e.target.value)}
                                className="form-control"
                                style={{width: '120px', margin: '0 5px'}}
                            />
                            <input
                                type="number"
                                placeholder="시작 분"
                                value={val.startMi}
                                onChange={(e) => chInput(index, 'startMi', e.target.value)}
                                className="form-control"
                                style={{width: '120px', marginRight: '10px'}}
                            />
                            <input
                                type="number"
                                placeholder="종료 시간"
                                value={val.endHo}
                                onChange={(e) => chInput(index, 'endHo', e.target.value)}
                                className="form-control"
                                style={{width: '120px', marginRight: '5px'}}
                            />
                            <input
                                type="number"
                                placeholder="종료 분"
                                value={val.endMi}
                                onChange={(e) => chInput(index, 'endMi', e.target.value)}
                                className="form-control"
                                style={{width: '120px'}}
                            />
                            <div style={{marginLeft: '10px', fontSize: '14px', color: '#555'}}>
                                {`${val.day} : ${stTime} ~ ${fiTime}`}
                            </div>
                        </div>
                    );
                    })}

                    <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '30px'}}>
                        <button type="submit" className="btn me-2" style={{backgroundColor: '#FFCD83'}}>
                            {isSave ? "수정" : "저장"}
                        </button>
                    </div>
                </div>
                <hr/>
            </form>

        </div>
    );
}

export default PreTime

