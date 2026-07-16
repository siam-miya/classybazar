'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { FiTrash2 } from 'react-icons/fi';
import Button from '@/components/Button';
import SubBanner from '@/components/SubBanner';
import { IoBagCheckOutline } from 'react-icons/io5';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, shippingMethod, setShippingMethod } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="text-center py-10 font-sans">Loading cart...</div>;

  // প্রাইস ক্যালকুলেশন
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCharge = shippingMethod === 'inside' ? 60 : 120; // Inside = 60tk, Outside = 120tk
  const totalCost = subtotal + shippingCharge;

  return (
    <section className="w-full bg-gray-50/30 pb-12">
      <div>
        <SubBanner title={"Cart"} pageName={"Cart"} />
      </div>
      
      <div className="container pt-3 md:pt-5 px-4 md:px-6 font-sans text-black mt-6 md:mt-10">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center bg-white rounded-md border p-6 shadow-sm">
            <p className="text-gray-500 text-2xl md:text-4xl mb-6 font-medium">Your cart is empty!</p>
            <Button TagName={Link} href={"/products"}>Return To Shop</Button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            
            {/* ১. ডেস্কটপ ও ট্যাবলেট টেবিল ভিউ (স্মল স্ক্রিনে হাইড থাকবে, md স্ক্রিন থেকে শো করবে) */}
            <div className="hidden md:block bg-white rounded-md border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b bg-gray-50 text-gray-600 font-medium text-sm">
                      <th className="py-4 px-4">Product</th>
                      <th className="py-4 px-4">Price</th>
                      <th className="py-4 px-4">Quantity</th>
                      <th className="py-4 px-4">Subtotal</th>
                      <th className="py-4 px-4 text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {cart.map((item) => (
                      <tr key={item.id} className="border-b group hover:bg-gray-50/30 transition-colors">
                        {/* প্রোডাক্ট ইমেজ ও টাইটেল */}
                        <td className="py-5 px-4 flex items-center space-x-4 relative">
                          <div className="relative shrink-0">
                            {/* ইমেজের ওপরের ক্রস বাটন */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="absolute -top-2 -left-2 bg-[#DB4444] text-white rounded-full p-0.5 z-10 cursor-pointer shadow hover:scale-105 transition-transform"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <div className="w-14 h-14 bg-white border rounded-md p-1 flex items-center justify-center">
                              <Image src={item.thumbnail} alt={item.title} width={50} height={50} className="object-contain rounded-sm" />
                            </div>
                          </div>
                          <span className="font-medium text-gray-800 truncate max-w-[180px] lg:max-w-[240px]">{item.title}</span>
                        </td>

                        {/* প্রাইস */}
                        <td className="py-5 px-4 text-gray-700">${item.price.toFixed(2)}</td>

                        {/* কোয়ান্টিটি কাউন্টার */}
                        <td className="py-5 px-4">
                          <div className="flex items-center border border-gray-400 rounded-md overflow-hidden w-fit h-10 select-none bg-white">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-4 h-full bg-white text-gray-700 hover:bg-gray-100 transition-colors font-medium border-r border-gray-400 flex items-center justify-center cursor-pointer text-lg"
                            >
                              −
                            </button>
                            <div className="w-12 text-center font-bold text-black text-base flex items-center justify-center h-full bg-white">
                              {String(item.quantity).padStart(2, '0')}
                            </div>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-4 h-full bg-[#eb6e1b] text-white hover:bg-orange-600 transition-colors font-medium flex items-center justify-center cursor-pointer text-lg"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* সাবটোটাল */}
                        <td className="py-5 px-4 font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>

                        {/* রিঅ্যাক্ট আইকন ডিলিট বাটন */}
                        <td className="py-5 px-4 text-center">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-[#DB4444] transition-colors p-2 cursor-pointer inline-flex items-center justify-center"
                            title="Remove Item"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ২. মোবাইল রেসপন্সিভ কার্ড ভিউ (শুধুমাত্র ছোট স্ক্রিনে বা md এর নিচে দেখাবে) */}
            <div className="block md:hidden space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-md border border-gray-200 shadow-sm flex gap-4 relative">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-[#DB4444] p-1 cursor-pointer"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                  
                  {/* ছোট ইমেজের বর্ডার রাউন্ডেড কম রাখা হয়েছে */}
                  <div className="w-20 h-20 bg-gray-50 border border-gray-200 rounded-md p-1 flex items-center justify-center shrink-0">
                    <Image src={item.thumbnail} alt={item.title} width={70} height={70} className="object-contain rounded-sm" />
                  </div>

                  <div className="flex flex-col justify-between flex-1 pr-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{item.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Price: ${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* মোবাইল কাউন্টার */}
                      <div className="flex items-center border border-gray-400 rounded-md overflow-hidden h-8 select-none bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 h-full text-gray-600 hover:bg-gray-100 border-r border-gray-400 flex items-center justify-center cursor-pointer text-sm"
                        >
                          −
                        </button>
                        <div className="w-8 text-center font-medium text-gray-800 text-xs flex items-center justify-center h-full">
                          {String(item.quantity).padStart(2, '0')}
                        </div>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 h-full bg-[#eb6e1b] text-white hover:bg-orange-600 flex items-center justify-center cursor-pointer text-sm"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* মোবাইল সাবটোটাল */}
                      <span className="font-bold text-gray-900 text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ৩. বাটন ও কার্ট টোটাল এরিয়া (মোবাইল ও ট্যাবলেটে নিচে নিচে আসবে, ডেস্কটপে গ্রিড থাকবে) */}
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-start mt-2">
              {/* Return Shop বাটন */}
              <div className="w-full lg:w-auto order-2 lg:order-1">
                <Button TagName={Link} href={"/products"} className="w-full sm:w-auto text-center justify-center">
                  Return To Shop
                </Button>
              </div>

              {/* কার্ট টোটাল বক্স (ডেস্কটপ এবং রেসপন্সিভ উভয় দিকে সামঞ্জস্যপূর্ণ) */}
              <div className="w-full lg:max-w-[450px] order-1 lg:order-2 border-2 border-black rounded-md p-5 md:p-6 bg-white shadow-sm">
                <h2 className="text-lg md:text-xl font-bold mb-4">Cart Total</h2>

                <div className="flex justify-between border-b pb-3 mb-3 text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>

                {/* শিপিং সিলেকশন */}
                <div className="border-b pb-3 mb-4 text-sm">
                  <span className="block mb-2 font-medium text-gray-700">Shipping Location:</span>
                  <div className="space-y-2.5 pl-1">
                    <label className="flex items-center space-x-3 cursor-pointer group text-gray-600">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'inside'}
                        onChange={() => setShippingMethod('inside')}
                        className="accent-[#eb6e1b] w-4 h-4"
                      />
                      <span className="group-hover:text-black transition-colors">Inside Dhaka (৳60)</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group text-gray-600">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'outside'}
                        onChange={() => setShippingMethod('outside')}
                        className="accent-[#eb6e1b] w-4 h-4"
                      />
                      <span className="group-hover:text-black transition-colors">Outside Dhaka (৳120)</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-base md:text-lg mb-6">
                  <span>Total:</span>
                  <span className="text-[#eb6e1b]">${totalCost.toFixed(2)}</span>
                </div>

                <div>
                  <Link href={"/checkout"} className="block w-full">
                    <button className="w-full flex items-center justify-center gap-2 bg-[#eb6e1b] text-white py-3 rounded-md font-medium hover:bg-black transition-colors duration-300 cursor-pointer shadow-sm">
                      <IoBagCheckOutline size={19}/>
                      <span>Proceed to checkout</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;