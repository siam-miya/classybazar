"use client";
import React from "react";
import { Heart, Eye, Star } from "lucide-react"; 
import Image from "next/image";

export default function ProductCard({product}) {
  const imageSrc = product?.thumbnail || null;
  if (!imageSrc) return null;
  return (
    <div className="max-w-[300px]  rounded-md overflow-hidden group font-sans bg-[#F5F5F5]">
      <div className="relative w-full h-[250px]  flex items-center justify-center p-4 rounded-t-md group overflow-hidden">
        <span className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs font-semibold px-3 py-1 rounded-sm">
          -40%
        </span>
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <button className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors cursor-pointer">
            <Heart className="w-5 h-5 text-black" strokeWidth={1.5} />
          </button>
          <button className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors cursor-pointer">
            <Eye className="w-5 h-5 text-black" strokeWidth={1.5} />
          </button>
        </div>
        <Image src={imageSrc} height={200} width={200} alt="image"/>
        <button className="flex items-center justify-center py-2 px-4 w-full text-white bg-black cursor-pointer absolute bottom-0 left-0 z-10 transition-all invisible group-hover:visible">Add To Cart</button>
      </div>
      <div className="pt-4 pb-4 flex flex-col space-y-2 pl-3">
        <h3 className="text-base font-bold text-black tracking-wide leading-tight">
         {product.title}
        </h3>
        <div className="flex items-center space-x-3">
          <span className="text-[#DB4444] text-base font-bold">${product.price}</span>
          <span className="text-gray-400 text-base font-medium line-through">$160</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-[#FFAD33]">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
          </div>
          <span className="text-gray-500 font-bold text-sm">{product.rating}</span>
        </div>
      </div>
    </div>
  );
}