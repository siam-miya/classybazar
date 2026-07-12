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
        <section>
            <div className="container bg-black rounded-2xl">
                <div className="py-15 px-14 grid grid-cols-2 items-center">
                    <div className="pl-15">
                        <p className="text-[#00FF66] font-semibold text-[16px] leading-5">Categories</p>
                        <h1 className="text-white text-[48px] leading-[56px] font-semibold py-8 font-poppins max-w-[600px]">
                            {featuredProduct.title}
                        </h1>
                        <div>
                            <CountdownTwo />
                        </div>
                        <div className="pt-10">
                            <Link href={`/products/${featuredProduct.id}`}>
                                <button className="bg-[#00FF66] text-white py-4 px-12 rounded-[4px] cursor-pointer font-medium hover:bg-[#00E65C] transition-colors">
                                    Buy Now!
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-end pr-10">
                        <Image
                            src={featuredProduct.thumbnail}
                            width={400}
                            height={250}
                            alt={featuredProduct.title}
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RadioExprience