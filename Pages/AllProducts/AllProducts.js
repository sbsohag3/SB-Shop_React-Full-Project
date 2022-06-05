import React, { useState } from "react";
import useProducts from "../../hooks/useProducts";
import Product from "../Home/Product";
import BookingModal from "./BookingModal";


const AllProducts = () => {
  const [products] = useProducts();
  const [booking, setBooking] = useState(null);
  return (
    <section className="my-12 lg:px-12">
      <div className="text-center">
        <h2 className="text-4xl text-info mb-5">Our All Products</h2>
        <hr />
      </div>

      <div className="grid mt-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-10">
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            setBooking={setBooking}
          ></Product>
        ))}
      </div>
      {booking && <BookingModal booking={booking} setBooking={setBooking} />}
    </section>
  );
};

export default AllProducts;
