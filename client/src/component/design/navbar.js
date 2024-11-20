import React from "react";
import HamburgerMenu from "../icon/hamburgerMenu";
import Logo from "./logo";
import Bag from "../icon/Bag";
import Search from "../icon/Search";

function Navbar() {
  return (
    <>
      <div className="relative flex h-screen">
        {/* Sidebar */}
        <div className="z-20 bg-white shadow-2xl shadow-black h-screen w-fit px-4 flex flex-col space-y-4">
          {/* Sidebar items */}
          <a href="#" className="py-2 px-4 text-gray-700 hover:bg-gray-200">
            Home
          </a>
          <a href="#" className="py-2 px-4 text-gray-700 hover:bg-gray-200">
            About
          </a>
          <a href="#" className="py-2 px-4 text-gray-700 hover:bg-gray-200">
            Services
          </a>
          <a href="#" className="py-2 px-4 text-gray-700 hover:bg-gray-200">
            Contact
          </a>
        </div>

        {/* Main Content */}
        <div className="relative flex flex-col w-full -z-30">
          {/* Top Navbar */}
          <div className="flex bg-myBlue w-full h-fit items-center justify-between">
            <HamburgerMenu />
            <div className="scale-75">
              <Logo />
            </div>
            <div className="flex scale-[60%] space-x-10">
              <Search />
              <Bag />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-4">
            {/* Your main content goes here */}
            <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
            <p className="mt-2 text-gray-600">
              This is your main content area.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
