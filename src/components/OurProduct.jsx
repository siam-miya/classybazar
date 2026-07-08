
import SectionHeading from './SectionHeading';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from './ProductCard';
import Button from './Button';
import Link from 'next/link';

const FlashSales = async () => {
  const res = await fetch("https://dummyjson.com/products")
  const data = await res.json()
  const productsData = data.products
  console.log(productsData)

  return (
    <section>
      <div className="container border-b">
        <div className='mt-25 mb-15'>
          <div className="flex items-end justify-between mb-6">
            <SectionHeading subHeading={"Our Products"} heading={"Explore Our Products"} countDown={false} />
          </div>
          <div className='mt-10 mb-13 grid grid-cols-4 gap-8'>
            {productsData.slice(8, 16).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className='text-center'>
            <Button TagName={Link} href={"/products"}>View All Products</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSales;