import Image from "next/image"
import CountdownTwo from "./CountDownTwo"
import radio from "../assets/images/radio.png"

const RadioExprience = () => {
  return (
    <section>
         <div className="container bg-black rounded-tr-2xl rounded-bl-2xl">
            <div className="py-17 px-14 grid grid-cols-2">
                <div>
                <p className="text-[#00FF66] font-semibold text-[16px] leading-5">Categories</p>
                <h1 className="text-white text-[48px] leading-12 font-semibold py-8">
                    Enhance Your <br /> Music Experience
                </h1>
                <div>
                    <CountdownTwo/>
                </div>
                <div className="pt-10">
                    <button className="bg-[#00FF66] text-white py-4 px-12 rounded-[4px] cursor-pointer">
                    Buy Now!
                    </button>
                </div>
                </div>
                <div>
                    <Image src={radio} width={568} height={330} alt="image"/>
                </div>
            </div>
         </div>
    </section>
  )
}

export default RadioExprience
