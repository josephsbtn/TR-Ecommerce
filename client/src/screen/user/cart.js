import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Cart() {
  const userId = useParams();
  const [cart, setCart] = useState();
  const [item, setItem] = useState([]);
  const [total, setTotal] = useState(0);
  const [pembayaran, setPembayaran] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const data = (
          await axios.get("/api/cart/getUserCart", {
            userId: userId,
          })
        ).data;
        setCart(data);
        setItem(data.items);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const increaseItem = async (itemId) => {
    const cartId = cart._id;
    try {
      const update = await axios.put("/api/cart/increaseItem", {
        cartId: cartId,
        itemId: itemId,
      });
      console.log(update);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      {item.map((item) => {
        <div key={item.itemID}>
          <h2>{item.itemName}</h2>
          <p>Price: {item.price}</p>
          <button> - </button>
          <p>Quantity: {item.quantity}</p>
          <button> + </button>
        </div>;
      })}
    </>
  );
}

export default Cart;
