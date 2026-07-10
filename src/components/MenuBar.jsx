"use client";

import React, { useState, useEffect } from 'react'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowUp } from "react-icons/md"
import MenuSection from "./MenuSection"
import Link from "next/link"
import Image from 'next/image'
import { RxHamburgerMenu } from "react-icons/rx"
import { usePathname } from 'next/navigation'
import logo from "../../public/nav-logo.jpg"
import wishlistIcon from "../assets/icons/wishlist.svg"
import cartIcon from "../assets/icons/cart.png"
import { RiUser3Line } from 'react-icons/ri'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { FiUser, FiLogOut } from "react-icons/fi"
import { toast } from 'react-toastify'

const MenuBar = () => {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const cart = useCartStore((state) => state.cart);
    const wishlist = useWishlistStore((state) => state.wishlist);
    const [isMounted, setIsMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const handleScroll = () => {
            if (window.scrollY > 120) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const cartCount = isMounted ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
    const wishlistCount = isMounted ? wishlist.length : 0;

    const handleLogOut = () => {
        toast.success("successfully Logout your account")
    }

    return (
        <section className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm transition-all duration-300">
            <div className="container">
              
                <div className={`flex items-center justify-between relative transition-all duration-300 ${
                    isScrolled ? "py-4" : ""
                }`}>
                    <div className="w-[270px] flex-shrink-0">
                        {!isScrolled ? (
                            /* ১. সাধারণ অবস্থায়: ক্যাটাগরি বাটন */
                            <div className="w-[270px] z-20 group relative self-start">
                                <h2 className="bg-[#DB4444] text-white py-4 px-4 flex items-center justify-between gap-2 font-medium text-sm select-none cursor-pointer">
                                    <span className="flex items-center gap-2">
                                        <RxHamburgerMenu size={18} />
                                        Browse Categories
                                    </span>
                                    <span className={`${isHomePage ? 'block' : 'block group-hover:hidden'}`}>
                                        <MdOutlineKeyboardArrowDown size={20} />
                                    </span>
                                    <span className={`${isHomePage ? 'hidden' : 'hidden group-hover:block'}`}>
                                        <MdOutlineKeyboardArrowUp size={20} />
                                    </span>
                                </h2>
                                
                                <ul className={`
                                    w-[270px] bg-white border border-gray-200 shadow-lg p-2 flex flex-col transition-all duration-200 rounded-b-md absolute left-0 top-[52px] z-[999]
                                    ${isHomePage ? 'block' : 'hidden group-hover:flex'}
                                `}>
                                    <ListItems text={"Woman’s Fashion"} icon />
                                    <ListItems text={"Men’s Fashion"} icon />
                                    <ListItems text={"Electronics"} />
                                    <ListItems text={"Home & Lifestyle"} />
                                    <ListItems text={"Medicine"} />
                                    <ListItems text={"Sports & Outdoor"} />
                                    <ListItems text={"Baby’s & Toys"} />
                                    <ListItems text={"Groceries"} />
                                    <ListItems text={"Health & Beauty"} />
                                    <ListItems text={"Electronics"} />
                                    <ListItems text={"Home & Lifestyle"} />
                                    <ListItems text={"Medicine"} />
                                    <ListItems text={"Sports & Outdoor"} />
                                </ul>
                            </div>
                        ) : (
                            /* ২. স্ক্রল করার পর: লোগো শো হবে */
                            <Link href={"/"} className="flex items-center gap-2 animate-fadeIn">
                                <Image className='rounded-full' src={logo} height={40} width={40} alt='logo' />
                                <span className='text-xl font-semibold text-black'>Classy Bazar</span>
                            </Link>
                        )}
                    </div>

                    <div className="flex-1 flex justify-center mr-20">
                        <MenuSection />
                    </div>

                    <div className="flex-shrink-0 min-w-[120px] flex justify-end">
                        {!isScrolled ? (
                            <button className="text-white font-medium text-sm hover:bg-black transition-colors cursor-pointer py-2.5 px-5 bg-[#DB4444] rounded-md animate-fadeIn">
                                Order Track
                            </button>
                        ) : (
                            <div className="flex items-center gap-6 text-black animate-fadeIn relative z-[999]">
                                {/* উইশলিস্ট */}
                                <Link href={"/wishlist"} className='cursor-pointer relative group'>
                                    <Image src={wishlistIcon} height={22} width={22} alt="wishlist" /> 
                                    <span className='absolute -top-2.5 -right-2 bg-[#DB4444] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center'>
                                        {wishlistCount}
                                    </span>
                                </Link>
                                
                                {/* কার্ট */}
                                <Link href={"/cart"} className='cursor-pointer relative group'>
                                    <Image src={cartIcon} height={23} width={23} alt="cart" />
                                    <span className='absolute -top-2.5 -right-2 bg-[#DB4444] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center'>
                                        {cartCount}
                                    </span>
                                </Link>

                                {/* প্রোফাইল ও স্ক্রলড ড্রপডাউন মেনু */}
                                <div className='relative group pt-2 pb-2 -my-2'>
                                    <Link href={"/user/profile"} className='cursor-pointer block rounded-full hover:bg-[#DB4444] hover:text-white transition-all p-1.5 border'>
                                        <RiUser3Line size={18}/>
                                    </Link>
                                    {/* Dropdown position top-8 theke top-full e dynamic layout mapping kora holo text readability fixed rakhar jonno */}
                                    <div className='absolute right-0 top-full mt-2 w-64 bg-black/80 backdrop-blur-md text-white rounded-lg p-4 shadow-xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 z-[999] flex flex-col gap-3'>
                                        <Link href={"/user/profile"} className='flex items-center gap-3 py-1.5 px-2 hover:bg-white/10 rounded-md transition-colors text-sm font-light cursor-pointer'>
                                            <FiUser size={18} />
                                            <span>Manage My Account</span>
                                        </Link>
                                        <button onClick={handleLogOut} className='flex items-center gap-3 py-1.5 px-2 hover:bg-white/10 rounded-md transition-colors text-sm font-light w-full text-left cursor-pointer'>
                                            <FiLogOut size={18} />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    )
}

export default MenuBar

function ListItems({ icon = false, text }) {
    return (
        <li className="w-full hover:bg-gray-50 rounded-sm transition-colors">
            <Link href={"/"} className='grid grid-cols-[1fr_24px] gap-2 items-center py-2 px-3 text-sm text-gray-700 hover:text-black transition-colors'>
                <span>{text}</span>
                {icon && <MdOutlineKeyboardArrowRight size={18} className='text-gray-400 cursor-pointer' />}
            </Link>
        </li>
    )
}