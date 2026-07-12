"use client";

import React from "react";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "react-toastify";
import { FiShoppingCart } from "react-icons/fi";

const AddToCartButton = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);

  const handleAddToCart = (e) => {
    e.preventDefault();
    const isAlreadyInCart = cart.some((item) => item.id === product.id);

    if (isAlreadyInCart) {
      toast.info(`"${product.title}" is already added to your cart!`, {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    addToCart(product);
    toast.success(`${product.title} added to cart!`, {
      position: "top-center",
      autoClose: 1500,
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="group/cart relative flex items-center justify-center py-2 px-4 w-full text-white bg-black hover:bg-gray-800 cursor-pointer transition-all duration-300 rounded-sm text-[16px] font-medium font-poppins h-9 overflow-hidden leading-6"
    >
      <span className="inline-block transition-all duration-300 transform group-hover/cart:-translate-y-10 group-hover/cart:opacity-0">
        Add To Cart
      </span>

      <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 transform translate-y-10 opacity-0 group-hover/cart:translate-y-0 group-hover/cart:opacity-100">
        <FiShoppingCart className=" text-white" size={22} />
      </span>
    </button>
  );
};

export default AddToCartButton;