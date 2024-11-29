import React, { useEffect, useState } from "react";
import SideNavUser from "../../component/design/SideNavUser";
import Navbar from "../../component/design/navbar";
import ProductsIcon from "../../component/icon/ProductsIcon";
import { Link } from "react-router-dom";
import ItemCard from "../../component/design/ItemCard";
import axios from "axios";

function ListItem() {
  const [items, setItems] = useState([]);

  const [error, seError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const item = (await axios.get("/api/items/getAllItem")).data;
        console.log(item);
        setItems(item);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        seError(error.message);
      }
    };
    fetchItems();
  }, []);

  return (
    <>
      <section className="flex flex-col w-full h-auto">
        <div>
          <SideNavUser open={open} onClose={() => setOpen(false)} />
        </div>
        <Navbar OnOpen={() => setOpen(!open)} />
        <div
          className="flex bg-anotherGrey flex-col items-center h-screen w-full "
          onClick={() => setOpen(false)}>
          <div className="flex flex-col items-center w-full h-auto pt-10 pb-10  mt-16 ">
            <h1 className="w-[95%] text-start text-xl font-bold font-montserrat">
              {" "}
              List Product
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 p-4 w-full h-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-110">
                  <ItemCard item={item} />
                </div>
              ))}

              <Link to={"/addItem"}>
                <button className="flex fixed items-center justify-center bg-slate-700 p-4 rounded-full right-4 bottom-4 hover:bg-myGold transition-all duration-200 text-white shadow-md">
                  <ProductsIcon />
                  <h1 className="ml-2 font-montserrat text-base font-semibold">
                    Add Products
                  </h1>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ListItem;
