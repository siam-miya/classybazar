'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import { toast } from 'react-toastify';

const CheckoutForm = () => {
  // স্টোর থেকে shippingMethod এবং এটি আপডেট করার ফাংশনটি আনা হয়েছে
  const { cart, shippingMethod, setShippingMethod } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    streetAddress: '',
    townCity: '',
    phoneNumber: '',
    saveInfo: false,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="text-center py-10 text-gray-500">Loading order form...</div>;

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCharge = shippingMethod === 'inside' ? 60 : 120;
  const totalCost = subtotal + shippingCharge;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.streetAddress || !formData.townCity || !formData.phoneNumber) {
      toast.error('Please fill in all required fields.');
      return;
    }
    
    toast.success('Order placed successfully!');
    console.log('Order Details:', { 
      customer: formData, 
      items: cart, 
      shipping: shippingMethod === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka',
      total: totalCost, 
      payment: 'Cash on delivery' 
    });
  };

  return (
    // মূল সাবমিশন হ্যান্ডলারটি এখানে ফর্ম ট্যাগের মাধ্যমেই ট্রিগার হবে
    <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-16 items-start">
      
      {/* বাম পাশ: বিলিং ইনফরমেশন ফর্ম */}
      <div className="space-y-6 w-full">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Your Full Name<span className="text-[#DB4444]">*</span></label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-[#F5F5F5] rounded p-3 focus:outline-none" required />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Your Full Address<span className="text-[#DB4444]">*</span></label>
          <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleInputChange} className="w-full bg-[#F5F5F5] rounded p-3 focus:outline-none" required />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Town/City<span className="text-[#DB4444]">*</span></label>
          <input type="text" name="townCity" value={formData.townCity} onChange={handleInputChange} className="w-full bg-[#F5F5F5] rounded p-3 focus:outline-none" required />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Your Phone Number<span className="text-[#DB4444]">*</span></label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full bg-[#F5F5F5] rounded p-3 focus:outline-none" required />
        </div>

        <label className="flex items-center space-x-3 cursor-pointer pt-2 select-none">
          <input type="checkbox" name="saveInfo" checked={formData.saveInfo} onChange={handleInputChange} className="w-5 h-5 accent-[#DB4444]" />
          <span className="text-sm font-medium">Save this information for faster check-out next time</span>
        </label>
      </div>

      {/* ডান পাশ: অর্ডার সামারি ও পেমেন্ট */}
      <div className="space-y-6 pt-6 lg:pt-0 w-full">
        
        {/* কার্ট আইটেম লিস্ট */}
        <div className="max-h-[250px] overflow-y-auto space-y-4 pr-2">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white border rounded p-1 flex items-center justify-center relative flex-shrink-0">
                  <Image src={item.thumbnail} alt={item.title} width={40} height={40} className="object-contain" />
                </div>
                <span className="text-sm font-medium truncate max-w-[200px]">{item.title} (x{item.quantity})</span>
              </div>
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          {cart.length === 0 && <p className="text-gray-400 text-sm">No items in cart.</p>}
        </div>

        {/* নতুন যুক্ত করা শিপিং এরিয়া সিলেক্টর অপশন */}
        <div className="space-y-3 bg-gray-50 p-4 rounded border border-gray-200">
          <p className="text-sm font-semibold text-gray-700">Select Shipping Area:</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
            <label className="flex items-center space-x-2 text-sm cursor-pointer select-none font-medium">
              <input 
                type="radio" 
                name="shippingOption" 
                checked={shippingMethod === 'inside'} 
                onChange={() => setShippingMethod('inside')} 
                className="w-4 h-4 accent-[#DB4444]" 
              />
              <span>Inside Dhaka (৳60)</span>
            </label>
            <label className="flex items-center space-x-2 text-sm cursor-pointer select-none font-medium">
              <input 
                type="radio" 
                name="shippingOption" 
                checked={shippingMethod === 'outside'} 
                onChange={() => setShippingMethod('outside')} 
                className="w-4 h-4 accent-[#DB4444]" 
              />
              <span>Outside Dhaka (৳120)</span>
            </label>
          </div>
        </div>

        {/* প্রাইজ ক্যালকুলেশন ব্রেকডাউন */}
        <div className="border-b pb-3 space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span>Shipping:</span>
            <span className="font-medium">৳{shippingCharge}</span>
          </div>
        </div>

        {/* টোটাল কস্ট */}
        <div className="flex justify-between font-bold text-base">
          <span>Total:</span>
          <span>${totalCost.toFixed(2)}</span>
        </div>

        {/* পেমেন্ট মেথড */}
        <div className="pt-2">
          <label className="flex items-center space-x-3 font-medium text-sm bg-gray-50 p-3 rounded border border-gray-200">
            <input type="radio" name="payment" defaultChecked className="w-5 h-5 accent-black" readOnly />
            <span>Cash on delivery</span>
          </label>
        </div>

        {/* সাবমিট বাটন */}
        <div className="pt-2">
          <button type='submit' className='bg-[#eb6e1b] text-white py-2 px-7 w-full cursor-pointer rounded-br-3xl rounded-tl-3xl hover:bg-black transition-all font-semibold'>
            Order now
          </button>
        </div>

      </div>
    </form>
  );
};

export default CheckoutForm;