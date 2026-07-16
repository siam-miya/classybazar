import NewArrivalsProducts from "./NewArrivalsProducts"
import SectionHeading from "./SectionHeading"

const Featured = () => {
  return (
    // মোবাইলে mt-8 এবং বড় স্ক্রিনে mt-16/20 করা হয়েছে স্পেসিং সুন্দর রাখতে
    <section className="mt-10 md:mt-20 w-full">
      <div className="container mx-auto px-4 md:px-0">
        {/* হেডিং মোবাইলে বামে এবং ডেস্কটপে মাঝখানে বা বামে সুন্দরভাবে পজিশন করার জন্য */}
        <div className="flex items-center justify-start md:justify-start mb-6 md:mb-10">
          <SectionHeading subHeading={"Featured"} heading={"New Arrival"} countDown={false}/>
        </div>
        <div>
          <NewArrivalsProducts/>
        </div>
      </div>
    </section>
  )
}

export default Featured