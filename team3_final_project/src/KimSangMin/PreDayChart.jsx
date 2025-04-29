import {useState} from "react";


function PreDayChart() {

  const [choDay, setChoDay] = useState('');
  const [sortType, setSortType] = useState('default'); // 추가: 정렬 타입

  const stores = [
    {
      storeName: '김또깡 식당',
      day : '2025-04-27',
      check:[
        {
          reserve: [
            { times: '11:00', count: 6},
            { times: '12:00', count: 8},
            { times: '13:00', count: 9},
            { times: '14:00', count: 4},
            { times: '15:00', count: 9},
            { times: '16:00', count: 3},
            { times: '17:00', count: 11},
            { times: '18:00', count: 2},
          ]
        }
      ]
    }
  ]





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

        </div>
    );
}

export default PreDayChart

