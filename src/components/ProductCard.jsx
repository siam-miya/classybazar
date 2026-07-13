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
    <div className="w-full max-w-[300px] rounded-md overflow-hidden font-sans bg-[#F5F5F5] hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] transition-all duration-300 border border-transparent hover:border-gray-200">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative w-full h-[250px] flex items-center justify-center p-1 rounded-t-md overflow-hidden">
          <div className="absolute top-3 right-3 flex flex-col space-y-2 z-10">
            <WishListButton product={product} />
            <span className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors cursor-pointer">
              <IoEyeOutline className="w-5 h-5 text-black" strokeWidth={1.5} />
            </span>
          </div>
          <Image
            src={imageSrc}
            height={250}
            width={250}
            alt={product.title || "image"}
            className="object-contain w-full h-full rounded-md"
          />
        </div>
        <div className="pt-4 pb-2 flex flex-col space-y-2 pl-3 pr-3">
          <h3 className="text-base font-medium text-black tracking-wide leading-tight truncate pr-2 font-poppins leading-6">
            {product.title}
          </h3>
          <div className="flex items-center space-x-3">
            <span className="text-[#DB4444] text-base font-medium text-[16px] leading-6">
              <span className="font-bold text-md font-inter text-black">৳</span>{product.price}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-[#FFAD33]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(product.rating || 0)
                      ? "fill-current"
                      : "text-gray-300"
                    }`}
                />
              ))}
            </div>
            <span className="text-gray-500 font-bold text-sm">
              {product.rating}
            </span>
          </div>
        </div>
      </Link>
      <div className="flex flex-col gap-2 px-3 pb-4">
        <AddToCartButton product={product} />
        <BuyNowButton product={product} />
      </div>
    </div>
  );
}