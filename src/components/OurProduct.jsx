import SectionHeading from './SectionHeading';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from './ProductCard';
import Button from './Button';
import Link from 'next/link';

const OurProducts = async () => {
  const res = await fetch("https://dummyjson.com/products")
  const data = await res.json()
  const productsData = data.products

  return (
    <section className="w-full">
      {/* মোবাইলে দুই পাশে সুন্দর খালি জায়গা (px-4) রাখার জন্য এবং ডেস্কটপে আগের মতো এলাইনমেন্টের জন্য px-4 md:px-0 */}
      <div className="container mx-auto px-4 md:px-0 border-b pb-12 md:pb-16">
        <div className='mt-10 md:mt-20 mb-1 md:mb-15'>
          
          {/* হেডিং কন্টেইনার: মোবাইলে উপর-নিচে (flex-col) হবে যাতে ভেঙে না যায়, বড় স্ক্রিনে ডানে-বামে (md:flex-row) এলাইন থাকবে */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <SectionHeading subHeading={"Our Products"} heading={"Explore Our Products"} countDown={false} />
          </div>
          
          {/* গ্রিড লেআউট: 
            - মোবাইলে ২টি করে কার্ড পাশাপাশি সুন্দরভাবে দেখাবে (grid-cols-2) এবং গ্যাপ কম থাকবে (gap-4)
            - ডেস্কটপে আপনার আগের ডিজাইন অনুযায়ী ৪টি করে কার্ড (lg:grid-cols-4) এবং ৮ গ্যাপ (gap-8) থাকবে
          */}
          <div className='mt-6 md:mt-10 mb-8 md:mb-13 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8'>
            {productsData.slice(8, 16).map((product) => (
              <div key={product.id} className="w-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          {/* ভিউ অল বাটন */}
          <div className='text-center mt-8 md:mt-10'>
            <Button TagName={Link} href={"/products"}>View All Products</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProducts;