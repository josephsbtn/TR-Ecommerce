import React, { useEffect, useState } from "react";
import SideNavUser from "../../component/design/SideNavUser";
import Navbar from "../../component/design/navbar";
import { Link, useParams } from "react-router-dom";
import ItemCard from "../../component/design/ItemCard";
import axios from "axios";
import BagWhite from "../../component/icon/BagWhite";
import BagButton from "../../component/design/BagButton";

function ListProducts() {
  const { userId } = useParams(); // Destructure userId from useParams
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/items/getAllItem");
        setItems(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
        console.error("Error fetching items:", err);
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/categories/getallcategories");
        setCategories(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching categories:", err);
      }
    };

    fetchItems();
    fetchCategories();
  }, [userId]);

  const filteredItems = filter
    ? items.filter((item) => item.category === filter)
    : items;

  return (
    <>
      <section className="flex flex-col w-full h-auto">
        <div>
          <SideNavUser open={open} onClose={() => setOpen(false)} />
        </div>
        <Navbar OnOpen={() => setOpen(!open)} />
        <div
          className="flex bg-white flex-col items-center h-screen w-full"
          onClick={() => setOpen(false)}>
          <div className="flex flex-col items-center w-full h-auto pt-10 pb-10 mt-16">
            <h1 className="w-[95%] text-start text-xl font-bold font-montserrat">
              List Product
            </h1>

            {/* Category Filter Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 p-4 w-full h-auto">
              <button
                className={`h-fit w-auto p-2 rounded-3xl border ${
                  filter === ""
                    ? "bg-myBlue text-white"
                    : "bg-white text-myGold"
                } border-myBlue`}
                onClick={() => setFilter("")}>
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
                  onClick={() => setFilter(category._id)}>
                  <h1 className="font-montserrat font-medium text-center">
                    {category.name}
                  </h1>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 p-4 w-full h-auto">
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="border-2 border-borderGrey rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-110">
                  <ItemCard item={item} />
                </div>
              ))}

              <BagButton userId={userId} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ListProducts;
