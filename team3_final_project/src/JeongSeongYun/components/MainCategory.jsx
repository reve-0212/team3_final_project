import React from "react";

function MainCategory() {

    const categories = ['한식', '중식', '양식', '일식', '분식', '카페/디저트', '퓨전', '기타'];

    return (
        <div className="row row-cols-4 g-3 mb-4 text-center">
            {categories.map((category, index) => (
                <div key={index} className="col">
                    <div className="rounded p-3 d-flex flex-column align-items-center">
                        <div className="bg-secondary rounded mb-2" style={{ width: '48px', height: '48px' }}></div>
                        <small className="fs-7 fs-md-6" style={{ fontSize: '0.65rem' }}>{category}</small>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MainCategory