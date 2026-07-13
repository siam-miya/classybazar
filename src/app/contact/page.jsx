import ContactFormSection from "@/components/ContacFormSection";
import SubBanner from "@/components/SubBanner";
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
      <div>
        <SubBanner title={"Contact"} pageName={"Contact"} />
      </div>
      <div className="container">
        <div>
          <ContactFormSection />
        </div>
      </div>
    </section>
  )
}

export default Contact

