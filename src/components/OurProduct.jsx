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
            <SectionHeading subHeading={"Our Products"} heading={"Explore Our Products"} countDown={false}/>          
            </div> 
          <div className='mt-10 mb-13 grid grid-cols-4 gap-8'>
              {products.slice(8,16).map((product) => (            
                  <ProductCard key={product.id} product={product} />                
              ))}                                
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