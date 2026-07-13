'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { FiTrash2 } from 'react-icons/fi';
import { BiSolidRightArrow } from 'react-icons/bi';
import Button from '@/components/Button';
import SubBanner from '@/components/SubBanner';
import { IoBagCheckOutline } from 'react-icons/io5';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, shippingMethod, setShippingMethod } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="text-center py-10">Loading cart...</div>;

  // প্রাইস ক্যালকুলেশন
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCharge = shippingMethod === 'inside' ? 60 : 120; // Inside = 60tk, Outside = 120tk
  const totalCost = subtotal + shippingCharge;

  return (
    <section>
      <div>
        <SubBanner title={"Cart"} pageName={"Cart"} />
      </div>
      <div className="container font-sans text-black">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center py-16">
            <p className="text-gray-500 text-4xl mb-7">Your cart is empty!</p>
            <Button TagName={Link} href={"/products"}>Return To Shop</Button>
          </div>
        ) : (
          <div>
            {/* কার্ট টেবিল */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b text-gray-600 font-medium">
                    <th className="py-4 px-4">Product</th>
                    <th className="py-4 px-4">Price</th>
                    <th className="py-4 px-4">Quantity</th>
                    <th className="py-4 px-4">Subtotal</th>
                    <th className="py-4 px-4 text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="border-b group">
                      {/* প্রোডাক্ট ইমেজ ও টাইটেল */}
                      <td className="py-6 px-4 flex items-center space-x-4 relative">
                        <div className="relative">
                          {/* ইমেজের ওপরের ক্রস বাটন */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="absolute -top-2 -left-2 bg-[#DB4444] text-white rounded-full p-0.5 z-10 cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <div className="w-14 h-14 bg-white border rounded p-1 flex items-center justify-center">
                            <Image src={item.thumbnail} alt={item.title} width={50} height={50} className="object-contain" />
                          </div>
                        </div>
                        <span className="font-medium truncate max-w-[200px]">{item.title}</span>
                      </td>

                      {/* প্রাইস */}
                      <td className="py-6 px-4">${item.price}</td>

                      {/* কাস্টম কোয়ান্টিটি কাউন্টার (১ম ও ২য় ছবির সংমিশ্রণে ডিজাইন) */}
                      <td className="py-6 px-4">
                        <div className="flex items-center border border-gray-400 rounded-md overflow-hidden w-fit h-10 select-none">
                          {/* মাইনাস (-) বাটন */}
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-4 h-full bg-white text-gray-700 hover:bg-gray-100 transition-colors font-medium border-r border-gray-400 flex items-center justify-center cursor-pointer text-lg"
                          >
                            −
                          </button>

                          {/* বর্তমান কোয়ান্টিটি সংখ্যা */}
                          <div className="w-12 text-center font-bold text-black text-base flex items-center justify-center h-full bg-white">
                            {String(item.quantity).padStart(2, '0')}
                          </div>

                          {/* প্লাস (+) বাটন */}
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-4 h-full bg-[#eb6e1b] text-white hover:bg-red-600 transition-colors font-medium flex items-center justify-center cursor-pointer text-lg"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* সাবটোটাল */}
                      <td className="py-6 px-4 font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>

                      {/* রিঅ্যাক্ট আইকন ডিলিট বাটন (একদম ডান পাশে) */}
                      <td className="py-6 px-4 text-center">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-[#DB4444] transition-colors p-2 cursor-pointer"
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

            {/* Return To Shop বাটন */}
            <div className='grid grid-cols-2 my-5'>
              <div>
                <Button TagName={Link} href={"/products"}>Return To Shop</Button>
              </div>

              {/* কার্ট টোটাল এবং শিপিং এরিয়া */}
              <div className="flex justify-end">
                <div className="w-full max-w-[450px] border-2 border-black rounded-md p-6 bg-white">
                  <h2 className="text-xl font-bold mb-4">Cart Total</h2>

                  <div className="flex justify-between border-b pb-3 mb-3 text-sm">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {/* শিপিং সিলেকশন */}
                  <div className="border-b pb-3 mb-3 text-sm">
                    <span className="block mb-2 font-medium">Shipping Location:</span>
                    <div className="space-y-2 pl-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'inside'}
                          onChange={() => setShippingMethod('inside')}
                          className="accent-[#eb6e1b]"
                        />
                        <span>Inside Dhaka (৳60)</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'outside'}
                          onChange={() => setShippingMethod('outside')}
                          className="accent-[#eb6e1b]"
                        />
                        <span>Outside Dhaka (৳120)</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-between font-bold text-base mb-6">
                    <span>Total:</span>
                    <span>${totalCost.toFixed(2)}</span>
                  </div>

                  <div className="text-center">
                    <Link href={"/checkout"}>
                      <button className="w-full flex items-center justify-center gap-2 bg-[#eb6e1b] text-white py-3 rounded-md font-medium hover:bg-black transition-colors cursor-pointer">
                      <IoBagCheckOutline size={20}/>Proceed to checkout
                      </button>
                    </Link>
                  </div>
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