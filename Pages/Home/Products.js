import useProducts from "../../hooks/useProducts";
import Product from "./Product";

const Products = () => {
  const [products] = useProducts();
  return (
    <section className="my-12 sm:min-w-max lg:px-12">
      <div className="text-center">
        <h2 className="text-4xl text-info mb-5">Our Products</h2>
        <hr />
      </div>

      <div className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-10">
        {products.slice(0, 3).map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
    </section>
  );
};

export default Products;
