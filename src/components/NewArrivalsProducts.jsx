import Image from 'next/image';
import Link from 'next/link';

const NewArrivalsProducts = async () => {
  const res = await fetch("https://dummyjson.com/products")
  const data = await res.json()
  const productData = data.products
  
  const p1 = productData?.[9];   // বড় কলাম (যেমন: আইফোন/স্মার্টফোন)
  const p2 = productData?.[25];  // চওড়া কলাম
  const p3 = productData?.[18];  // ছোট কলাম ১
  const p4 = productData?.[11];  // ছোট কলাম ২
  
  if (!p1 || !p2 || !p3 || !p4) return null;

  return (
    // py-6 এবং ডানে-বামে প্যাডিং ঠিক করা হয়েছে
    <div className="bg-white py-6 md:py-12 w-full">
      {/* 
        - মোবাইলে গ্রিডের সারিগুলোর উচ্চতা auto-rows-[200px] এবং বড় স্ক্রিনে md:auto-rows-[280px]
        - গ্যাপ মোবাইলে ২ এবং বড় স্ক্রিনে ৪
      */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] sm:auto-rows-[240px] md:auto-rows-[280px]">
        
        {/* ১. প্রথম বড় বক্স (পাসাপাশি ২ কলাম, নিচে নিচে ২ রো জুড়ে থাকবে) */}
        <div className="relative bg-black rounded-xl overflow-hidden flex flex-col justify-end p-4 md:p-6 col-span-2 row-span-2 group">
          <div className="absolute inset-0 w-full h-full z-0 transition-transform duration-500 group-hover:scale-105">
            <Image 
              src={p1.thumbnail} 
              alt={p1.title} 
              fill 
              className="object-contain object-bottom p-4 opacity-90" 
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />
          
          <div className="relative z-20 text-white max-w-[90%] md:max-w-[80%]">
            <h3 className="text-lg md:text-xl font-bold tracking-wide font-inter truncate leading-tight">
              {p1.title}
            </h3>
            <p className="text-gray-300 text-xs md:text-sm mt-1.5 font-light hidden sm:line-clamp-2 font-poppins">
              {p1.description}
            </p>
            <Link 
              href={`/products/${p1.id}`} 
              className="inline-block mt-3 text-xs md:text-sm font-medium underline underline-offset-4 hover:text-[#00FF66] transition-colors font-inter"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* ২. দ্বিতীয় চওড়া বক্স (পাশাপাশি ২ কলাম, নিচে নিচে ১ রো জুড়ে থাকবে) */}
        <div className="relative bg-black rounded-xl overflow-hidden flex flex-col justify-end p-4 md:p-6 col-span-2 row-span-1 group">
          <div className="absolute inset-0 w-full h-full z-0 transition-transform duration-500 group-hover:scale-105">
            <Image 
              src={p2.thumbnail} 
              alt={p2.title} 
              fill 
              className="object-cover object-right opacity-85" 
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10" />
          
          <div className="relative z-20 text-white max-w-[75%]">
            <h3 className="text-base md:text-lg font-bold tracking-wide font-inter truncate leading-tight">
              {p2.title}
            </h3>
            <p className="text-gray-300 text-xs mt-1 font-light hidden md:line-clamp-1 font-inter">
              {p2.description}
            </p>
            <Link 
              href={`/products/${p2.id}`} 
              className="inline-block mt-2 text-xs font-medium underline underline-offset-4 hover:text-[#00FF66] transition-colors font-inter"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* ৩. তৃতীয় ছোট বক্স (পাশাপাশি ১ কলাম, নিচে নিচে ১ রো) */}
        <div className="relative bg-black rounded-xl overflow-hidden flex flex-col justify-end p-3 md:p-6 col-span-1 row-span-1 group">
          <div className="absolute inset-0 w-full h-full z-0 transition-transform duration-500 group-hover:scale-105">
            <Image 
              src={p3.thumbnail} 
              alt={p3.title} 
              fill 
              className="object-contain object-center p-3 opacity-90" 
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent z-10" />
          
          <div className="relative z-20 text-white w-full">
            <h3 className="text-xs sm:text-sm md:text-base font-bold tracking-wide font-inter truncate leading-tight">
              {p3.title}
            </h3>
            <Link 
              href={`/products/${p3.id}`} 
              className="inline-block mt-1 text-[10px] sm:text-xs font-medium underline underline-offset-4 hover:text-[#00FF66] transition-colors font-inter"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* ৪. চতুর্থ ছোট বক্স (পাশাপাশি ১ কলাম, নিচে নিচে ১ রো) */}
        <div className="relative bg-black rounded-xl overflow-hidden flex flex-col justify-end p-3 md:p-6 col-span-1 row-span-1 group">
          <div className="absolute inset-0 w-full h-full z-0 transition-transform duration-500 group-hover:scale-105">
            <Image 
              src={p4.thumbnail} 
              alt={p4.title} 
              fill 
              className="object-contain object-center p-3 opacity-90" 
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent z-10" />
          
          <div className="relative z-20 text-white w-full">
            <h3 className="text-xs sm:text-sm md:text-base font-bold tracking-wide font-inter truncate leading-tight">
              {p4.title}
            </h3>
            <Link 
              href={`/products/${p4.id}`} 
              className="inline-block mt-1 text-[10px] sm:text-xs font-medium underline underline-offset-4 hover:text-[#00FF66] transition-colors font-inter"
            >
              Shop Now
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NewArrivalsProducts;