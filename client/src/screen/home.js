import React, { useState, useEffect } from "react";
import Navbar from "../component/design/navbar";
import SideNavbar from "../component/design/sideNavbar";
function Home() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="flex flex-col w-full h-auto">
        <div>
          <SideNavbar open={open} />
        </div>
        <Navbar OnOpen={() => setOpen(!open)} />
        <div className="h-screen w-full" onClick={() => setOpen(false)}></div>
      </section>
    </>
  );
}

export default Home;
