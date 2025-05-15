import {useNavigate} from "react-router-dom";

function MainCategory() {
    const Nv = useNavigate();

    const categoryList = [
        {name: '한식', eng: "한식", img: 'https://www.tabling.co.kr/images/home/normal/korean.svg'},
        {name: '중식', eng: "중식", img: 'https://www.tabling.co.kr/images/home/normal/chinese.svg'},
        {name: '양식', eng: "양식", img: 'https://www.tabling.co.kr/images/home/normal/western.svg'},
        {name: '일식', eng: "일식", img: 'https://www.tabling.co.kr/images/home/normal/japanese.svg'},
        {name: '분식', eng: "분식", img: 'https://d2ba33ltwyhxsm.cloudfront.net/common_img/comm_2531714140375417.webp'},
        {name: '카페/디저트', eng: "카페/디저트", img: 'https://www.tabling.co.kr/images/home/normal/cafe.svg'},
        {name: '퓨전', eng: "퓨전", img: 'https://d3kzx7mqemhf0.cloudfront.net/common_img/comm_24102311105777428.webp'},
        {name: '기타', eng: "기타", img: 'https://www.tabling.co.kr/images/home/normal/etc.svg'},
    ];

    return (
        <div className="row row-cols-4 g-3 mb-4 text-center">
            {categoryList.map((category, index) => (
                <div key={index} className="col" onClick={() => {
                    Nv(`/contentList/${category.eng}`)
                }}>
                    <div className="rounded p-3 d-flex flex-column align-items-center">
                        <div className={'mb-1'} style={{width: '48px', height: '48px', cursor: 'pointer'}}>
                            <img
                                style={{width: '48px', height: '48px'}}
                                src={category.img}
                                alt={category.name}
                            />
                        </div>
                        <small className="fs-7 fs-md-6" style={{fontSize: '0.65rem'}}>{category.name}</small>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MainCategory