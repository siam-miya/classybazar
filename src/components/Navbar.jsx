'use client'; 

import Image from 'next/image'
import React from 'react'
import logo from "../../public/nav-logo.jpg"
import wishlist from "../assets/icons/wishlist.svg"
import cart from "../assets/icons/cart.png"
import user from "../assets/icons/user.svg"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className='border-b border-b-[rgba(0,0,0,0.2)]'>
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
                            <Link href={"/widhlist"} className='cursor-pointer'>
                                <Image src={wishlist} height={24} width={24} alt="logo" /> 
                            </Link>
                            <Link href={"/cart"} className='cursor-pointer'>
                                <Image src={cart} height={24} width={24} alt="logo" />
                            </Link>
                            <Link href={"/user"} className='cursor-pointer'>
                                <Image src={user} height={24} width={24} alt="logo" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;