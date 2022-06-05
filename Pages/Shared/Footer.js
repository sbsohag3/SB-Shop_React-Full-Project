import React from "react";
import { Link } from "react-router-dom";
import logo from "../../asserts/images/logo.png";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <>
      <footer className="footer grid mt-5 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-12 bg-black text-white">
        <div>
          <div className="avatar">
            <div className="w-20 rounded-full">
              <img src={logo} alt="" />
            </div>
          </div>
          <p>
            SB Shop Ltd.
            <br />
           
              <small>
                Copyright SB Shop &copy; {year} All Rights Reserved
              </small>
           
          </p>
        </div>
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Desktop</a>
          <a className="link link-hover">Laptop</a>
          <a className="link link-hover">Monitor</a>
          <a className="link link-hover">Softwares</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <Link to={"/about"} className="link link-hover">
            About us
          </Link>
          <Link to={"/contact"} className="link link-hover">
            Contact
          </Link>
          <Link to={"/"} className="link link-hover">
            Online Delivery
          </Link>
          <Link to={"/"} className="link link-hover">
            Refund and Return
          </Link>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
