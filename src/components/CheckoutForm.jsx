'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import { toast } from 'react-toastify';

const CheckoutForm = () => {
  const { cart, shippingMethod } = useCartStore();
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
    console.log('Order Details:', { customer: formData, items: cart, total: totalCost, payment: 'Cash on delivery' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-16 items-start">
      <form onSubmit={handlePlaceOrder} className="space-y-6">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Your Full Name<span className="text-[#DB4444]">*</span></label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-[#F5F5F5] rounded p-3 focus:outline-none" required />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Your Full Adress<span className="text-[#DB4444]">*</span></label>
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
      </form>

      {/* ডান পাশ: অর্ডার সামারি ও ক্যাশ অন ডেলিভারি */}
      <div className="space-y-6 pt-6 lg:pt-0">
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

        <div className="border-b pb-3 space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span>Shipping:</span>
            <span className="font-medium">৳{shippingCharge} ({shippingMethod === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
          </div>
        </div>

        <div className="flex justify-between font-bold text-base">
          <span>Total:</span>
          <span>${totalCost.toFixed(2)}</span>
        </div>
        <div className="pt-2">
          <label className="flex items-center space-x-3 font-medium text-sm bg-gray-50 p-3 rounded border border-gray-200">
            <input type="radio" name="payment" defaultChecked className="w-5 h-5 accent-black" readOnly />
            <span>Cash on delivery</span>
          </label>
        </div>
        <div className="pt-2">
          <button type='submit' className='bg-[#DB4444] text-white py-2 px-7 w-full cursor-pointer rounded-br-3xl rounded-tl-3xl hover:bg-black transition-all font-semibold' onClick={handlePlaceOrder}>
            Order now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;