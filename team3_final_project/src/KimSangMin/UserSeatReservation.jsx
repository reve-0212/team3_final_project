import { useEffect, useState } from 'react';

const UserReservation = ({ storeId }) => {
    const [seats, setSeats] = useState([]);

    useEffect(() => {
        const fseat = async () => {
            const response = await fetch(`/api/getSeats?store_id=${storeId}`);
            const data = await response.json();
            setSeats(data.seats); // 서버에서 받은 좌석 데이터로 상태 업데이트
        };

        fseat();
    }, [storeId]);

    return (
        <div>
            <h4>좌석 예약 보기</h4>
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
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '80px',
                            height: '80px',
                            backgroundColor:
                                seat.type === 'seat'
                                    ? seat.reserved
                                        ? 'red'    // 예약된 좌석
                                        : 'green'  // 예약 안 된 좌석
                                    : 'gray',     // 클릭 불가 공간
                            color: 'white',
                            borderRadius: '5px',
                            cursor: seat.type === 'seat' ? 'pointer' : 'not-allowed',
                        }}
                    >
                        {seat.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserReservation;
