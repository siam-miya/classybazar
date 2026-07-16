import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";
import { IoEyeOutline } from "react-icons/io5";
import WishListButton from "./WishListButton";

export default function ProductCard({ product }) {
  const imageSrc = product?.thumbnail || null;
  if (!imageSrc) return null;

  return (
    <div className="w-full xs:max-w-[300px] mx-auto rounded-lg overflow-hidden font-poppins bg-[#F5F5F5] hover:shadow-xl sm:hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-gray-200 will-change-transform flex flex-col justify-between h-full">
      
      <Link href={`/products/${product.id}`} className="block flex-1">
        {/* 
           - মোবাইলের জন্য হাইট বাড়িয়ে h-[180px] এবং xs এর জন্য h-[210px] করা হয়েছে।
           - মোবাইলে প্যাডিং p-1 করা হয়েছে যাতে ইমেজটি বড় জায়গা নিয়ে বসতে পারে।
        */}
        <div className="relative w-full h-[180px] xs:h-[210px] sm:h-[230px] md:h-[250px] flex items-center justify-center p-1 sm:p-2 rounded-t-md overflow-hidden bg-white/50">
          
          {/* উইশলিস্ট ও আইকন বাটন */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col space-y-1.5 sm:space-y-2 z-10">
            <WishListButton product={product} />
            <span className="bg-white p-1.5 sm:p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors cursor-pointer">
              <IoEyeOutline className="w-4 h-4 sm:w-5 sm:h-5 text-black" strokeWidth={1.5} />
            </span>
          </div>
          
          {/* 
             - ইমেজের নিজস্ব প্যাডিং মোবাইলের জন্য p-1 করা হয়েছে যেন এটি বর্ডারের কাছাকাছি চলে আসে এবং দেখতে বড় লাগে।
             - object-contain রাখা হয়েছে যাতে কোন ইমেজ স্ট্রেচড বা নষ্ট না হয়ে তার আসল রেশিও বজায় রাখে।
          */}
          <Image
            src={imageSrc}
            height={250}
            width={250}
            alt={product.title || "image"}
            className="object-contain w-full h-full p-1 sm:p-2 rounded-md transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* টেক্সট এরিয়া */}
        <div className="pt-3 pb-2 flex flex-col space-y-1 sm:space-y-1.5 px-2.5 sm:px-3">
          <h3 className="text-xs sm:text-sm md:text-base font-medium text-black tracking-wide truncate font-poppins leading-tight">
            {product.title}
          </h3>
          
          <div className="flex items-center space-x-2">
            <span className="text-[#DB4444] text-sm sm:text-base font-semibold">
              <span className="font-bold text-xs sm:text-sm font-inter text-black mr-0.5">৳</span>
              {product.price}
            </span>
          </div>
          
          {/* রেটিং */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="flex items-center text-[#FFAD33]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${
                    i < Math.round(product.rating || 0)
                      ? "fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-500 font-bold text-[10px] sm:text-xs">
              ({product.rating})
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-1.5 sm:gap-2 px-2.5 sm:px-3 pb-3 sm:pb-4">
        <AddToCartButton product={product} />
        <BuyNowButton product={product} />
      </div>

    </div>
  );
}