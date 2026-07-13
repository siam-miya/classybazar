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
    <section className="font-sans text-black pb-20">
  <SubBanner title={"Checkout"} pageName={"Checkout"}/>
      <div className='container pt-5'>
        <h1 className="text-3xl font-bold mb-10 tracking-wide">Billing Details</h1>
      <CheckoutForm />
      </div>
    </section>
  );
};

export default CheckoutPage;