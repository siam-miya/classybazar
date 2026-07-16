"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import ProductCard from "./ProductCard";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import "swiper/css";
import "swiper/css/navigation";

export default function RelatedProductsSlider({ relatedProducts }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <div className="w-full relative pt-4">
      <div className="absolute top-[-58px] right-0 flex items-center gap-2 z-30">
        <button
          ref={prevRef}
          className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#F5F5F5] hover:bg-gray-200 text-black flex items-center justify-center transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
        >
          <IoChevronBack className="w-5 h-5" />
        </button>
        <button
          ref={nextRef}
          className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#F5F5F5] hover:bg-gray-200 text-black flex items-center justify-center transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
        >
          <IoChevronForward className="w-5 h-5" />
        </button>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSwiper={setSwiperInstance}
        navigation={{
          prevEl: null, // ref দিয়ে onBeforeInit-এ সেট হচ্ছে
          nextEl: null,
        }}
        observer={true}
        observeParents={true}
        watchOverflow={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          450: { slidesPerView: 1.5, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 2.5, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
          1280: { slidesPerView: 4, spaceBetween: 24 },
        }}
        className="mySwiper !overflow-visible"
      >
        {relatedProducts.map((product) => (
          <SwiperSlide key={product.id} className="!h-auto">
            <div className="pb-4">
              <ProductCard product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}