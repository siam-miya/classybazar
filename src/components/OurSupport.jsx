
import Image from "next/image"
import img_1 from "../assets/icons/support_1.png"
import img_2 from "../assets/icons/support_2.png"
import img_3 from "../assets/icons/support_3.png"
const OurSupport = () => {
    const supportData = [
        {
            icon: img_1,
            text: "FREE AND FAST DELIVERY",
            description: "Free delivery for all orders over $140"
        },
        {
            icon: img_2,
            text: "24/7 CUSTOMER SERVICE",
            description: "Friendly 24/7 customer support"
        },
        {
            icon: img_3,
            text: "MONEY BACK GUARANTEE",
            description: "We reurn money within 30 days"
        }
    ]
    return (
        <section className="mt-[20px] mb-[10px]">
            <div className="container">
                <div>
                    <div className="grid grid-cols-3 pt-10 pb-14">
                        {
                            supportData.map((support, index) => {
                                return <div key={index}>
                                    <div>
                                        <Image src={support.icon} width={90} height={90} alt="icon" className="bg-black rounded-full p-5 border-10 border-gray-300 mx-auto" />
                                    </div>
                                    <div className="text-center">
                                        <h2 className="font-semibold font-poppins text-[20px] leading-7 text-black pt-6 pb-2">{support.text}</h2>
                                        <p className="text-[14px] leading-5 font-poppins">{support.description}</p>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurSupport
