import AboutDetailsSection from "@/components/AboutDetailsSection";
import OurSupport from "@/components/OurSupport";
import SubBanner from "@/components/SubBanner";
import Link from "next/link";
import { BiSolidRightArrow } from "react-icons/bi";

export const metadata = {
  title: "About || ClassyBazar",
  description: "classyBazar about page",
    icons: {
    icon: "/favAbout.svg", 
  },
};
const About = () => {
  return (
   <section>
    <div className="container">
      <div>
          {/* <div className="flex items-center gap-2 pt-15 text-sm mb-6">
            <Link href={"/"} className="text-gray-600 hover:text-black transition-all font-medium">
              Home
            </Link>
            <BiSolidRightArrow className="text-[10px] text-gray-400" />
            <Link href={"/about"} className="text-gray-600 hover:text-black transition-all font-medium">
              About
            </Link>        
          </div> */}
          <SubBanner title={"About"} pageName={"About"}/>
          <div>
            <AboutDetailsSection/>
          </div>
          <div>
            <OurSupport/>
          </div>
      </div>
    </div>
   </section>
  )
}

export default About
