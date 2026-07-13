"use client";
import React, { useState, useEffect } from 'react'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowUp } from "react-icons/md"
import MenuSection from "./MenuSection"
import Link from "next/link"
import Image from 'next/image'
import { RxHamburgerMenu } from "react-icons/rx"
import { usePathname } from 'next/navigation'
import logo from "../../public/navbarLogo.png"
import wishlistIcon from "../assets/icons/wishlist.svg"
import cartIcon from "../assets/icons/cart.png"
import { RiUser3Line } from 'react-icons/ri'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { FiUser, FiLogOut } from "react-icons/fi"
import { toast } from 'react-toastify'
import { Spinner } from '@heroui/react';

// --- আইকনগুলোর সঠিক নাম ও মডিউল আপডেট করা হলো ---
import { BiLaptop } from "react-icons/bi";
import {
    FaCar, FaClock, FaHome, FaMobileAlt, FaMotorcycle,
    FaRedhat, FaRunning, FaShoppingBag, FaTshirt
} from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6"; 
import {
    GiBigDiamondRing, GiDelicatePerfume, GiFootprint,
    Gi3dGlasses, GiLipstick, GiTable 
} from "react-icons/gi"; // GiGlasses পরিবর্তন করে Gi3dGlasses করা হলো
import { MdChair, MdOutlineFastfood } from "react-icons/md";

const categoryIcons = {
    "beauty": <GiLipstick size={18} />,
    "fragrances": <GiDelicatePerfume size={18} />,
    "furniture": <MdChair size={18} />,
    "groceries": <MdOutlineFastfood size={18} />,
    "home-decoration": <FaHome size={18} />,
    "kitchen-accessories": <GiTable size={18} />,
    "laptops": <BiLaptop size={18} />,
    "mens-shirts": <FaUserTie size={18} />,
    "mens-shoes": <GiFootprint size={18} />,
    "mens-watches": <FaClock size={18} />,
    "mobile-accessories": <FaMobileAlt size={18} />,
    "motorcycle": <FaMotorcycle size={18} />,
    "skin-care": <GiLipstick size={18} />,
    "smartphones": <FaMobileAlt size={18} />,
    "sports-accessories": <FaRunning size={18} />,
    "sunglasses": <Gi3dGlasses size={18} />, // Gi3dGlasses ব্যবহার করা হয়েছে
    "tops": <FaTshirt size={18} />,
    "vehicle": <FaCar size={18} />,
    "womens-bags": <FaShoppingBag size={18} />,
    "womens-dresses": <FaRedhat size={18} />,
    "womens-jewellery": <GiBigDiamondRing size={18} />,
    "womens-shoes": <GiFootprint size={18} />,
    "womens-watches": <FaClock size={18} />,
};

const MenuBar = () => {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const cart = useCartStore((state) => state.cart);
    const wishlist = useWishlistStore((state) => state.wishlist);
    const [isMounted, setIsMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setIsMounted(true);

        const fetchCategories = async () => {
            try {
                const res = await fetch('https://dummyjson.com/products/categories');
                const data = await res.json();
                setCategories(data.slice(0, 9));
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();

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
                <div className={`flex items-center justify-between relative transition-all duration-300 ${isScrolled ? "py-4" : ""}`}>
                    <div className="w-[270px] flex-shrink-0">
                        {!isScrolled ? (
                            <div className="max-w-[270px] z-20 group relative self-start">
                                <h2 className="bg-[#eb6e1b] text-white py-4 px-4 flex items-center justify-between gap-2 font-bold text-sm select-none cursor-pointer ">
                                    <span className="flex items-center gap-2 font-poppins">
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

                                <ul className={`w-[270px] bg-white border border-gray-200 shadow-lg p-2 flex flex-col transition-all duration-200 rounded-b-md absolute left-0 top-[52px] z-[999] max-h-[450px] overflow-y-auto scrollbar-none ${isHomePage ? 'block' : 'hidden group-hover:flex'}`}>
                                    {loading ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <Spinner size="md" color="danger" />
                                            <span className="text-sm text-muted text-[#eb6e1b]">Categories Loading....</span>
                                        </div>
                                    ) : (
                                        categories.map((cat, index) => (
                                            <ListItems
                                                key={index}
                                                text={cat.name}
                                                slug={cat.slug}
                                                categoryIcon={categoryIcons[cat.slug] || <FaShoppingBag size={18} />}
                                                rightIcon={true}
                                            />
                                        ))
                                    )}
                                </ul>
                            </div>
                        ) : (
                            <Link href={"/"} className="flex items-center gap-2 animate-fadeIn">
                                <Image className='rounded-full' src={logo} height={100} width={200} alt='logo' />
                            </Link>
                        )}
                    </div>

                    <div className="flex-1 flex justify-center mr-20">
                        <MenuSection />
                    </div>

                    <div className="flex-shrink-0 min-w-[120px] flex justify-end">
                        {!isScrolled ? (
                            <Link href={"/user/profile?tab=Order Track"}>
                                <button className="text-white font-bold text-sm hover:bg-black transition-colors cursor-pointer py-2.5 px-5 bg-[#eb6e1b] rounded-md animate-fadeIn font-poppins">
                                    Order Track
                                </button>
                            </Link>
                        ) : (
                            <div className="flex items-center gap-6 text-black animate-fadeIn relative z-[999]">
                                <Link href={"/wishlist"} className='cursor-pointer relative group'>
                                    <Image src={wishlistIcon} height={22} width={22} alt="wishlist" />
                                    <span className='absolute -top-2.5 -right-2 bg-[#eb6e1b] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center'>
                                        {wishlistCount}
                                    </span>
                                </Link>

                                <Link href={"/cart"} className='cursor-pointer relative group'>
                                    <Image src={cartIcon} height={23} width={23} alt="cart" />
                                    <span className='absolute -top-2.5 -right-2 bg-[#eb6e1b] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center'>
                                        {cartCount}
                                    </span>
                                </Link>

                                <div className='relative group pt-2 pb-2 -my-2'>
                                    <Link href={"/user/profile"} className='cursor-pointer block rounded-full hover:bg-[#eb6e1b] hover:text-white transition-all p-1.5 border'>
                                        <RiUser3Line size={18} />
                                    </Link>
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

function ListItems({ rightIcon = false, categoryIcon, text, slug }) {
    return (
        <li className="w-full text-black hover:text-white hover:bg-[rgb(235,110,27)] border-b border-b-gray-100 leading-6">
            <Link
                href={`/products?category=${slug}`}
                className='grid grid-cols-[24px_1fr_24px] gap-2 items-center py-2 px-3 transition-colors'
            >
                {/* ক্যাটাগরি আইকন */}
                <span className="flex items-center justify-center">{categoryIcon}</span>

                {/* ক্যাটাগরি নাম */}
                <span className='font-sm capitalize font-poppins'>{text}</span>

                {/* ডানপাশের অ্যারো আইকন */}
                {rightIcon && <MdOutlineKeyboardArrowRight size={18} />}
            </Link>
        </li>
    )
}