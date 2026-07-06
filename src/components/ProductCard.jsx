import React from "react";
import { Heart, Star } from "lucide-react"; 
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton"; // বাটনটি ইমপোর্ট করলাম

export default function ProductCard({ product }) {
  const imageSrc = product?.thumbnail || null;
  if (!imageSrc) return null;

  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="w-full max-w-[300px] rounded-md overflow-hidden group font-sans bg-[#F5F5F5]">
        <div className="relative w-full h-[250px] flex items-center justify-center p-4 rounded-t-md group overflow-hidden">
          <div className="absolute top-3 right-3 flex flex-col space-y-2">
            <span className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors cursor-pointer">
              <Heart className="w-5 h-5 text-black" strokeWidth={1.5} />
            </span>
          </div>
          <Image src={imageSrc} height={200} width={200} alt={product.title || "image"} className="object-contain" />
          <AddToCartButton product={product} />  
        </div>
        <div className="pt-4 pb-4 flex flex-col space-y-2 pl-3">
          <h3 className="text-base font-bold text-black tracking-wide leading-tight truncate pr-2">
            {product.title}
          </h3>
          <div className="flex items-center space-x-3">
            <span className="text-[#DB4444] text-base font-bold">${product.price}</span>
            {product.discountPercentage && (
              <span className="text-gray-400 text-base font-medium line-through">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-[#FFAD33]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating || 0) ? 'fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-gray-500 font-bold text-sm">{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}