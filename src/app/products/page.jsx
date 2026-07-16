import ProductCard from "@/components/ProductCard";
import ProductToolbar from "@/components/ProductToolbar";
import SubBanner from "@/components/SubBanner";
import Pagination from "@/components/Pagination"; 

const ProductsPage = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const selectedCategory = resolvedSearchParams.category || "all";
  const sortBy = resolvedSearchParams.sort || "default";
  const limit = parseInt(resolvedSearchParams.limit || "16", 10);
  const currentPage = parseInt(resolvedSearchParams.page || "1", 10);
  const minPrice = parseInt(resolvedSearchParams.minPrice || "0", 10);
  const maxPrice = parseInt(resolvedSearchParams.maxPrice || "999999", 10);

  const view = resolvedSearchParams.view || "4";
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  let productsData = data.products;

  // category filter
  let filteredProducts = selectedCategory === "all"
    ? productsData
    : productsData.filter((product) => product.category === selectedCategory);

  // 2. Price Range Filter
  filteredProducts = filteredProducts.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );

  // 3. Dynamic Sorting Logic 
  if (sortBy === "low-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "high-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "popularity") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "latest") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.id - a.id);
  }

  const totalResults = filteredProducts.length;
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);
  const currentShowing = displayedProducts.length;

  return (
    <section>
      <div>
        <SubBanner title={"All Products"} pageName={"Products"} />
      </div>
      <div className="container pt-10">
        <div className="pb-26">
          <ProductToolbar totalProducts={totalResults} currentShowing={currentShowing} />
          <div 
            className={`grid grid-cols-2 gap-3 md:gap-3 justify-items-center w-full ${
              view === "5" 
                ? "md:grid-cols-4 lg:grid-cols-5" 
                : "md:grid-cols-3 lg:grid-cols-4"
            }`}
          >
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <div key={product.id} className="w-full flex justify-center">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <p className="w-full text-center py-20 flex items-center justify-center mt-9 text-black ml-250 text-4xl">
                Product Not Found
              </p>
            )}
          </div>

          {/* Pagination Component */}
          <Pagination 
            totalProducts={totalResults} 
            limit={limit} 
            currentPage={currentPage} 
          />
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;