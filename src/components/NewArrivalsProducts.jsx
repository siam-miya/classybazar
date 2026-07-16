import Image from 'next/image';
import Link from 'next/link';

const NewArrivalsProducts = async () => {
  const res = await fetch("https://dummyjson.com/products")
  const data = await res.json()
  const productData = data.products
  const p1 = productData?.[9];  
  const p2 = productData?.[25];
  const p3 = productData?.[18]; 
  const p4 = productData?.[11];  
  
  if (!p1 || !p2 || !p3 || !p4) return null;

  return (
    <div className="bg-white py-12 container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[240px]">
        <div className="relative bg-black rounded-xl overflow-hidden flex flex-col justify-end p-4 md:p-6 col-span-2 row-span-2">
          <div className="absolute inset-0 w-full h-full z-0">
            <Image src={p1.thumbnail} alt={p1.title} fill className="object-contain object-bottom p-4 opacity-90" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
          <div className="relative z-20 text-white max-w-[80%]">
           <h3 className="text-[24] md:text-base font-semibold tracking-wide font-inter truncate leading-6">{p4.title}</h3>
            <p className="text-gray-300 text-[14px] leading-5 mt-1 font-light hidden sm:block font-poppins max-w-[300px] truncate">{p1.description}</p>
            <Link href={`/products/${p1.id}`} className="inline-block mt-2 text-xs md:text-sm font-medium underline underline-offset-4 hover:text-gray-300 font-inter">Shop Now</Link>
          </div>
        </div>

        <div className="relative bg-black rounded-xl overflow-hidden flex flex-col justify-end p-4 md:p-6 col-span-2 row-span-1">
          <div className="absolute inset-0 w-full h-full z-0">
            <Image src={p2.thumbnail} alt={p2.title} fill className="object-cover object-right opacity-85" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-10" />
          <div className="relative z-20 text-white max-w-[70%]">
           <h3 className="text-[24] md:text-base font-semibold tracking-wide font-inter truncate leading-6">{p4.title}</h3>
            <p className="text-gray-300 text-xs mt-0.5 font-light hidden md:block font-inter max-w-[250px] truncate">{p2.description}</p>
            <Link href={`/products/${p2.id}`} className="inline-block mt-1 text-xs font-medium underline underline-offset-4 hover:text-gray-300 font-inter">Shop Now</Link>
          </div>
        </div>

        <div className="relative bg-black rounded-xl overflow-hidden flex flex-col justify-end p-4 md:p-6 col-span-1 row-span-1">
          <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center p-2">
            <Image src={p3.thumbnail} alt={p3.title} fill className="object-contain object-center p-2 opacity-90" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />
          <div className="relative z-20 text-white">
            <h3 className="text-[24] md:text-base font-semibold tracking-wide font-inter truncate leading-6">{p4.title}</h3>
             <p className="text-gray-300 text-xs mt-0.5 font-light hidden md:block font-inter max-w-[250px] truncate">{p2.description}</p>
            <Link href={`/products/${p3.id}`} className="inline-block mt-1 text-xs font-medium underline underline-offset-4 hover:text-gray-300 font-inter">Shop Now</Link>
          </div>
        </div>

        <div className="relative bg-black rounded-xl overflow-hidden flex flex-col justify-end p-4 md:p-6 col-span-1 row-span-1">
          <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center p-2">
            <Image src={p4.thumbnail} alt={p4.title} fill className="object-contain object-center p-2 opacity-90" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />
          <div className="relative z-20 text-white">
            <h3 className="text-[24] md:text-base font-semibold tracking-wide font-inter truncate leading-6">{p4.title}</h3>
             <p className="text-gray-300 text-xs mt-0.5 font-light hidden md:block font-inter max-w-[250px] truncate">{p2.description}</p>
            <Link href={`/products/${p4.id}`} className="inline-block mt-1 text-xs font-medium underline underline-offset-4 hover:text-gray-300 font-inter">Shop Now</Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NewArrivalsProducts;