import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { BiSolidRightArrow } from "react-icons/bi";

const ProductsPage = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const selectedCategory = resolvedSearchParams.category || "all";

  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  const productsData = data.products;
  const uniqueCategories = ["all", ...new Set(productsData.map((item) => item.category))];
  const filteredProducts = selectedCategory === "all"
    ? productsData
    : productsData.filter((product) => product.category === selectedCategory);

  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 pt-16 pb-10">
          <Link href={"/"} className="text-black-700 hover:text-blue-700 transition-all font-bold">
            Home
          </Link>
          <BiSolidRightArrow className="text-xs text-gray-400" />
          <Link href={"/products"} className="text-blue-700 hover:text-black font-semibold">
            Products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 pb-26 items-start"> 
          <div className="border-r border-gray-100 pr-4 md:sticky md:top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
            <h2 className="font-bold leading-5 text-black mb-4">Shop by Category</h2>
            <ul className="flex flex-row md:flex-col flex-wrap gap-2 text-sm">
              {uniqueCategories.map((category) => (
                <li key={category} className="w-full">
                  <Link
                    href={category === "all" ? "/products" : `/products?category=${category}`}
                    className={`capitalize block w-full text-left px-3 py-1.5 rounded-lg transition-all ${
                      selectedCategory === category
                        ? "bg-[#DB4444] text-white font-semibold"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {category === "all" ? "All Products" : category.replace("-", " ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product}/>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500 py-10">
                  No products found in this category.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;