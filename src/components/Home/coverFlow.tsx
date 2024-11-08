import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

export default function App() {
  return (
    <>
     <h2 className="bg-clip-text text-white text-center bg-gradient-to-b from-blue-400 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
     ‘Top Things to Do’ 
        </h2>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
    
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      > 
       
        <SwiperSlide>
          <img src="https://i.ibb.co.com/tDzJkxR/samantha-gades-f-IHoz-NWfcvs-unsplash.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/yBBTZ56/susan-g-komen-3-day-qf-WMUXDc-N18-unsplash.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/W6g3YWH/borna-bevanda-a4-LLb-MYUj-E4-unsplash.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/MfZXmv4/yvette-de-wit-NYr-Visod-Q2-M-unsplash.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/YL60B5V/jade-masri-74tl-EYKgr-BE-unsplash.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/XjN8FXB/aranxa-esteve-p-OXHU0-UEDcg-unsplash.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/NKsFtFr/marvin-meyer-IB5bld-weak-unsplash.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/RBTV2sW/dave-lastovskiy-Ryg-Id-Tavhk-Q-unsplash.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/TMF2FSw/aranxa-esteve-S5-DEUg2y-UVU-unsplash.jpg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
