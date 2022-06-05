import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [admin]= useAdmin(user)
  return (
    <div className="drawer drawer-mobile">
      <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content ">
        <h1 className="text-3xl font-bold text-purple-500 text-center">
          Welcome to your Dashboard
        </h1>

        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-50 bg-base-100 text-base-content">
          <li>
            <Link to={"/dashboard"}>My Profile</Link>
          </li>
          {!admin && (
            <>
              <li>
                <NavLink to={"/dashboard/myOrders"}>My Orders</NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/addReviews"}>Add a Review</NavLink>
              </li>
            </>
          )}
          {admin && (
            <>
              <li>
                <NavLink to={"/dashboard/makeAdmin"}>Make Admin</NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/all-orders"}>All Orders</NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/add-products"}>Add Products</NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/manageProducts"}>
                  Manage Products
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
