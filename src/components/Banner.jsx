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
        <section className="w-full">
            <div>
                <div className='w-full h-[50vh] rounded-sm overflow-hidden custom-swiper'>
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
        </section>
    )
}

export default Banner

function SliderItem({ image, brandLogo, brandTitle, discount }) {
    return (
        // ১ নম্বর ইমেজের মতো রিপিটেশন এড়াতে bg-contain বা নিখুঁত ফিটের জন্য কাস্টমাইজেশন
        <div
            style={{ backgroundImage: `url(${image.src})` }}
            className='w-full h-full bg-cover bg-center bg-no-repeat p-12 flex items-center'
        >
            <div className='space-y-4 z-10 max-w-[300px] ml-150'>
                <p className='flex items-center gap-3 text-white text-sm tracking-wide font-light'>
                    <Image src={brandLogo} height={30} width={24} alt='brandLogo' className="object-contain" />
                    {brandTitle}
                </p>
                <h1 className='text-white font-bold text-[40px] leading-[1.2] font-poppins'>
                    Up to {discount} <br /> off Voucher
                </h1>
                <Link href={"/"} className='inline-flex items-center gap-2 text-white cursor-pointer group mt-2'>
                    <span className='border-b border-white pb-0.5 group-hover:border-transparent transition-all text-sm font-medium'>
                        Shop Now
                    </span>
                    <MdOutlineKeyboardArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    )
}