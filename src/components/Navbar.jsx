'use client'; 

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import logo from "../../public/nav-logo.jpg"
import wishlistIcon from "../assets/icons/wishlist.svg"
import cartIcon from "../assets/icons/cart.png"
import userIcon from "../assets/icons/user.svg"

const Navbar = () => {
    const pathname = usePathname();
    const cart = useCartStore((state) => state.cart);
    const wishlist = useWishlistStore((state) => state.wishlist);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const wishlistCount = wishlist.length;

    return (
        <nav className='border-b border-b-[rgba(0,0,0,0.2)] bg-white sticky top-0 z-50'>
            <div className='container'>
                <div className='flex items-center justify-between py-5'>
                    <Link href={"/"}>
                        <div className='flex items-center justify-center gap-2'>
                            <Image className='rounded-full' src={logo} height={50} width={50} alt='logo' />
                            <span className='text-2xl font-semibold text-black'>Classay Bazar</span>
                        </div>
                    </Link>
                    <ul className='flex items-center gap-8'>
                        <li className='text-base leading-6 text-black'>
                            <Link
                                href="/"
                                className={`pb-1 transition-all ${pathname === '/' ? 'border-b-2 border-black font-medium' : ''}`}
                            >
                                Home
                            </Link>
                        </li>
                        <li className='text-base leading-6 text-black'>
                            <Link
                                href="/contact"
                                className={`pb-1 transition-all ${pathname === '/contact' ? 'border-b-2 border-black font-medium' : ''}`}
                            >
                                Contact
                            </Link>
                        </li>
                        <li className='text-base leading-6 text-black'>
                            <Link
                                href="/about"
                                className={`pb-1 transition-all ${pathname === '/about' ? 'border-b-2 border-black font-medium' : ''}`}
                            >
                                About
                            </Link>
                        </li>
                        <li className='text-base leading-6 text-black'>
                            <Link
                                href="/signup"
                                className={`pb-1 transition-all ${pathname === '/signup' ? 'border-b-2 border-black font-medium' : ''}`}
                            >
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                    
                    <div className='flex items-center gap-20'>
                        <div className="relative max-w-[700px]">
                            <input
                                type="text"
                                placeholder="What are you looking for?"
                                className="w-full bg-[#F5F5F5] text-xs text-black pl-5 pr-10 py-2.5 rounded-sm focus:outline-none placeholder:text-[rgba(0,0,0,0.5)] font-poppins"
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
                        
                        <div className='flex items-center gap-5 text-black'>
                            <Link href={"/wishlist"} className='cursor-pointer relative group'>
                                <Image src={wishlistIcon} height={24} width={24} alt="wishlist" /> 
                                {isMounted && (
                                    <span className='absolute -top-3 -right-3 bg-[#DB4444] text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center animate-fade-in'>
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>
                            <Link href={"/cart"} className='cursor-pointer relative group'>
                                <Image src={cartIcon} height={24} width={24} alt="cart" />
                                {isMounted && (
                                    <span className='absolute -top-3 -right-3 bg-[#DB4444] text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center animate-fade-in'>
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <Link href={"/user"} className='cursor-pointer'>
                                <Image src={userIcon} height={24} width={24} alt="user" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;