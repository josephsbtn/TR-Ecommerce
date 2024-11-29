import React, { useEffect, useState } from "react";
import SideNavUser from "../../component/design/SideNavUser";
import Navbar from "../../component/design/navbar";
import ProductsIcon from "../../component/icon/ProductsIcon";
import { Link } from "react-router-dom";
import ItemCard from "../../component/design/ItemCard";
import axios from "axios";

function ListItem() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setfilter] = useState("");

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

    const fetchCat = async () => {
      try {
        const cat = (await axios.get("/api/categories/getallcategories")).data;
        setCategories(cat);
        console.log("categories", cat);
      } catch (error) {
        console.error(error);
        seError(error.message);
      }
    };
    fetchCat();
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
          className="flex bg-white flex-col items-center h-screen w-full "
          onClick={() => setOpen(false)}>
          <div className="flex flex-col items-center w-full h-auto pt-10 pb-10  mt-16 ">
            <h1 className="w-[95%] text-start text-xl font-bold font-montserrat">
              {" "}
              List Product
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 p-4 w-full h-auto">
              <button
                className={`h-fit w-auto p-2 rounded-3xl border ${
                  filter === ""
                    ? "bg-myBlue text-white"
                    : "bg-white text-myGold"
                } border-myBlue`}
                onClick={() => setfilter("")}>
                <h1 className="font-montserrat font-medium text-center">All</h1>
              </button>

              {categories.map((category) => (
                <button
                  className={`h-fit w-auto p-2 rounded-3xl border ${
                    filter === category._id
                      ? "bg-myBlue text-white"
                      : "bg-white text-myGold"
                  } border-myBlue`}
                  key={category._id}
                  onClick={() => setfilter(category._id)}>
                  <h1 className="text-myGold font-montserrat font-medium text-center">
                    {category.name}
                  </h1>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 p-4 w-full h-auto">
              {filter
                ? items
                    .filter((item) => item.category === filter)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="border-2 border-borderGrey   rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-110">
                        <ItemCard item={item} />
                      </div>
                    ))
                : items.map((item) => (
                    <div
                      key={item.id}
                      className=" border-2 border-borderGrey  rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-110">
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
