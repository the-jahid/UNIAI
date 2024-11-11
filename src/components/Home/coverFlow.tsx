'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Event {
  id: string;
  name: string;
  dates: {
    start: {
      localDate: string;
    };
  };
  images: Array<{
    url: string;
    width: number;
    height: number;
  }>;
  _embedded: {
    venues: Array<{
      name: string;
      city: {
        name: string;
      };
      country: {
        name: string;
      };
      location: {
        latitude: string;
        longitude: string;
      };
    }>;
  };
}

interface CoverFlowProps {
  vevents: Event[];
}

export default function CoverFlow({ vevents }: CoverFlowProps) {
  return (
    <div className="w-full  py-12 px-4 sm:px-6 lg:px-8">
      
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
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="mySwiper"
      >
        {vevents.map((event) => (
          <SwiperSlide key={event.id} className="w-80 sm:w-96">
            <motion.div
              className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105"
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48 sm:h-56">
                <Image
                  src={event.images[0].url}
                  layout="fill"
                  objectFit="cover"
                  alt={event.name}
                  className="rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-xl sm:text-2xl font-bold text-center px-4">
                    {event.name}
                  </h3>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <p className="text-gray-600 text-sm sm:text-base mb-2">
                  <span className="font-semibold">Date:</span> {event.dates.start.localDate}
                </p>
                <p className="text-gray-600 text-sm sm:text-base mb-2">
                  <span className="font-semibold">Venue:</span> {event._embedded.venues[0].name}
                </p>
                <p className="text-gray-600 text-sm sm:text-base mb-2">
                  <span className="font-semibold">Location:</span> {event._embedded.venues[0].city.name}, {event._embedded.venues[0].country.name}
                </p>
               
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper-container {
          width: 100%;
          padding-top: 50px;
          padding-bottom: 50px;
        }
        .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 300px;
          height: 400px;
        }
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.7;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #8B5CF6;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
        }
        @media (max-width: 640px) {
          .swiper-slide {
            width: 250px;
            height: 350px;
          }
        }
      `}</style>
    </div>
  );
}