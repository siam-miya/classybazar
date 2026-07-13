'use client';

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation' // সার্চ পেজে রিডাইরেক্ট করার জন্য
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import logo from "../../public/navbarLogo.png"
import wishlistIcon from "../assets/icons/wishlist.svg"
import cartIcon from "../assets/icons/cart.png"
import { FiUser, FiLogOut } from "react-icons/fi";
import { toast } from 'react-toastify';
import { RiUser3Line } from 'react-icons/ri';

const Navbar = () => {
    const router = useRouter();
    const cart = useCartStore((state) => state.cart);
    const wishlist = useWishlistStore((state) => state.wishlist);

    // স্টেটস
    const [isMounted, setIsMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // ডাইনামিক এপিআই সার্চ (Debouncing ছাড়া বা বেসিক অপ্টিমাইজড)
    useEffect(() => {
        if (searchQuery.trim().length > 1) {
            setLoading(true);
            setIsOpen(true);

            // DummyJSON-এর সার্চ এন্ডপয়েন্ট কল হচ্ছে
            fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
                .then((res) => res.json())
                .then((data) => {
                    // আমরা ড্রপডাউনে সর্বোচ্চ ৬টি প্রোডাক্ট দেখাবো যেন দেখতে সুন্দর লাগে
                    setSearchResults(data.products ? data.products.slice(0, 6) : []);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Search fetch error:", error);
                    setLoading(false);
                });
        } else {
            setSearchResults([]);
            setIsOpen(false);
        }
    }, [searchQuery]);

    // ড্রপডাউনের বাইরে ক্লিক করলে ড্রপডাউন বন্ধ করার হ্যান্ডলার
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // এন্টার প্রেস করলে বা সার্চ বাটনে ক্লিক করলে ডেডিকেটেড সার্চ পেজে নিয়ে যাবে
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setIsOpen(false);
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

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
                            <Image src={logo} height={120} width={240} alt='logo'/>
                        </div>
                    </Link>
                    <div ref={dropdownRef} className="relative flex-1 max-w-[650px] ml-2">
                        <form onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => searchQuery.trim().length > 1 && setIsOpen(true)}
                                placeholder="Search for product"
                                className="w-full bg-[#F5F5F5] text-sm text-black pl-5 pr-10 py-3 rounded-xl focus:outline-[#FFAD33] placeholder:text-[rgba(0,0,0,0.5)] placeholder:font-bold font-poppins border-2"
                            />
                            <button
                                type="submit"
                                className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 bg-[#eb6e1b] text-white hover:bg-black font-bold p-2 rounded-full transition-colors"
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
                        </form>

                        {isOpen && (
                            <div className="absolute left-0 right-0 top-full mt-2 bg-white text-black border border-gray-200 rounded-xl shadow-2xl z-[9999] overflow-hidden max-h-[480px] flex flex-col">
                                {loading ? (
                                    <div className="p-5 text-center text-sm text-gray-500 font-poppins">
                                        Searching products...
                                    </div>
                                ) : searchResults.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 p-2 overflow-y-auto">
                                            {searchResults.map((product) => (
                                                <Link
                                                    key={product.id}
                                                    href={`/products/${product.id}`}
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex items-center gap-3 p-2 bg-white hover:bg-gray-50 transition-colors rounded-lg group"
                                                >
                                                    <div className="w-12 h-12 relative flex-shrink-0 bg-[#F5F5F5] rounded-md overflow-hidden flex items-center justify-center">
                                                        <Image src={product.thumbnail} height={300} width={300} alt={product.title} className="object-contain max-w-full max-h-full"/>
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="text-xs font-semibold text-gray-800 line-clamp-1 group-hover:text-[#ff6308] transition-colors font-poppins">
                                                            {product.title}
                                                        </span>
                                                        <span className="text-xs text-[#ff6308] font-bold mt-0.5">
                                                            ৳ {product.price}
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>

                                        <button
                                            onClick={handleSearchSubmit}
                                            className="w-full text-center py-2.5 bg-gray-50 border-t text-xs font-bold text-gray-700 hover:text-white hover:bg-[#ff6308] transition-all font-poppins cursor-pointer"
                                        >
                                            View All Results ({searchQuery})
                                        </button>
                                    </>
                                ) : (
                                    <div className="p-5 text-center text-sm text-gray-500 font-poppins">
                                        No products found for &quot;{searchQuery}&quot;
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* ৩. অ্যাকশন আইকন সেকশন */}
                    <div className='flex items-center gap-8 text-black flex-shrink-0'>
                        <Link href={"/wishlist"} className='cursor-pointer relative group'>
                            <Image src={wishlistIcon} height={24} width={24} alt="wishlist" />
                            <span className='absolute -top-3/5 -right-2/5 bg-[#eb6e1b] text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center'>
                                {wishlistCount}
                            </span>
                        </Link>

                        <Link href={"/cart"} className='cursor-pointer relative group'>
                            <Image src={cartIcon} height={25} width={25} alt="cart" />
                            <span className='absolute -top-3 -right-2 bg-[#eb6e1b] text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center'>
                                {cartCount}
                            </span>
                        </Link>

                        {/* ইউজার প্রোফাইল */}
                        <div className='relative group pt-2 pb-2 -my-2'>
                            <Link href={"/user/profile"} className='cursor-pointer block rounded-full hover:bg-[#eb6e1b] hover:text-white transition-all p-2 border'>
                                <RiUser3Line size={22} />
                            </Link>
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