'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiMinusSmall } from 'react-icons/hi2';
import { GoPlus } from 'react-icons/go';

const ProductDetailsSection = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const productImages = product?.images?.length ? product.images : [product?.thumbnail];

  return (
    <div className="pt-10 pb-20 font-sans text-black select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-4 justify-between md:justify-start">
            {productImages.slice(0, 4).map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-24 h-24 bg-[#F5F5F5] p-2 rounded flex items-center justify-center border-2 transition-all relative overflow-hidden ${
                  selectedImage === index ? 'border-[#DB4444]' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <Image 
                  src={img} 
                  alt={`${product?.title} Thumbnail ${index + 1}`} 
                  fill
                  sizes="96px"
                  className="object-contain p-2" 
                />
              </button>
            ))}
          </div>
          <div className="flex-1 bg-[#F5F5F5] rounded-md flex items-center justify-center p-4 min-h-[400px] md:min-h-[500px] relative">
            <div className="w-full h-[400px] md:h-[480px] relative">
              <Image
                src={productImages[selectedImage] || product?.thumbnail}
                alt={product?.title || "Product Image"}
                fill
                priority
                sizes="(max-w-768px) 100vw, 50vw"
                className="object-contain transition-all duration-300"
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 flex flex-col justify-center">
          <h1 className="text-2xl font-semibold tracking-wide mb-2">{product?.title}</h1>
          <div className="flex items-center gap-3 mb-4 text-sm">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.round(product?.rating || 0) ? 'fill-current' : 'text-gray-300 fill-current'}`} 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
            </div>
            <span className="text-gray-500">({product?.rating} Rating)</span>
            <span className="text-gray-300">|</span>
            <span className={`${product?.stock > 0 ? 'text-[#00FF66]' : 'text-red-500'} font-medium`}>
              {product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          <div className="text-2xl font-semibold tracking-wider mb-4">${product?.price}</div>
          <p className="text-sm text-gray-700 leading-relaxed mb-6 border-b border-gray-300 pb-6">
            {product?.description}
          </p>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-gray-400 rounded overflow-hidden h-11">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 hover:bg-gray-100 h-full border-r border-gray-400 flex items-center justify-center text-xl transition-colors"
              >
               <HiMinusSmall />
              </button>
              <div className="w-14 text-center font-medium text-lg">{quantity}</div>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 bg-[#DB4444] text-white h-full flex items-center justify-center text-xl hover:bg-red-600 transition-colors"
              >
                <GoPlus />
              </button>
            </div>
            <button className="flex-1 bg-[#DB4444] hover:bg-red-600 text-white font-medium h-11 rounded transition-colors active:scale-[0.99]">
              Buy Now
            </button>
            <button 
              onClick={() => setIsWishlist(!isWishlist)}
              className="w-11 h-11 border border-gray-400 rounded flex items-center justify-center hover:border-black transition-colors active:scale-95"
            >
              <svg 
                className={`w-6 h-6 transition-colors ${isWishlist ? 'fill-red-500 text-red-500' : 'text-black'}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          <div className="border border-gray-400 rounded">
            <div className="flex items-center gap-4 p-4 border-b border-gray-400">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <div>
                <h4 className="font-medium text-base mb-1">Free Delivery</h4>
                <Link href="#" className="text-xs text-black font-medium underline block">
                  Enter your postal code for Delivery Availability
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.213 6H16" />
              </svg>
              <div>
                <h4 className="font-medium text-base mb-1">Return Delivery</h4>
                <p className="text-xs text-gray-800 font-medium">
                  Free 30 Days Delivery Returns. <Link href="#" className="underline text-black">Details</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSection;