import React from "react";

function sideNavbar({ open, Children }) {
  return (
    <>
      <div
        className={`z-30 bg-white shadow-2xl shadow-black h-screen w-fit px-4 fixed top-0 transition-all duration-300 
        ${open ? "left-0" : "-left-96"}`}>
        {Children}
      </div>
    </>
  );
}

export default sideNavbar;
