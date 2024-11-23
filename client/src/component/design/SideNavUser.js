import React from "react";
import { Link } from "react-router-dom";
import HamburgerMenu from "../icon/hamburgerMenu";
import HomeIcon from "../icon/HomeIcon";
import ProductsIcon from "../icon/ProductsIcon";
import UserIcon from "../icon/UserIcon";
import MyOrderIcon from "../icon/MyOrderIcon";
import ExitIcon from "../icon/ExitIcon";
import AboutMeIcon from "../icon/AboutMeIcon";
import DashboardIcon from "../icon/DashboardIcon";

function SideNavUser({ open, onClose }) {
  let user = null;
  try {
    const storedUser = localStorage.getItem("currentUser");
    user = storedUser ? JSON.parse(storedUser) : null;

    console.log("user", user);
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  }

  return (
    <div
      className={`z-30 flex flex-col bg-myBlue items-start shadow-2xl shadow-black h-screen w-fit fixed top-0 transition-all duration-300 
      ${open ? "left-0" : "-left-96"}`}>
      <div
        className="flex w-full justify-start items-center p-2 mt-2 scale-90 cursor-pointer"
        onClick={onClose}>
        <HamburgerMenu />
      </div>

      {user == null ? (
        <>
          <Link to={"/"}>
            <div className="flex justify-start items-start w-60 space-x-4 p-4 hover:bg-myGold duration-150 transition-all">
              <HomeIcon className="scale-90" />
              <h1 className="text-sm text-white font-montserrat">Home</h1>
            </div>
          </Link>
          <Link to={"/Products"}>
            <div className="flex justify-start items-start w-60 space-x-4 p-4 hover:bg-myGold duration-150 transition-all">
              <ProductsIcon />
              <h1 className="text-sm text-white font-montserrat">Products</h1>
            </div>
          </Link>
          <Link to={"/About Us"}>
            <div className="flex justify-start items-center w-60 space-x-4 p-4 hover:bg-myGold duration-150 transition-all">
              <AboutMeIcon />
              <h1 className="text-sm text-white font-montserrat">About Us</h1>
            </div>
          </Link>
          <Link to={"/login"}>
            <div className="flex justify-start items-center w-60 space-x-4 p-4 hover:bg-myGold duration-150 transition-all">
              <UserIcon />
              <h1 className="text-sm text-white font-montserrat">Login</h1>
            </div>
          </Link>
        </>
      ) : user && user.isAdmin ? (
        <>
          <Link to={"/dashboard"}>
            <div className="flex justify-start items-center w-60 space-x-4 p-4 hover:bg-myGold duration-150 transition-all">
              <DashboardIcon />
              <h1 className="text-sm text-white font-montserrat">Dashboard</h1>
            </div>
          </Link>
          <Link to={"/listProducts"}>
            <div className="flex justify-start items-center w-60 space-x-4 p-4 hover:bg-myGold duration-150 transition-all">
              <ProductsIcon />
              <h1 className="text-sm text-white font-montserrat">
                List Product
              </h1>
            </div>
          </Link>
          <Link to={"/addItem"}>
            <div className="flex justify-start items-center w-60 space-x-4 p-4 hover:bg-myGold duration-150 transition-all">
              <MyOrderIcon />
              <h1 className="text-sm text-white font-montserrat">List Order</h1>
            </div>
          </Link>
          <div
            className="flex justify-start items-center w-60 space-x-4 p-4 hover:bg-red-800 duration-150 transition-all cursor-pointer"
            onClick={logout}>
            <ExitIcon />
            <h1 className="text-sm text-white font-montserrat">Log Out</h1>
          </div>
        </>
      ) : user && !user.isAdmin ? (
        <>
          <Link to={"/"}>
            <div className="flex justify-start items-center w-60 space-x-4 p-4 hover:bg-myGold duration-150 transition-all">
              <HomeIcon className="scale-90" />
              <h1 className="text-sm text-white font-montserrat">Home</h1>
            </div>
          </Link>
          <Link to={"/Products"}>
            <div className="flex justify-start items-center w-60 space-x-4 p-4 hover:bg-myGold duration-150 transition-all">
              <ProductsIcon />
              <h1 className="text-sm text-white font-montserrat">Products</h1>
            </div>
          </Link>
          <Link to={"/About Us"}>
            <div className="flex justify-start items-center w-60 space-x-4 p-4 hover:bg-myGold duration-150 transition-all">
              <MyOrderIcon />
              <h1 className="text-sm text-white font-montserrat">About Us</h1>
            </div>
          </Link>
          <Link to={"/login"}>
            <div className="flex justify-start items-center w-60 space-x-4 p-4 hover:bg-myGold duration-150 transition-all">
              <UserIcon />
              <h1 className="text-sm text-white font-montserrat">Login</h1>
            </div>
          </Link>
          <Link to={"/myOrders"}>
            <div className="flex justify-start items-center w-60 space-x-4 p-4 hover:bg-myGold duration-150 transition-all">
              <MyOrderIcon />
              <h1 className="text-sm text-white font-montserrat">My Orders</h1>
            </div>
          </Link>
          <Link to={"/myAccount"}>
            <div className="flex justify-start items-center w-60 space-x-4 p-4 hover:bg-myGold duration-150 transition-all">
              <UserIcon />
              <h1 className="text-sm text-white font-montserrat">My Account</h1>
            </div>
          </Link>
        </>
      ) : null}
    </div>
  );
}

export default SideNavUser;
