"use client"
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
 
const Topbar = () => {
  const [lang, setLang] = useState("English")
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)
 
  const languages = ["English", "বাংলা"]
 
  const handleSelect = (selected) => {
    setLang(selected)
    setOpen(false)
  }
 
  // dropdown er baire click korle bondho hoye jabe
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
 
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
      <div className="relative flex items-center gap-1" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="cursor-pointer flex items-center gap-1 text-xs md:text-sm"
        >
          <span>{lang}</span>
          <IoChevronDown
            size={14}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
 
        {open && (
          <div className="absolute right-0 top-full mt-2 bg-white text-black rounded-md shadow-lg overflow-hidden min-w-[110px] z-50">
            {languages.map((item) => (
              <button
                key={item}
                onClick={() => handleSelect(item)}
                className={`w-full text-left px-4 py-2 text-xs md:text-sm hover:bg-gray-100 cursor-pointer ${
                  lang === item ? "font-semibold" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
 
export default Topbar