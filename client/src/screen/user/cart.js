import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../component/design/navbar";
import SideNavUser from "../../component/design/SideNavUser";

function Cart() {
  const { userId } = useParams();
  const [cart, setCart] = useState();
  const [item, setItem] = useState([]);
  const [total, setTotal] = useState(0);
  const [pembayaran, setPembayaran] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId, item.quantity]); // `item.quantity` can cause extra renders; see the note below.

  const increaseItem = async (itemId) => {
    const cartId = cart._id;
    try {
      const update = await axios.put("/api/cart/increaseItem", {
        cartID: cartId,
        itemID: itemId,
      });
      console.log(update);
      // Re-fetch the cart after updating the item quantity
      fetchCart();
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  const decreaseItem = async (itemId) => {
    const cartId = cart._id;
    try {
      const update = await axios.put("/api/cart/decreaseItem", {
        cartId: cartId,
        itemId: itemId,
      });
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      item.forEach((item) => {
        total += item.itemID.price * item.quantity;
      });
      setTotal(total);
    };
    calculateTotal();
  }, [item]);

  return (
    <>
      <section className="flex flex-col w-full h-auto">
        <div>
          <SideNavUser open={open} onClose={() => setOpen(false)} />
        </div>
        <Navbar OnOpen={() => setOpen(!open)} />

        <div
          className="h-screen w-full flex justify-center  items-center bg-anotherGrey "
          onClick={() => setOpen(false)}>
          <div className="flex flex-col justify-start w-2/3 items-start space-y-4 max-h-[60vh] p-4 overflow-y-scroll scrollbar-thin">
            <h1 className="font-montserrat text-base font-medium">Your Cart</h1>
            {cart &&
              item &&
              item.map((item) => {
                return (
                  <div
                    key={item.itemID._id}
                    className="flex items-center space-x-4 bg-white p-2 w-full">
                    <img src={item.itemID.image} className="w-20 h-20 " />
                    <div className="flex flex-col">
                      <h2>{item.itemID.name.toUpperCase()}</h2>
                      <p>Price: {item.itemID.price}</p>
                    </div>

                    <button onClick={() => decreaseItem(item.itemID._id)}>
                      {" "}
                      -{" "}
                    </button>
                    <p>Quantity: {item.quantity}</p>
                    <button onClick={() => increaseItem(item.itemID._id)}>
                      {" "}
                      +{" "}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
