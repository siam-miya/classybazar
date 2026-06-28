"use client"
import Link from "next/link";
import { useState } from "react";

const Topbar = () => {
    const [language, setLanguage] = useState('en');
  return (
   <div className="w-full bg-black text-[#FAFAFA] py-3 px-4 md:px-12 flex items-center justify-between font-poppins">
      <div className="hidden md:block"></div>
      <div className="flex-1 text-center text-xs md:text-sm tracking-wide max-w-[700px]">
        <span>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
        <Link href={"/shop"}
          className="font-semibold underline ml-2 hover:text-gray-300 transition-colors"
        >
          ShopNow
        </Link>
      </div>
      <div className="relative flex items-center gap-1">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-black text-[#FAFAFA] text-xs md:text-sm border-none cursor-pointer focus:outline-none pr-4 appearance-none font-normal px-2"
        >
          <option value="en" className="bg-zinc-900 text-white">English</option>
          <option value="bn" className="bg-zinc-900 text-white">Bangla</option>
        </select>
        <svg 
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none w-3 h-3 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

    </div>
  )
}

export default Topbar
