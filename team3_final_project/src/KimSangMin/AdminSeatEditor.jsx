import React, { useState } from 'react';

const AdminSeatEditor = () => {

    // 좌석의 id 와 이름, 선택가능한 자리인지 아닌지 설정
    const [seats, setSeats] = useState([
        { id: 1, name: 'A1', type: 'seat', reserved: false },
        { id: 2, name: 'A2', type: 'seat', reserved: false },
        { id: 4, name: 'A4', type: 'seat', reserved: false },
        { id: 3, name: '카운터', type: 'space' }, // 클릭 불가
        { id: 6, name: '창가', type: 'space' }, // 클릭 불가
        { id: 5, name: 'A5', type: 'seat', reserved: false },
        { id: 7, name: 'A7', type: 'seat', reserved: false },
        { id: 8, name: '입구', type: 'space' }, // 클릭 불가
        { id: 9, name: 'A9', type: 'seat', reserved: false },
        { id: 10, name: 'A10', type: 'seat', reserved: false },
        { id: 11, name: 'A11', type: 'seat', reserved: false },
        { id: 12, name: 'A12', type: 'seat', reserved: false },
    ]);

    // 좌석 클릭 시 예약 상태 변경
    const seatCk = (seat) => {
        // 좌석(seat) 타입이 아니면 클릭 무시
        if (seat.type !== 'seat') return;

        setSeats((prevSeats) =>
            prevSeats.map((s) =>
                s.id === seat.id
                    ? { ...s, reserved: !s.reserved } // 예약 상태 토글
                    : s
            )
        );
    };

    // 좌석 배치도 저장
    const hSave = () => {
        // 여기서 서버에 좌석 데이터를 보내거나 저장하는 기능을 구현할 수 있습니다.
        // 예시로 콘솔에 데이터를 출력합니다.
        console.log("저장된 좌석 배치도:", seats);
        alert("좌석 배치도가 저장되었습니다.");
    };

    return (
        <div>
            <h4>좌석 예약 관리</h4>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '20px',
                    maxWidth: '400px',
                    margin: '30px auto',
                }}
            >
                {seats.map((seat) => (
                    <div
                        key={seat.id}
                        onClick={() => seatCk(seat)}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '80px',
                            height: '80px',
                            backgroundColor: seat.type === 'seat' ? 'transparent' : 'gray', // 배경색 투명 처리
                            backgroundImage:
                                seat.type === 'seat'
                                    ? seat.reserved
                                        ? 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6X8ubnuKOvtvqi3ClzVwvALvlgjBXscS0hw&s)'  // 예약된 좌석 이미지
                                        : 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6X8ubnuKOvtvqi3ClzVwvALvlgjBXscS0hw&s)'  // 예약되지 않은 좌석 이미지
                                    : 'none',  // 공간 타입은 이미지 없이
                            backgroundSize: 'cover', // 이미지가 박스 크기에 맞게 조정되도록
                            color: 'white',
                            borderRadius: '5px',
                            cursor: seat.type === 'seat' ? 'pointer' : 'not-allowed',
                        }}
                    >
                        {seat.name}
                    </div>
                ))}
            </div>
            <button
                onClick={hSave}
                style={{
                    display: 'block',
                    margin: '20px auto',
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#FFD727',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                좌석 배치도 저장
            </button>
        </div>
    );
};

export default AdminSeatEditor;
