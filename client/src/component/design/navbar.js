import React, { useState } from "react";
import HamburgerMenu from "../icon/hamburgerMenu";
import Logo from "./logo";
import Bag from "../icon/Bag";
import { Link } from "react-router-dom";
import UserIcon from "../icon/UserIcon";

function Navbar({ OnOpen }) {
  let user = null;
  let userId = null;
  try {
    const storedUser = localStorage.getItem("currentUser");
    user = storedUser ? JSON.parse(storedUser) : null;
    userId = user ? user._id : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
  }
  return (
    <div className="flex bg-myBlue w-full h-20 items-center fixed justify-between">
      <button className="z-20 flex items-center scale-90" onClick={OnOpen}>
        <HamburgerMenu />
      </button>

      <div className="scale-75">
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>

      <div className="flex scale-90 items-center space-x-6">
        <Link to={`/profile/${userId}`}>
          <UserIcon />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
