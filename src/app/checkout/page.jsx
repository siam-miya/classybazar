import React from 'react';
import Link from 'next/link';
import { BiSolidRightArrow } from 'react-icons/bi';
import CheckoutForm from '@/components/CheckoutForm'; 
import SubBanner from '@/components/SubBanner';
export const metadata = {
  title: 'Checkout | Exclusive E-commerce',
  description: 'Provide your billing details and complete your purchase securely.',
};

const CheckoutPage = () => {
  return (
    <section className="container font-sans text-black pb-20">
      {/* <div className="flex items-center gap-2 pt-8 text-sm mb-12">
        <Link href="/" className="text-gray-600 hover:text-black transition-all font-medium">
          Home
        </Link>
        <BiSolidRightArrow className="text-[10px] text-gray-400" />
        <Link href="/products" className="text-gray-600 hover:text-black transition-all font-medium">
          Products
        </Link>
        <BiSolidRightArrow className="text-[10px] text-gray-400" />
        <Link href="/cart" className="text-gray-600 hover:text-black transition-all font-medium">
          Cart
        </Link>
        <BiSolidRightArrow className="text-[10px] text-gray-400" />
        <p className="text-blue-500 font-semibold">Checkout</p>
      </div> */}
  <SubBanner title={"Checkout"} pageName={"Checkout"}/>
      <h1 className="text-3xl font-bold mb-10 tracking-wide">Billing Details</h1>
      <CheckoutForm />
    </section>
  );
};

export default CheckoutPage;