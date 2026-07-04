"use client";

import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaArrowLeft, FaArrowRight, FaComputer } from 'react-icons/fa6';
import Button from './Button';
import Link from 'next/link';
import CategoryCard from './CategoryCard';
import { IoIosPhonePortrait } from 'react-icons/io';
import { BsSmartwatch } from 'react-icons/bs';
import { CiCamera, CiHeadphones } from 'react-icons/ci';
import { LuGamepad } from 'react-icons/lu';
import { AiOutlineLaptop } from 'react-icons/ai';

const Category = () => {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  const categoryData = [
    { text: "Phone", icon: IoIosPhonePortrait },
    { text: "Computer", icon: FaComputer },
    { text: "SmartWatch", icon: BsSmartwatch },
    { text: "Camera", icon: CiCamera },
    { text: "Headphone", icon: CiHeadphones },
    { text: "Gaming", icon: LuGamepad },
    { text: "Laptop", icon: AiOutlineLaptop }
  ];

  return (
    <section className='mb-10'>
      <div className="container border-b">
        <div className='mt-25 mb-15'>
          <div className="flex items-end justify-between mb-6">
            <SectionHeading subHeading={"Categories"} heading={"Browse By Category"} countDown={false} />
            <div className="flex gap-2">
              <button
                ref={(node) => setPrevEl(node)}
                className="bg-[#F5F5F5] hover:bg-gray-200 text-black p-3 rounded-full transition-all disabled:opacity-50"
              >
                <FaArrowLeft className="w-4 h-4 cursor-pointer" />
              </button>
              <button
                ref={(node) => setNextEl(node)}
                className="bg-[#F5F5F5] hover:bg-gray-200 text-black p-3 rounded-full transition-all disabled:opacity-50"
              >
                <FaArrowRight className="w-4 h-4 cursor-pointer" />
              </button>
            </div>
          </div>

          <div className='mt-10 mb-[51px]'>
            {prevEl && nextEl && (
              <Swiper
                modules={[Navigation]}
                spaceBetween={32}
                slidesPerView={6} 
                navigation={{
                  prevEl: prevEl,
                  nextEl: nextEl,
                }}
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 10 },
                  480: { slidesPerView: 2, spaceBetween: 15 },
                  640: { slidesPerView: 3, spaceBetween: 20 },
                  768: { slidesPerView: 4, spaceBetween: 24 },
                  1024: { slidesPerView: 6, spaceBetween: 32 },
                }}
                className="mySwiper"
              >
                {categoryData.map((category, index) => (
                  <SwiperSlide key={index}>
                    <CategoryCard icon={category.icon} text={category.text} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
         
        </div>
      </div>
    </section>
  );
};

export default Category;