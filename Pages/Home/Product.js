import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product, setBooking, booking }) => {
  const {_id, img, name, price, descriptions, stock, brand } = product;

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={img} alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <h2 className="text-xl">
          Brand: <div className="badge badge-secondary">{brand}</div>
        </h2>
        <h2 className="text-2xl text-red-500">Price: ${price}</h2>
        <h3 className="text-xl text-green-500">Available Stock: {stock}</h3>
        <p>{descriptions}</p>
        <div className="card-actions justify-end">
          <Link to={`/purchase/${_id}`} className="btn btn-primary">
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
