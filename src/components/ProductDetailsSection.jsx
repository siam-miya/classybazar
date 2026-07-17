'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiMinusSmall } from 'react-icons/hi2';
import { GoPlus } from 'react-icons/go';
import { useCartStore } from '@/store/useCartStore'; 
import { useWishlistStore } from '@/store/useWishlistStore'; 
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import AddToCartButton from './AddToCartButton'; 

const ProductDetailsSection = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isMounted, setIsMounted] = useState(false); 

  const addToCart = useCartStore((state) => state.addToCart); 
  const wishlist = useWishlistStore((state) => state.wishlist);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const isProductInWishlist = wishlist.some((item) => item.id === product?.id);
  
  useEffect(() => { 
    setIsMounted(true); 
  }, []);

  const productImages = product?.images?.length ? product.images : [product?.thumbnail];
  
  const handleBuyNow = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) { 
        addToCart(product); 
      }
    }
  };

  return (
    <div className="pt-8 pb-16 px-4 md:px-8 lg:px-16 text-black select-none font-poppins">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-3 justify-center md:justify-start">
            {productImages.slice(0, 4).map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 md:w-24 md:h-24 bg-[#F5F5F5] p-2 rounded border-2 transition-all ${
                  selectedImage === index ? 'border-[#eb6e1b]' : 'border-transparent hover:border-gray-200 cursor-pointer'
                }`}
              >
                <Image src={img} alt="thumb" width={80} height={80} className="object-contain" />
              </button>
            ))}
          </div>
          <div className="flex-1 bg-[#F5F5F5] rounded-md flex items-center justify-center p-4">
            <div className="relative w-full h-[300px] md:h-[450px]">
              <Image 
                src={productImages[selectedImage] || product?.thumbnail} 
                alt={product?.title || "Product Image"} 
                fill 
                className="object-contain" 
                priority 
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 flex flex-col justify-start gap-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">{product?.title}</h1>
            <span className={`${product?.stock > 0 ? 'text-[#00FF66]' : 'text-red-500'} font-medium text-sm`}>
               {product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div className="text-2xl font-bold flex items-center gap-1">
            <FaBangladeshiTakaSign />{product?.price}
          </div>
          
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-2 md:gap-4 h-12">
                <div className="flex items-center border border-gray-300 rounded overflow-hidden h-full bg-white">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                    className="px-4 hover:bg-gray-100 h-full border-r border-gray-300 cursor-pointer"
                  >
                    <HiMinusSmall />
                  </button>
                  <div className="w-12 text-center font-medium">{String(quantity).padStart(2, '0')}</div>
                  <button 
                    onClick={() => setQuantity(quantity + 1)} 
                    className="px-4 bg-[#eb6e1b] text-white h-full cursor-pointer"
                  >
                    <GoPlus />
                  </button>
                </div>
                
                <Link 
                  href="/checkout" 
                  onClick={handleBuyNow} 
                  className="flex-1 bg-[#eb6e1b] hover:bg-black text-white font-medium h-full rounded flex items-center justify-center transition-all"
                >
                  Buy Now
                </Link>
                
                <button 
                  onClick={() => product && toggleWishlist(product)} 
                  className="w-12 h-full border border-gray-300 rounded flex items-center justify-center hover:border-black transition-all"
                >
                  <svg className={`w-6 h-6 ${isMounted && isProductInWishlist ? 'fill-red-500 text-red-500' : 'text-black'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
             </div>

             <div className="w-full">
                <AddToCartButton product={product} />
             </div>
          </div>

          {/* Delivery Info Box */}
          <div className="border border-gray-200 rounded divide-y divide-gray-200 mt-2">
            <div className="flex items-center gap-4 p-4">
              <div className="text-xl">🚚</div>
              <div className="text-sm">
                <h4 className="font-semibold">Free Delivery</h4>
                <Link href="/" className="underline text-gray-500 hover:text-black">Enter postal code</Link>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="text-xl">🔄</div>
              <div className="text-sm">
                <h4 className="font-semibold">Return Delivery</h4>
                <p className="text-gray-500">Free 30 Days Returns. <Link href="/" className="underline text-black">Details</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 border-t pt-8">
        <h2 className="text-lg font-semibold mb-4">Product Description</h2>
        <p className="text-gray-600 leading-relaxed text-sm max-w-4xl">{product?.description}</p>
      </div>
    </div>
  );
};

export default ProductDetailsSection;