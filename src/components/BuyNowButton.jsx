"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore"; 
import { toast } from "react-toastify";

const BuyNowButton = ({ product }) => {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleBuyNow = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`Fill up the form and click the 'Order Now' button to buy the ${product.title} product.`, {
      position: "top-center",
      autoClose: 7000,
    });
    router.push("/checkout"); 
  };

  return (
    <button
      onClick={handleBuyNow}
      className="w-full bg-[#eb6e1b] text-white font-poppins py-2 px-4 rounded-sm text-[16px] leading-6 font-medium hover:bg-black transition-colors cursor-pointer"
    >
      Buy Now
    </button>
  );
};

export default BuyNowButton;