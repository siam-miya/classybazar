import ProductDetailsSection from "@/components/ProductDetailsSection";
import SectionHeading from "@/components/SectionHeading";
import SubBanner from "@/components/SubBanner";
import RelatedProductsSlider from "@/components/RelatedProductsSlider"; // নতুন স্লাইডার ইমপোর্ট

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
          <p className="text-black font-semibold mb-4">
            <span className="font-bold text-black">Product Name:</span> {findData.title}
          </p>
          <div className="mb-2">
            <ProductDetailsSection product={findData} />
          </div>
          
          {relatedProducts.length > 0 && (
            <div className="pb-10 w-full overflow-hidden">
              <div className="mb-4">
                <SectionHeading subHeading={"Related Item"} countDown={false}/>
              </div>

              <RelatedProductsSlider relatedProducts={relatedProducts} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;