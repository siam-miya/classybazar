import Link from 'next/link';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import subBanner from '../assets/images/subBanner.jpg'; 

const SubBanner = ({ title, pageName }) => {
  return (
    <section 
      style={{ backgroundImage: `url(${subBanner.src})` }}
      /* ফিক্সড হাইটের বদলে প্যাডিং (py) ব্যবহার করা হয়েছে যাতে সব ডিভাইসে কন্টেন্ট অনুযায়ী হাইট ঠিক থাকে */
      className="w-full bg-cover bg-center bg-no-repeat relative flex items-center justify-center border-b border-gray-100 font-poppins py-10 md:py-14 lg:py-16"
    >
      {/* ব্যাকগ্রাউন্ড ওভারলে এবং ব্লার ইফেক্ট */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
      
      {/* কন্টেন্ট কন্টেইনার - মোবাইলের জন্য রেসপন্সিভ প্যাডিং ও মার্জিন */}
      <div className="relative z-10 text-center space-y-1.5 md:space-y-3 px-4 w-full max-w-xl mx-auto">
        {/* Title: মোবাইলে একটু ছোট (text-xl বা text-2xl) এবং বড় স্ক্রিনে text-4xl */}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black tracking-wide font-poppins capitalize leading-tight">
          {title}
        </h1>
        
        {/* Breadcrumbs: ছোট স্ক্রিনেও যাতে সুন্দর দেখায় */}
        <div className="flex items-center justify-center flex-wrap gap-1 md:gap-2 text-[11px] sm:text-xs md:text-sm font-medium">
          <Link href="/" className="text-gray-600 hover:text-[#DB4444] transition-colors duration-200">
            Home
          </Link>
          <MdOutlineKeyboardArrowRight size={14} className="text-gray-400 md:size-[16px]" />
          <span className="text-black capitalize font-semibold truncate max-w-[150px] sm:max-w-xs">
            {pageName || title}
          </span>
        </div>
      </div>
    </section>
  );
};

export default SubBanner;