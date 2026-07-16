import Image from "next/image"
import CountdownTwo from "./CountDownTwo"
import Link from "next/link"

const RadioExprience = async () => {
    const res = await fetch("https://dummyjson.com/products")
    const data = await res.json()
    const productData = data.products
    const featuredProduct = productData?.[13];
    if (!featuredProduct) return null;

    return (
        <section className="w-full px-4 md:px-0 mb-12">
            <div className="container mx-auto bg-black rounded-2xl md:rounded-3xl overflow-hidden">
                {/* মোবাইলে ফ্লেক্স কলাম (flex-col) ব্যবহার করা হয়েছে যাতে কন্টেন্ট সিরিয়ালি নিচে নামে।
                  ডেস্কটপে (md:) এটি গ্রিড লেআউট (grid-cols-2) হিসেবে কাজ করবে।
                */}
                <div className="py-10 px-6 sm:p-12 md:py-16 md:px-14 flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    
                    {/* টেক্সট ও টাইমার অংশ (মোবাইলে এটি প্রথমে/উপরে থাকবে) */}
                    <div className="w-full flex flex-col items-center text-center md:items-start md:text-left md:pl-6 lg:pl-12">
                        <p className="text-[#00FF66] font-semibold text-sm md:text-base uppercase tracking-wider">
                            Categories
                        </p>
                        
                        {/* টাইটেলের সাইজ মোবাইলে ২৪px করা হয়েছে যাতে স্ক্রিনে জায়গা পায় */}
                        <h1 className="text-white text-2xl sm:text-3xl md:text-[40px] lg:text-[48px] leading-tight md:leading-[56px] font-bold py-4 md:py-6 font-poppins max-w-[600px] break-words">
                            {featuredProduct.title}
                        </h1>
                        
                        {/* টাইমার কম্পোনেন্ট */}
                        <div className="my-4 md:my-6 w-full flex justify-center md:justify-start">
                            <CountdownTwo />
                        </div>
                        
                        <div className="pt-6 md:pt-8 w-full md:w-auto">
                            <Link href={`/products/${featuredProduct.id}`} className="block w-full md:w-auto">
                                <button className="w-full md:w-auto bg-[#00FF66] text-black font-semibold py-3.5 px-10 md:py-4 md:px-12 rounded-[4px] cursor-pointer hover:bg-[#00E65C] transition-all duration-300 transform active:scale-95 shadow-lg shadow-[#00ff66]/20">
                                    Buy Now!
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* ইমেজ অংশ (মোবাইলে বাটন বা টেক্সটের উপরে ওভারল্যাপ করবে না, সুন্দরভাবে নিচে থাকবে) */}
                    <div className="relative flex justify-center items-center w-full mt-4 md:mt-0">
                        {/* গ্লো ইফেক্ট */}
                        <div className="absolute w-[140px] h-[140px] sm:w-[220px] sm:h-[220px] bg-white/10 blur-[60px] md:blur-[80px] rounded-full pointer-events-none"></div>
                        
                        {/* ইমেজের হাইট-উইডথ রেসপন্সিভ করা হয়েছে। 
                          মোবাইলে এটি সর্বোচ্চ ২০০px নিবে, বড় স্ক্রিনে আপনার চাহিদা অনুযায়ী ৩৫০px পর্যন্ত বড় হবে।
                        */}
                        <div className="relative w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[350px]">
                            <Image
                                src={featuredProduct.thumbnail}
                                fill
                                alt={featuredProduct.title}
                                className="object-contain transform hover:scale-105 transition-transform duration-500"
                                priority
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default RadioExprience