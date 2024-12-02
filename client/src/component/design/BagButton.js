import axios from "axios";
import React, { useState, useEffect } from "react";
import BagWhite from "../icon/BagWhite";
import { Link } from "react-router-dom";

function BagButton({ userId }) {
  const [cartItem, setCartItem] = useState([]);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/getUserCart", {
          userId: userId,
        });
        setCartItem(data.items);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching cart:", err);
      }
    };

    if (userId) {
      fetchCart();
    }
  }, [cartItem, userId]);

  return (
    <>
      <Link to={`/cart/${userId}`}>
        <button className="flex fixed items-center justify-center bg-slate-700 p-4 rounded-full right-4 bottom-4 hover:bg-myGold transition-all duration-200 text-white shadow-md">
          <h1 className="absolute h-5 w-5 flex items-center justify-center rounded-full bg-white text-black right-0 top-0">
            {cartItem ? cartItem.length : 0}
          </h1>
          <BagWhite />
        </button>
      </Link>
    </>
  );
}

export default BagButton;
