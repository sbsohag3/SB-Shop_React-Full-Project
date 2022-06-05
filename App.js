import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import AddProduct from "./Pages/Dashboard/AdminPage/AddProduct";
import MakeAdmin from "./Pages/Dashboard/AdminPage/MakeAdmin/MakeAdmin";
import ManageAllOrders from "./Pages/Dashboard/AdminPage/ManageAllOrders";
import ManageProducts from "./Pages/Dashboard/AdminPage/ManageProducts";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MyProfile from "./Pages/Dashboard/MyProfile";
import MyOrder from "./Pages/Dashboard/UserPage/MyOrder";
import MyReview from "./Pages/Dashboard/UserPage/MyReview";
import Payment from "./Pages/Dashboard/UserPage/Payment";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login/Login";
import RequireAdmin from "./Pages/Login/RequireAdmin";
import RequireAuth from "./Pages/Login/RequireAuth";
import SignUp from "./Pages/Login/SignUp/SignUp";
import Reviews from "./Pages/Reviews/Reviews";
import Blog from "./Pages/Shared/Blog";
import Footer from "./Pages/Shared/Footer";
import Navbar from "./Pages/Shared/Navbar";
import AllProducts from "./Pages/AllProducts/AllProducts";
import Purchase from "./Pages/AllProducts/Purchase";
import NotFound from "./Pages/Shared/NotFound";
import About from "./Pages/Shared/About";
import MyPortfolio from "./Pages/MyPortfolio/MyPortfolio";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/about" element={<About />} />
        <Route path="/myPortfolio" element={<MyPortfolio />} />

        <Route
          path="/purchase/:id"
          element={
            <RequireAuth>
              <Purchase />
            </RequireAuth>
          }
        />

        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<MyProfile />} />
          <Route path="myOrders" element={<MyOrder />} />
          <Route path="payment/:id" element={<Payment />} />
          <Route path="addReviews" element={<MyReview />} />
          <Route
            path="makeAdmin"
            element={
              <RequireAdmin>
                <MakeAdmin />
              </RequireAdmin>
            }
          />
          <Route
            path="all-orders"
            element={
              <RequireAdmin>
                <ManageAllOrders />
              </RequireAdmin>
            }
          />
          <Route
            path="add-products"
            element={
              <RequireAdmin>
                <AddProduct />
              </RequireAdmin>
            }
          />
          <Route
            path="manageProducts"
            element={
              <RequireAdmin>
                <ManageProducts />
              </RequireAdmin>
            }
          />
        </Route>
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
