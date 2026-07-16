"use client";

import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaArrowLeft, FaArrowRight, FaComputer } from 'react-icons/fa6';
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
    // মোবাইলের জন্য mb-10 কমিয়ে mb-4 করা হয়েছে
    <section className="mb-4 sm:mb-8 md:mb-10 w-full overflow-hidden">
      {/* মোবাইলের জন্য pb-8 কমিয়ে pb-4 করা হয়েছে */}
      <div className="container px-4 md:px-0 border-b pb-4 sm:pb-8 md:pb-12">
        {/* মোবাইলের জন্য টপ মার্জিন mt-10 কমিয়ে mt-4 করা হয়েছে */}
        <div className="mt-10 sm:mt-10 md:mt-15">
          
          {/* হেডিং এবং বাটন কন্টেইনার: mb-6 কমিয়ে মোবাইলে mb-3 করা হয়েছে */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-4 mb-3 md:mb-6">
            <SectionHeading subHeading={"Categories"} heading={"Browse By Category"} countDown={false} />
            
            {/* নেভিগেশন বাটন */}
            <div className="flex gap-2 justify-end">
              <button
                ref={(node) => setPrevEl(node)}
                className="bg-[#F5F5F5] hover:bg-[#eb6e1b] hover:text-white text-black p-2 md:p-3 rounded-full transition-all disabled:opacity-50 cursor-pointer"
              >
                <FaArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
              <button
                ref={(node) => setNextEl(node)}
                className="bg-[#F5F5F5] hover:bg-[#eb6e1b] hover:text-white text-black p-2 md:p-3 rounded-full transition-all disabled:opacity-50 cursor-pointer"
              >
                <FaArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
            </div>
          </div>

          {/* সুইপারের মার্জিন মোবাইলে mt-2 এবং mb-2 করে গ্যাপ অপ্টিমাইজ করা হয়েছে */}
          <div className="mt-2 sm:mt-6 md:mt-10 mb-2 sm:mb-6 md:mb-[51px]">
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
                  320: { slidesPerView: 2.2, spaceBetween: 12 }, 
                  480: { slidesPerView: 3, spaceBetween: 16 },
                  768: { slidesPerView: 4, spaceBetween: 24 },
                  1024: { slidesPerView: 6, spaceBetween: 32 },
                }}
                className="mySwiper !overflow-visible md:!overflow-hidden"
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