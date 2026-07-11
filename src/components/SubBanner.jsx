import Link from 'next/link';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import subBanner from '../assets/images/subBanner.jpg'; 

const SubBanner = ({ title, pageName }) => {
  return (
    <section 
      style={{ backgroundImage: `url(${subBanner.src})` }}
      className="w-full max-h-[40vh] md:max-h-[200px] bg-cover bg-center bg-no-repeat relative flex items-center justify-center border-b border-gray-100 mb-10"
    >
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px]"></div>
      <div className="relative z-10 text-center space-y-2 py-10">
        <h1 className="text-2xl md:text-4xl font-bold text-black tracking-wide font-poppins capitalize">
          {title}
        </h1>
        <div className="flex items-center justify-center gap-1.5 text-xs md:text-sm font-medium">
          <Link href="/" className="text-black hover:text-[#DB4444] transition-colors">
            Home
          </Link>
          <MdOutlineKeyboardArrowRight size={16} className="text-gray-400" />
          <span className="text-black capitalize font-semibold">
            {pageName || title}
          </span>
        </div>
      </div>
    </section>
  );
};

export default SubBanner;