import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";

const MyOrder = () => {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://pure-spire-28994.herokuapp.com/booking?user=${user.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
          navigate("/");
        }
        return res.json();
      })
      .then((data) => setOrders(data));
  }, [user, navigate]);

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      const url = `https://pure-spire-28994.herokuapp.com/booking/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const remaining = orders.filter((product) => product._id !== id);
          setOrders(remaining);
        });
    }
  };
  return (
    <div className="m-10">
      <h1 className="text-center text-xl mb-4">My Orders: {orders.length}</h1>

      <div className="overflow-x-auto">
        <table className="table w-full text-center">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Payment</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{o.clientName}</td>
                <td>{o.user}</td>
                <td> {o.quantity}</td>
                <td>{o.totalPrice}</td>
                <td>
                  <button
                    onClick={() => handleDelete(o._id)}
                    className="btn btn-xs btn-error"
                  >
                    Cancel
                  </button>
                </td>
                <td>
                  {!o.paid && (
                    <Link to={`/dashboard/payment/${o._id}`}>
                      <button className="btn btn-xs btn-success">Pay</button>
                    </Link>
                  )}
                  {o.paid && (
                    <div>
                      <p>
                        <span className="text-success">Paid</span>
                      </p>
                      <p>
                        Transaction id: <br />
                        <small className="text-success">
                          {o.transactionId}
                        </small>
                      </p>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
