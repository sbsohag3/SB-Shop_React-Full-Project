import React, { useEffect, useState } from "react";

const ManageAllOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("https://pure-spire-28994.herokuapp.com/bookings")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{o.user}</td>
                <td>{o.productName}</td>
                <td>{o.quantity}</td>
                <td>{o.totalPrice}</td>
                <td>
                  <button className="btn btn-xs btn-success">Shipping</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAllOrders;
