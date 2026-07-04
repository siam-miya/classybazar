"use client"
import Link from "next/link";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Topbar = () => {
  const [close, setClose] = useState(false)
  const handleClick = () => {
    setClose(true)
  }
  if (close) return null
  return (
    <div className="w-full bg-black text-[#FAFAFA] py-3 px-4 md:px-12 flex items-center justify-between font-poppins">
      <div className="hidden md:block"></div>
      <div className="flex-1 text-center text-xs md:text-sm tracking-wide max-w-[700px]">
        <span>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
        <Link href={"/products"}
          className="font-semibold underline ml-2 transition-color hover:text-blue-600 transition-all"
        >
          ShopNow
        </Link>
      </div>
      <div className="relative flex items-center gap-1">
        <button onClick={handleClick} className="cursor-pointer">
          <RxCross2 size={25} />
        </button>
      </div>

    </div>
  )
}

export default Topbar
