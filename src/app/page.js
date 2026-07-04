import Banner from "@/components/Banner";
import BestSelling from "@/components/BestSelling";
import Category from "@/components/Category";
import Featured from "@/components/Featured";
import FlashSales from "@/components/FlashSales";
import OurProduct from "@/components/OurProduct";
import OurSupport from "@/components/OurSupport";
import RadioExprience from "@/components/RadioExprience";

export const metadata = {
  title: "Home || ClassyBazar",
  description: "classyBazar home page",
    icons: {
    icon: "/favHome.png", 
  },
};

export default function Home() {
  return (
 <>
 <Banner/>
 <FlashSales/>
 <Category/>
 <BestSelling/>
 <RadioExprience/>
 <OurProduct/>
 <Featured/>
 <OurSupport/>
 </>
  );
}
