import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Cart() {
  const { userId } = useParams();
  const [cart, setCart] = useState();
  const [item, setItem] = useState([]);
  const [total, setTotal] = useState(0);
  const [pembayaran, setPembayaran] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/getUserCart", {
          userId: userId,
        });
        setCart(data);
        setItem(data.items);
        console.log("Cart:", data);
        console.log("Item:", data.items);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching cart:", err);
      }
    };

    if (userId) {
      fetchCart();
    }
  }, [userId, item.quantity]);

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
      <h1>Your Cart</h1>
      {cart &&
        item &&
        item.map((item) => {
          return (
            <div key={item.itemID._id}>
              <h2>{item.itemID.name}</h2>
              <p>Price: {item.itemID.price}</p>
              <button onClick={() => increaseItem(item.itemID._id)}> - </button>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => increaseItem(item.itemID._id)}> + </button>
            </div>
          );
        })}
    </>
  );
}

export default Cart;
