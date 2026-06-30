"use client"
import Link from 'next/link'
import React from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import banner_1 from "../assets/images/banner.jpg"
import banner_2 from "../assets/images/banner_2.jpg"
import banner_3 from "../assets/images/banner_3.jpg"
import apple from "../assets/icons/apple.png"
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';

const Banner = () => {
    return (
        <section>
            <div className="container">
                <div className='grid grid-cols-[238px_auto]  gap-10'>
                    <div className='border-r border-r-[rgba(0,0,0,0.2)] pt-10 pr-4'>
                        <ul>
                            <ListItems text={"Woman’s Fashion"} icon />
                            <ListItems text={"Men’s Fashion"} icon />
                            <ListItems text={"Electronics"} />
                            <ListItems text={"Home & Lifestyle"} />
                            <ListItems text={"Medicine"} />
                            <ListItems text={"Sports & Outdoor"} />
                            <ListItems text={"Baby’s & Toys"} />
                            <ListItems text={"Groceries &  "} />
                            <ListItems text={"Health & Beauty"} />
                            <ListItems text={"womens fashion"} />
                            <ListItems text={"womens fashion"} />
                        </ul>
                    </div>
                    <div className='min-w-0 w-full h-[400px] rounded-lg overflow-hidden pt-10 custom-swiper'>
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={1}
                            loop={true}
                            pagination={{ clickable: true }}
                            modules={[Pagination]}
                            className="w-full h-full"
                        >
                            <SwiperSlide className="flex items-center justify-center">
                                <SliderItem
                                    image={banner_1}
                                    brandLogo={apple}
                                    brandTitle={"iphone 14 seris"}
                                    discount={"10%"} />
                            </SwiperSlide>
                            <SwiperSlide className="flex items-center justify-center">
                                <SliderItem
                                    image={banner_2}
                                    brandLogo={apple}
                                    brandTitle={"iphone x seris"}
                                    discount={"40%"} />
                            </SwiperSlide>
                            <SwiperSlide className="flex items-center justify-center">
                                <SliderItem
                                    image={banner_3}
                                    brandLogo={apple}
                                    brandTitle={"iphone 15 seris"}
                                    discount={"20%"} />
                            </SwiperSlide>

                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner

function ListItems({ icon = false, text }) {
    return <li className='grid grid-cols-[1fr_24px] gap-2 items-center  py-1'>
        <Link href={"/"} className='text-base text-black'>{text}</Link>
        {icon && <MdOutlineKeyboardArrowRight className='cursor-pointer' />
        }
    </li>
}

function SliderItem({ image, brandLogo, brandTitle, discount }) {
    return (
        <div style={{ background: `url(${image.src})` }} className='w-full h-full bg-cover bg-center bg-no-repeat p-12 flex items-center'>
            <div className='space-y-2'>
                <p className='flex items-center gap-3 text-white'>
                    <Image src={brandLogo} height={49} width={40} alt='brandLogo' />
                    {brandTitle}
                </p>
                <h1 className='text-white font-semibold text-[48px] leading-15'>Up to {discount} <br /> off Voucher</h1>
                <Link href={"/"} className='flex items-center gap-2 text-white cursor-pointer'><span className='border-b-2'>Shop Now</span> <MdOutlineKeyboardArrowRight size={23}/></Link>
            </div>
        </div>
    )
}