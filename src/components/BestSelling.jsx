"use client"
import React, { useEffect, useState } from 'react'
import SectionHeading from './SectionHeading'
import Button from './Button'
import { SwiperSlide } from 'swiper/react';
import ProductCard from './ProductCard';
import Link from 'next/link';

const BestSelling = () => {
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
    console.log(products)
  return (
    <section>
        <div className="container">
          <div className='flex items-end justify-between'>
            <div>
                  <SectionHeading subHeading={"This Month"} heading={"Best Selling Products"} countDown={false}/>
            </div>
            <div>
                <Button TagName={Link} href={"/products"}>View All</Button>
            </div>
          </div>
          <div className='grid grid-cols-4 gap-8 mt-10 mb-10'>
            {products.slice(7,11).map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))} 
          </div>
        </div>
    </section>
  )
}

export default BestSelling
