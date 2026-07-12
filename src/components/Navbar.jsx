'use client'; 

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import logo from "../../public/navbarLogo.png"
import wishlistIcon from "../assets/icons/wishlist.svg"
import cartIcon from "../assets/icons/cart.png"
import { FiUser, FiLogOut } from "react-icons/fi";
import { toast } from 'react-toastify';
import { RiUser3Line } from 'react-icons/ri';

const Navbar = () => {
    const cart = useCartStore((state) => state.cart);
    const wishlist = useWishlistStore((state) => state.wishlist);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const cartCount = isMounted ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
    const wishlistCount = isMounted ? wishlist.length : 0;

    const handleLogOut = () => {
        toast.success("successfully Logout your account")
    }

    return (
        <nav className='border-b border-b-[rgba(0,0,0,0.2)] bg-white relative z-[60]'>
            <div className='container'>
                <div className='flex items-center justify-between py-5 gap-8'>
                    <Link href={"/"} className="flex-shrink-0">
                        <div className='flex items-center gap-2'>
                            <Image className='rounded-full' src={logo} height={55} width={55} alt='logo' />
                            <span className='text-xl font-bold text-black'>Classy <span className='text-[#ff6308]'>Bazar</span></span>
                        </div>
                    </Link>

                    <div className="relative flex-1 max-w-[650px] ml-2">
                        <input
                            type="text"
                            placeholder="Search for product"
                            className="w-full bg-[#F5F5F5] text-sm text-black pl-5 pr-10 py-3 rounded-xl focus:outline-red-900 placeholder:text-[rgba(0,0,0,0.5)] placeholder:font-bold font-poppins border-2"
                        />
                        <button
                            type="submit"
                            className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-black hover:text-gray-600 transition-colors"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </div>
                    
                    {/* ৩. অ্যাকশন আইকন সেকশন */}
                    <div className='flex items-center gap-8 text-black flex-shrink-0'>
                        
                        <Link href={"/wishlist"} className='cursor-pointer relative group'>
                            <Image src={wishlistIcon} height={24} width={24} alt="wishlist" /> 
                            {/* কন্ডিশন তুলে দেওয়া হয়েছে, তাই সবসময় ০ হলেও দেখাবে */}
                            <span className='absolute -top-3/5 -right-2/5 bg-[#DB4444] text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center'>
                                {wishlistCount}
                            </span>
                        </Link>
                        
                        {/* কার্ট আইকন এবং ব্যাজ */}
                        <Link href={"/cart"} className='cursor-pointer relative group'>
                            <Image src={cartIcon} height={25} width={25} alt="cart" />
                            {/* কন্ডিশন তুলে দেওয়া হয়েছে, তাই সবসময় ০ হলেও দেখাবে */}
                            <span className='absolute -top-3 -right-2 bg-[#DB4444] text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center'>
                                {cartCount}
                            </span>
                        </Link>

                        {/* ইউজার প্রোফাইল */}
                        <div className='relative group pt-2 pb-2 -my-2'>
                            <Link href={"/user/profile"} className='cursor-pointer block rounded-full hover:bg-[#DB4444] hover:text-white transition-all p-2 border'>
                               <RiUser3Line size={22}/>
                            </Link>
                            {/* ড্রপডাউন বক্সে z-[999] নিশ্চিত করা হয়েছে */}
                            <div className='absolute right-0 top-10 mt-1 w-64 bg-black/80 backdrop-blur-md text-white rounded-lg p-4 shadow-xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 z-[999] flex flex-col gap-3'>
                                <Link href={"/user/profile"} className='flex items-center gap-3 py-1.5 px-2 hover:bg-white/10 rounded-md transition-colors text-sm font-light cursor-pointer'>
                                    <FiUser size={20} />
                                    <span>Manage My Account</span>
                                </Link>
                                <button onClick={handleLogOut} className='flex items-center gap-3 py-1.5 px-2 hover:bg-white/10 rounded-md transition-colors text-sm font-light w-full text-left cursor-pointer'>
                                    <FiLogOut size={20} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    )
}
export default Navbar;