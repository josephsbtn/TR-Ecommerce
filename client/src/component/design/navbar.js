import React, { useState } from "react";
import HamburgerMenu from "../icon/hamburgerMenu";
import Logo from "./logo";
import Bag from "../icon/Bag";
import Search from "../icon/Search";
import { Link } from "react-router-dom";

function Navbar({ OnOpen }) {
  return (
    <div className="flex bg-myBlue w-full h-16 items-center fixed justify-between px-4 py-2">
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
        <Bag />
      </div>
    </div>
  );
}

export default Navbar;
