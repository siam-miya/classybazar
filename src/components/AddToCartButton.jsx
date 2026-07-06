'use client'; 
import React from "react";
import useCartStore from "@/store/useCartStore"; 
import { toast } from "react-toastify";
const AddToCartButton = ({ product }) => {
    const addToCart = useCartStore((state) => state.addToCart);
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product); 
    toast.success(`${product.title} added to cart!`);
  };
  return (
    <button 
      onClick={handleAddToCart}
      className="flex items-center justify-center py-2 px-4 w-full text-white bg-black cursor-pointer absolute bottom-0 left-0 z-10 transition-all invisible group-hover:visible"
    >
      Add To Cart
    </button>
  )
}

export default AddToCartButton
