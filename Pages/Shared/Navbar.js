import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useLocation } from "react-router-dom";
import auth from "../../firebase.init";
import userph from "../../asserts/images/user.png";
import logo from "../../asserts/images/logos.png";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const { pathname } = useLocation();

  const logout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };

  const menuItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/products">Products</NavLink>
      </li>
      <li>
        <NavLink to="/reviews">Reviews</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>

      {user && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/blogs">Blogs</NavLink>
      </li>
      <li>
        <NavLink to="/myPortfolio">My_Portfolio</NavLink>
      </li>
      <li>
        {user ? (
          <button onClick={logout} className="btn btn-ghost capitalize">
            Sign Out
          </button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </li>

      {user && (
        <li className="mx-2">
          <div className="avatar">
            <div className="w-6 rounded-full">
              <img src={user?.photoURL || userph} alt="" />
            </div>
          </div>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-200 lg:px-12">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 gap-x-3"
          >
            {menuItems}
          </ul>
        </div>
        <div className="avatar">
          <div className="w-20 rounded-full">
            <img src={logo} alt="" />
          </div>
        </div>
        <NavLink to="/" className="btn btn-ghost italic normal-case text-3xl">
          Shop
        </NavLink>
      </div>
      {pathname.includes("dashboard") && (
        <div className="navbar-end">
          <label
            tabIndex="1"
            htmlFor="dashboard-sidebar"
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </label>
        </div>
      )}
      <div className="navbar-end hidden lg:flex ">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>
    </div>
  );
};

export default Navbar;
