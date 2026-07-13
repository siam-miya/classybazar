import ProductDetailsSection from "@/components/ProductDetailsSection";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard"; 
import SubBanner from "@/components/SubBanner";

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  const productsData = data.products;
  const findData = productsData.find((item) => item.id == id);

  if (!findData) {
    return <div className="text-center py-20 font-bold">Product Not Found!</div>;
  }

  const relatedRes = await fetch(`https://dummyjson.com/products/category/${findData.category}`);
  const relatedData = await relatedRes.json();
  const relatedProducts = relatedData.products.filter((item) => item.id !== findData.id).slice(0, 10);

  return (
    <section>
      <div>
         <SubBanner title={"Product Details"} pageName={"Product Details"}/>
      </div>
      <div className="container">
        <div className="pt-2">
            <p className="text-black font-semibold">
              <span className="font-bold text-black">Product Name:</span> {findData.title}
            </p>
          <div className="mb-5">
            <ProductDetailsSection product={findData} />
          </div>
          {relatedProducts.length > 0 && (
            <div className="pb-10 w-full overflow-hidden">
              <div className="mb-6">
                <SectionHeading subHeading={"Related Item"} countDown={false}/>
              </div>
              <div 
                className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-thin scroll-smooth snap-x snap-mandatory pb-4"
                style={{
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none' 
                }}
              >
                <style>{`
                  div::-webkit-scrollbar {
                    display: none; /* Chrome, Safari ebong Opera-r scrollbar lukate */
                  }
                `}</style>

                {relatedProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] flex-shrink-0 snap-start"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;