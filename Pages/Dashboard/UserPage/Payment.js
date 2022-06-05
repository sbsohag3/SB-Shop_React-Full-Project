import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../../Shared/Loading";
import CheckOutFrom from "./CheckOutFrom";

const stripePromise = loadStripe(
  "pk_test_51L0WL8Bg1HWi2R2NsVMby3L9NHn423JHSk14m3VqpwuAYHqEmaxscyWTMVlO2te6hk79ISTURxWmCsvXDTC3rUZ400mghRWp8N"
);

const Payment = () => {
  const { id } = useParams();

  const url = `https://pure-spire-28994.herokuapp.com/booking/${id}`;
  const { data: order, isLoading } = useQuery(["booking", id], () =>
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="grid justify-center items-center">
      <div className="card w-50 max-w-md bg-base-200 shadow-xl my-12">
        <div className="card-body">
          <p className="text-success text-2xl font-bold">
            Hello, {order.clientName}
          </p>
          <h2 className="card-title">
            Please Pay for: <br /> {order.productName}
          </h2>
          <p className="text-blue text-blue-600 font-bold">
            Your Order Quantity: {order.quantity}
          </p>
          <p className="text-orange-700">Please pay: ${order.totalPrice}</p>
        </div>
      </div>
      <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-200">
        <div className="card-body">
          <Elements stripe={stripePromise}>
            <CheckOutFrom order={order} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
