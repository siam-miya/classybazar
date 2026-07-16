"use client"; 

import React, { useState, useEffect } from 'react'; 
import SectionHeading from './SectionHeading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation'; 
import ProductCard from './ProductCard';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'; 
import Button from './Button';
import Link from 'next/link';

const FlashSales = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProducts(data.products); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []); 

  return (
    <section className="w-full overflow-hidden">
      {/* মোবাইলের জন্য pb-12 কমিয়ে pb-6 করা হয়েছে */}
      <div className="container mx-auto px-4 md:px-0 border-b pb-6 md:pb-16">
        {/* মোবাইলের জন্য mt-10 কমিয়ে mt-6 করা হয়েছে */}
        <div className='mt-6 md:mt-20'>
          
          {/* লেআউট কন্ট্রোল বক্স */}
          <div className="mb-4 md:mb-8">
            <SectionHeading 
              subHeading={"today's"} 
              heading={"Flash Sales"} 
              countDown={true}
              navigationButtons={
                <div className="flex items-center gap-2">
                  <button 
                    className="flash-prev w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#F5F5F5] hover:bg-[#eb6e1b] text-black hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-40"
                  >
                    <FaArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                  <button 
                    className="flash-next w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#F5F5F5] hover:bg-[#eb6e1b] text-black hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-40"
                  >
                    <FaArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                </div>
              }
            /> 
          </div>
          
          {/* Swiper Slider Section */}
          {/* মোবাইলে বটম মার্জিন mb-10 কমিয়ে mb-2 করা হয়েছে যাতে বাটনের সাথে গ্যাপ কমে যায় */}
          <div className='mt-4 md:mt-10 mb-2 sm:mb-6 md:mb-14 w-full overflow-hidden'>
            <Swiper
              modules={[Navigation]} 
              spaceBetween={16}     
              slidesPerView={4}      
              navigation={{
                prevEl: '.flash-prev',
                nextEl: '.flash-next',
              }}
              breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 12 }, 
                640: { slidesPerView: 2, spaceBetween: 16 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 30 },
              }}
              className="mySwiper !overflow-hidden"
            >
              {products.slice(0, 8).map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="pb-2"> {/* কার্ডের নিচের শ্যাডো যেন কেটে না যায় */}
                    <ProductCard product={product} />
                  </div>
                </SwiperSlide>
              ))}                        
            </Swiper>
          </div>

          {/* View All Button */}
          {/* মোবাইলে টপ মার্জিন mt-4 কমিয়ে mt-2 করা হয়েছে */}
          <div className='text-center mt-2 md:mt-8'>
            <Button TagName={Link} href={"/products"}>View All Products</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSales;