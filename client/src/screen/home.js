import React, { useState, useEffect } from "react";
import Navbar from "../component/design/navbar";
import SideNavUser from "../component/design/SideNavUser";

function Home() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="flex flex-col w-full h-auto">
        <div>
          <SideNavUser open={open} onClose={() => setOpen(false)} />
        </div>
        <Navbar OnOpen={() => setOpen(!open)} />

        <div className="h-screen w-full" onClick={() => setOpen(false)}></div>
      </section>
    </>
  );
}

export default Home;
