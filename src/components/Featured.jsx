import NewArrivalsProducts from "./NewArrivalsProducts"
import SectionHeading from "./SectionHeading"


const Featured = () => {
  return (
    <section className="mt-15">
        <div className="container">
          <div className="flex items-center justify-center">
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
