import ProductDetailsSection from "@/components/ProductDetailsSection";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import ProductCard from "@/components/ProductCard"; 
import { BiSolidRightArrow } from "react-icons/bi";

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
      <div className="container mx-auto px-4">
        <div>
          <div className="flex items-center gap-2 pt-15 text-sm mb-6">
            <Link href={"/"} className="text-gray-600 hover:text-black transition-all font-medium">
              Home
            </Link>
            <BiSolidRightArrow className="text-[10px] text-gray-400" />
            <Link href={"/products"} className="text-gray-600 hover:text-black transition-all font-medium">
              Products
            </Link> 
            <BiSolidRightArrow className="text-[10px] text-gray-400" />
            <p className="text-black font-semibold truncate max-w-[200px]">
              {findData.title}
            </p>
          </div>
          <div className="mb-10">
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