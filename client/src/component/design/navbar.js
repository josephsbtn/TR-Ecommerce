import React, { useState } from "react";
import HamburgerMenu from "../icon/hamburgerMenu";
import Logo from "./logo";
import Bag from "../icon/Bag";
import Search from "../icon/Search";
import { Link } from "react-router-dom";

function Navbar({ OnOpen }) {
  let user = null;
  try {
    const storedUser = localStorage.getItem("currentUser");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
  }
  return (
    <div className="flex bg-myBlue w-full h-16 items-center fixed justify-between">
      <button className="z-20 flex items-center scale-90" onClick={OnOpen}>
        <HamburgerMenu />
      </button>

      <div className="scale-75">
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>

      <div className="flex scale-75 items-center space-x-6">
        <Search />
        {user ? (
          !user.isAdmin ? (
            <>
              <Bag />
            </>
          ) : null
        ) : null}
      </div>
    </div>
  );
}

export default Navbar;
