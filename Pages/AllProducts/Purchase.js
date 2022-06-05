import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const Purchase = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [product, setProduct] = useState({});

  const {
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const url = `https://pure-spire-28994.herokuapp.com/product/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleBooking = (event) => {
    event.preventDefault();
    const quantity = event.target.quantity.value;
    const totalPrice = product.price * quantity;
    console.log(totalPrice);
    const address = event.target.address.value;

    const booking = {
      productId: product._id,
      productName: product.name,
      totalPrice,
      quantity,
      address,
      user: user.email,
      clientName: user.displayName,
      phone: event.target.phone.value,
    };

    fetch("https://pure-spire-28994.herokuapp.com/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          toast.success("Your Order is Successfully Booking", {
            position: "top-center",
          });
        }
      });
  };

  return (
    <>
      <div class="card lg:card-side bg-base-100 shadow-xl lg:p-12">
        <div className="flex-row px-5">
          <img src={product.img} alt="" />

          <div>
            <h2 className="card-title">{product.name}</h2>
            <h2 className="text-xl">
              Brand:{" "}
              <div className="badge badge-secondary">{product.brand}</div>
            </h2>
            <h2 className="text-2xl text-red-500">
              Per Unite Price: ${product.price}
            </h2>
            <h3 className="text-xl text-green-500">
              Available Stock: {product.stock}
            </h3>
            <h3 className="text-xl text-blue-700">
              Please Minimum Order 50 Pics
            </h3>
          </div>
        </div>
        <div class="card-body">
          <form onSubmit={handleBooking}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                value={user?.email || ""}
                className="input input-bordered w-full max-w-xs"
              />
              <input
                type="text"
                name="name"
                value={user?.displayName || ""}
                className="input input-bordered w-full max-w-xs"
              />
              <input
                type="number"
                name="price"
                value={product.price}
                className="input input-bordered w-full max-w-xs"
              />
              <input
                type="text"
                name="address"
                placeholder="Your Address"
                className="input input-bordered w-full max-w-xs"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="input input-bordered w-full max-w-xs"
                required
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                className="input input-bordered w-full max-w-xs mb-0"
                {...register("quantity", {
                  required: {
                    value: true,
                    message: "Quantity is Required",
                  },
                  minLength: {
                    value: 3,
                    message: "Must be 100 Pice Order",
                  },
                })}
              />

              <label className="label">
                {errors.quantity?.type === "required" && (
                  <span className="label-text-alt text-red-500 mt-0">
                    {errors.quantity.message}
                  </span>
                )}
                {errors.quantity?.type === "minLength" && (
                  <span className="label-text-alt text-red-500 mt-0">
                    {errors.quantity.message}
                  </span>
                )}
              </label>
            </div>
            <div className="lg:flex justify-center items-center">
              <input
                type="submit"
                value="submit"
                className="btn btn-#3A4256 w-full max-w-xs"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Purchase;
