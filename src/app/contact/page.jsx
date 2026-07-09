import ContactFormSection from "@/components/ContacFormSection";
import Link from "next/link";
import { BiSolidRightArrow } from "react-icons/bi";

export const metadata = {
  title: "Contact || ClassyBazar",
  description: "classyBazar contact page",
    icons: {
    icon: "/favContact.png", 
  },
};
const Contact = () => {
  return (
   <section>
    <div className="container">
      <div>
         <div className="flex items-center gap-2 pt-8 text-sm mb-12">
        <Link href="/" className="text-gray-600 hover:text-black transition-all font-medium">
          Home
        </Link>
        <BiSolidRightArrow className="text-[10px] text-gray-400" />
        <p className="text-blue-500 font-semibold">Contact Us</p>
      </div>
      <div>
        <ContactFormSection/>
      </div>
      </div>
    </div>
   </section>
  )
}

export default Contact

