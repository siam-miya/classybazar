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
    <section>
      <div className="container border-b">
        <div className='mt-25 mb-15'>
          <div className="flex items-end justify-between mb-6">
            <SectionHeading subHeading={"today's"} heading={"Flash Sales"} countDown={true}/> 
            <div className="flex gap-2">
              <button 
                className="flash-prev bg-[#F5F5F5] hover:bg-gray-200 text-black p-3 rounded-full transition-all disabled:opacity-50"
              >
                <FaArrowLeft className="w-4 h-4" />
              </button>
              <button 
                className="flash-next bg-[#F5F5F5] hover:bg-gray-200 text-black p-3 rounded-full transition-all disabled:opacity-50"
              >
                <FaArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className='mt-10 mb-[51px]'>
            <Swiper
              modules={[Navigation]} 
              spaceBetween={32}      
              slidesPerView={4}      
              navigation={{
                prevEl: '.flash-prev',
                nextEl: '.flash-next',
              }}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 30 },
                1024: { slidesPerView: 4, spaceBetween: 32 },
              }}
              className="mySwiper"
            >
              {products.slice(0,8).map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}                         
            </Swiper>
          </div>
          <div className='text-center'>
            <Button TagName={Link} href={"/products"}>View All Products</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSales;