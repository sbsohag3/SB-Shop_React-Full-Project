import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";

const BookingModal = ({ booking, setBooking }) => {
  const { _id, name, price } = booking;

  const [user] = useAuthState(auth);

  const {
    register,
    formState: { errors },
  } = useForm();

  const handleBooking = (event) => {
    event.preventDefault();
    const quantity = event.target.quantity.value;
    const totalPrice = price * quantity;
    console.log(totalPrice);
    const address = event.target.address.value;

    const booking = {
      productId: _id,
      productName: name,
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
        setBooking(null);
      });
  };

  return (
    <div className="flex mt-4 justify-center items-center my-12">
      <div className="card w-100 bg-base-100 shadow-xl">
        <div className="card-body bg-slate-100">
          <h3 className="font-bold text-xl text-info">{name}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 justify-items-center mt-3"
          >
            <input
              type="email"
              name="email"
              value={user?.email || ""}
              disabled
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              name="name"
              value={user?.displayName || ""}
              disabled
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="number"
              name="price"
              disabled
              value={price}
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

            <input
              type="submit"
              value="submit"
              className="btn btn-#3A4256 w-full max-w-xs"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
