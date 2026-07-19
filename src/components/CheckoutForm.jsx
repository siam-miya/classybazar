'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { GiShoppingBag } from 'react-icons/gi';
import { Spinner } from '@heroui/react';

const CheckoutForm = () => {
  const { cart, shippingMethod, setShippingMethod } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    streetAddress: '',
    phoneNumber: '',
    saveInfo: false,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="flex flex-col items-center gap-2">
    <Spinner color="danger" />
    <span className="text-xs text-muted">loading...</span>
  </div>;

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
    if (!formData.fullName || !formData.streetAddress || !formData.phoneNumber) {
      toast.error('Please fill in all required fields.');
      return;
    }
    toast.success('Order placed successfully!');
  };

  return (
    <form onSubmit={handlePlaceOrder} className="flex flex-col lg:grid lg:grid-cols-[1fr_450px] gap-8 lg:gap-16 items-start">
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
          <label className="block text-gray-400 text-sm mb-2">Your Phone Number<span className="text-[#DB4444]">*</span></label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full bg-[#F5F5F5] rounded p-3 focus:outline-none" required />
        </div>
        <label className="flex items-center space-x-3 cursor-pointer select-none">
          <input type="checkbox" name="saveInfo" checked={formData.saveInfo} onChange={handleInputChange} className="w-5 h-5 accent-[#DB4444]" />
          <span className="text-sm font-medium">Save this information for faster check-out</span>
        </label>
      </div>

      <div className="space-y-6 w-full">
        <div className="h-auto w-full space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 bg-white border rounded p-1 flex items-center justify-center flex-shrink-0">
                  <Image src={item.thumbnail} alt={item.title} width={40} height={40} className="object-contain w-full h-full" />
                </div>
                <span className="text-sm font-medium truncate">{item.title} (x{item.quantity})</span>
              </div>
              <span className="font-medium flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="space-y-3 bg-gray-50 p-4 rounded border border-gray-200">
          <p className="text-sm font-semibold text-gray-700">Select Shipping Area:</p>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="shipping" checked={shippingMethod === 'inside'} onChange={() => setShippingMethod('inside')} className="accent-[#DB4444]" />
              <span>Inside Dhaka (৳60)</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="shipping" checked={shippingMethod === 'outside'} onChange={() => setShippingMethod('outside')} className="accent-[#DB4444]" />
              <span>Outside Dhaka (৳120)</span>
            </label>
          </div>
        </div>
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
        <div className="flex justify-between font-bold text-base">
          <span>Total:</span>
          <span>${totalCost.toFixed(2)}</span>
        </div>
        <button
          type='submit'
          className='bg-[#eb6e1b] text-white py-3 w-full rounded-br-3xl rounded-tl-3xl hover:bg-black transition-all font-semibold cursor-pointer flex items-center justify-center gap-2'
        >
          <GiShoppingBag className="text-xl" />
          <span>Order now</span>
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;



// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useCartStore } from '@/store/useCartStore';
// import Image from 'next/image';
// import { toast } from 'react-toastify';
// import { IoBagCheckOutline } from 'react-icons/io5';
// import { PiShoppingBagOpenThin } from 'react-icons/pi';
// import { GiShoppingBag } from 'react-icons/gi';

// const CheckoutForm = () => {
//   const { cart, shippingMethod, setShippingMethod } = useCartStore();
//   const [isMounted, setIsMounted] = useState(false);

//   const [formData, setFormData] = useState({
//     fullName: '',
//     streetAddress: '',
//     townCity: '',
//     phoneNumber: '',
//     saveInfo: false,
//   });

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (!isMounted) return <div className="text-center py-10 text-gray-500">Loading order form...</div>;

//   const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   const shippingCharge = shippingMethod === 'inside' ? 60 : 120;
//   const totalCost = subtotal + shippingCharge;

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handlePlaceOrder = (e) => {
//     e.preventDefault();
//     if (!formData.fullName || !formData.streetAddress || !formData.townCity || !formData.phoneNumber) {
//       toast.error('Please fill in all required fields.');
//       return;
//     }
//     toast.success('Order placed successfully!');
//   };

//   return (
//     <form onSubmit={handlePlaceOrder} className="flex flex-col lg:grid lg:grid-cols-[1fr_450px] gap-8 lg:gap-16 items-start">
//       <div className="space-y-6 w-full">
//         <div>
//           <label className="block text-gray-400 text-sm mb-2">Your Full Name<span className="text-[#DB4444]">*</span></label>
//           <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-[#F5F5F5] rounded p-3 focus:outline-none" required />
//         </div>
//         <div>
//           <label className="block text-gray-400 text-sm mb-2">Your Full Address<span className="text-[#DB4444]">*</span></label>
//           <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleInputChange} className="w-full bg-[#F5F5F5] rounded p-3 focus:outline-none" required />
//         </div>
//         <div>
//           <label className="block text-gray-400 text-sm mb-2">Town/City<span className="text-[#DB4444]">*</span></label>
//           <input type="text" name="townCity" value={formData.townCity} onChange={handleInputChange} className="w-full bg-[#F5F5F5] rounded p-3 focus:outline-none" required />
//         </div>
//         <div>
//           <label className="block text-gray-400 text-sm mb-2">Your Phone Number<span className="text-[#DB4444]">*</span></label>
//           <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full bg-[#F5F5F5] rounded p-3 focus:outline-none" required />
//         </div>
//         <label className="flex items-center space-x-3 cursor-pointer select-none">
//           <input type="checkbox" name="saveInfo" checked={formData.saveInfo} onChange={handleInputChange} className="w-5 h-5 accent-[#DB4444]" />
//           <span className="text-sm font-medium">Save this information for faster check-out</span>
//         </label>
//       </div>

//       <div className="space-y-6 w-full">
//         <div className="max-h-[250px] overflow-y-auto space-y-4 pr-2">
//           {cart.map((item) => (
//             <div key={item.id} className="flex items-center justify-between gap-4">
//               <div className="flex items-center gap-4 min-w-0">
//                 <div className="w-12 h-12 bg-white border rounded p-1 flex items-center justify-center flex-shrink-0">
//                   <Image src={item.thumbnail} alt={item.title} width={40} height={40} className="object-contain w-full h-full" />
//                 </div>
//                 <span className="text-sm font-medium truncate">{item.title} (x{item.quantity})</span>
//               </div>
//               <span className="font-medium flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
//             </div>
//           ))}
//         </div>
//         <div className="space-y-3 bg-gray-50 p-4 rounded border border-gray-200">
//           <p className="text-sm font-semibold text-gray-700">Select Shipping Area:</p>
//           <div className="flex flex-col gap-2">
//             <label className="flex items-center gap-2 text-sm cursor-pointer">
//               <input type="radio" name="shipping" checked={shippingMethod === 'inside'} onChange={() => setShippingMethod('inside')} className="accent-[#DB4444]" />
//               <span>Inside Dhaka (৳60)</span>
//             </label>
//             <label className="flex items-center gap-2 text-sm cursor-pointer">
//               <input type="radio" name="shipping" checked={shippingMethod === 'outside'} onChange={() => setShippingMethod('outside')} className="accent-[#DB4444]" />
//               <span>Outside Dhaka (৳120)</span>
//             </label>
//           </div>
//         </div>
//         <div className="border-b pb-3 space-y-3 text-sm">
//           <div className="flex justify-between">
//             <span>Subtotal:</span>
//             <span className="font-medium">${subtotal.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between border-t pt-3">
//             <span>Shipping:</span>
//             <span className="font-medium">৳{shippingCharge}</span>
//           </div>
//         </div>
//         <div className="flex justify-between font-bold text-base">
//           <span>Total:</span>
//           <span>${totalCost.toFixed(2)}</span>
//         </div>
//         <button
//   type='submit'
//   className='bg-[#eb6e1b] text-white py-3 w-full rounded-br-3xl rounded-tl-3xl hover:bg-black transition-all font-semibold cursor-pointer flex items-center justify-center gap-2'
// >
//   <GiShoppingBag  className="text-xl" />
//   <span>Order now</span>
// </button>
//       </div>
//     </form>
//   );
// };

// export default CheckoutForm;