import React, { useEffect, useState } from "react";
import SideNavUser from "../../component/design/SideNavUser";
import Navbar from "../../component/design/navbar";
import ProductsIcon from "../../component/icon/ProductsIcon";
import { Link } from "react-router-dom";

function ListItem() {
  const [items, setItems] = useState([]);

  const [error, seError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="flex flex-col w-full h-auto">
        <div>
          <SideNavUser open={open} onClose={() => setOpen(false)} />
        </div>
        <Navbar OnOpen={() => setOpen(!open)} />
        <div className="h-screen w-full" onClick={() => setOpen(false)}>
          <div className="flex flex-col w-full items-center mt-16 h-screen bg-anotherGrey">
            {/*CARD ITEM*/}
            <div className="bg-red-800 w-96 h-56 flex flex-col mt-2 ">
              <img
                src="https://placehold.co/200x100"
                className="w-96 h-44 mt-4"
              />
              <h1>ITEM NAME</h1>
            </div>

            <Link to={"/addItem"}>
              <button className="flex fixed items-center justify-center bg-slate-700 p-4 rounded-2xl right-4 bottom-4 hover:bg-myGold transition-all duration-200 text-white space-x-4">
                <ProductsIcon />
                <h1 className="font-montserrat text-base font-semibold ">
                  Add Products
                </h1>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ListItem;
