import Image from 'next/image';
import Link from 'next/link';
import img_1 from "../assets/images/arrival_1.png"
import img_2 from "../assets/images/arrival_2.png"
import img_3 from "../assets/images/arrival_3.png"
import img_4 from "../assets/images/arrival_4.png"

const NewArrivalsProducts = () => {
   const products = [
    {
      id: 1,
      title: "PlayStation 5",
      description: "Black and White version of the PS5 coming out on sale.",
      image: img_1,
      link: "/shop/women",
    },
    {
      id: 2,
      title: "Women’s Collections",
      description: "Featured woman collections that give you another vibe.",
      image: img_2,
      link: "/shop/speakers",
    },
    {
      id: 3,
      title: "Speakers",
      description: "Amazon wireless speakers",
      image: img_3, 
      link: "/shop/perfume",
    },
    {
      id: 4,
      title: "Perfume",
      description: "GUCCI INTENSE OUD EDP",
      image: img_4, 
      link: "/shop/watch",
    },
  ];
  return (
 <div className="bg-white py-12 px-4 max-w-7xl mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[240px]">
      <div className="relative bg-black rounded-xl overflow-hidden flex flex-col justify-end p-4 md:p-6 col-span-2 row-span-2">
        <div className="absolute inset-0 w-full h-full z-0">
          <Image src={products[0].image} alt={products[0].title} fill className="object-contain object-bottom p-4 opacity-90" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
        <div className="relative z-20 text-white max-w-[80%]">
          <h3 className="text-lg md:text-2xl font-bold tracking-wide">{products[0].title}</h3>
          <p className="text-gray-300 text-xs mt-1 font-light hidden sm:block">{products[0].description}</p>
          <Link href={products[0].link} className="inline-block mt-2 text-xs md:text-sm font-medium underline underline-offset-4 hover:text-gray-300">Shop Now</Link>
        </div>
      </div>
      <div className="relative bg-black rounded-xl overflow-hidden flex flex-col justify-end p-4 md:p-6 col-span-2 row-span-1">
        <div className="absolute inset-0 w-full h-full z-0">
          <Image src={products[1].image} alt={products[1].title} fill className="object-cover object-right opacity-85" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-10" />
        <div className="relative z-20 text-white max-w-[70%]">
          <h3 className="text-base md:text-xl font-bold tracking-wide">{products[1].title}</h3>
          <p className="text-gray-300 text-xs mt-0.5 font-light hidden md:block">{products[1].description}</p>
          <Link href={products[1].link} className="inline-block mt-1 text-xs font-medium underline underline-offset-4 hover:text-gray-300">Shop Now</Link>
        </div>
      </div>
      <div className="relative bg-black rounded-xl overflow-hidden flex flex-col justify-end p-4 md:p-6 col-span-1 row-span-1">
        <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center p-2">
          <Image src={products[2].image} alt={products[2].title} fill className="object-contain object-center p-2 opacity-90" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />
        <div className="relative z-20 text-white">
          <h3 className="text-sm md:text-base font-bold tracking-wide">{products[2].title}</h3>
          <Link href={products[2].link} className="inline-block mt-1 text-xs font-medium underline underline-offset-4 hover:text-gray-300">Shop Now</Link>
        </div>
      </div>
      <div className="relative bg-black rounded-xl overflow-hidden flex flex-col justify-end p-4 md:p-6 col-span-1 row-span-1">
        <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center p-2">
          <Image src={products[3].image} alt={products[3].title} fill className="object-contain object-center p-2 opacity-90" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />
        <div className="relative z-20 text-white">
          <h3 className="text-sm md:text-base font-bold tracking-wide">{products[3].title}</h3>
          <Link href={products[3].link} className="inline-block mt-1 text-xs font-medium underline underline-offset-4 hover:text-gray-300">Shop Now</Link>
        </div>
      </div>

    </div>
  </div>
  )
}

export default NewArrivalsProducts
