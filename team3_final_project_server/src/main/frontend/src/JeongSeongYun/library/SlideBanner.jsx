import {Autoplay, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import React from "react";

import 'swiper/css';
import '../css/swiper.css'


import 'swiper/css/pagination';

function SlideBanner() {
    return (
        <Swiper
            slidesPerView={'auto'}
            centeredSlides={true} // 가운데 정렬
            spaceBetween={15} // margin-right
            loop={true} // 무한 루프
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
        >
            <SwiperSlide>
                <img alt="#" src="https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/986e4206814741629306bf1d85e6de06" />
            </SwiperSlide>
            <SwiperSlide>
                <img alt="#" src="https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/8dd22852380a4db7a46389ae60bd9024" />
            </SwiperSlide>
            <SwiperSlide>
                <img alt="#" src="https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/596072b75a1c4caf8e7f4b98879501c3" />
            </SwiperSlide>
            <SwiperSlide>
                <img alt="#" src="https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/f4207bf3910b43e2a021fb27e037c2f2" />
            </SwiperSlide>
            <SwiperSlide>
                <img alt="#" src="https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/28c83028f50449aa99d2c738f5eb3cab" />
            </SwiperSlide>
        </Swiper>
    );
}

export default SlideBanner