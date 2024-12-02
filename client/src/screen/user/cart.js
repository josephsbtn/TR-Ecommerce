import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../component/design/navbar";
import SideNavUser from "../../component/design/SideNavUser";
import TrashBin from "../../component/icon/trashBin";

function Cart() {
  const { userId } = useParams();
  const [cart, setCart] = useState(null);
  const [item, setItem] = useState([]);
  const [total, setTotal] = useState(0);
  const [pembayaran, setPembayaran] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post("/api/cart/getUserCart", { userId });
      setCart(data);
      setItem(data.items);
      calculateTotal(data.items);
      console.log("Cart:", data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching cart.");
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateTotal = async () => {
    try {
      const { data } = await axios.put("/api/cart/setTotal", {
        cartID: cart._id,
        total: total,
      });
      setCart(data);
      console.log("Cart:", data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching cart.");
      console.error("Error fetching cart:", err);
    }
  };

  const calculateTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.itemID.price * item.quantity;
    });
    setTotal(total);
  };

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const increaseItem = async (itemId, quantity) => {
    try {
      await axios.put("/api/cart/increaseItem", {
        cartID: cart._id,
        itemID: itemId,
      });
      fetchCart();
    } catch (error) {
      setError(error.response?.data?.message || "Error increasing item.");
      console.error("Error increasing item:", error);
    }
  };

  const decreaseItem = async (itemId, quantity) => {
    try {
      await axios.put("/api/cart/decreaseItem", {
        cartID: cart._id,
        itemID: itemId,
      });

      if (quantity <= 1) {
        await axios.delete("/api/cart/deleteItem", {
          data: { cartID: cart._id, itemID: itemId },
        });
      }

      fetchCart();
    } catch (error) {
      setError(error.response?.data?.message || "Error decreasing item.");
      console.error("Error decreasing item:", error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete("/api/cart/deleteItem", {
        data: { cartID: cart._id, itemID: itemId },
      });
      fetchCart();
    } catch (error) {
      setError(error.response?.data?.message || "Error deleting item.");
      console.error("Error deleting item:", error);
    }
  };

  const Checkout = async () => {
    try {
      const res = (await axios.put("/api/cart/checkout", { cartID: cart._id }))
        .data;
      console.log(res);
      if (!res) {
        setError("Error checking out.");
        return;
      }

      await axios.post("/api/history/addHistory", {
        cartId: cart._id,
        PaymentMethod: pembayaran,
      });

      window.location.href = "/home";
    } catch (error) {
      setError(error.response?.data?.message || "Error checking out.");
      console.error("Error checking out:", error);
    }
  };
  if (loading) {
    return <div className="text-center">Loading your cart...</div>;
  }

  return (
    <>
      <section className="flex flex-col w-full h-auto">
        <div>
          <SideNavUser open={open} onClose={() => setOpen(false)} />
        </div>
        <Navbar OnOpen={() => setOpen(!open)} />
        <div
          className="h-screen w-full flex justify-center space-x-4 items-center bg-anotherGrey"
          onClick={() => setOpen(false)}>
          {error && (
            <div className="text-center text-red-500">
              <p>Error: {error}</p>
              <button onClick={fetchCart} className="text-blue-500 underline">
                Retry
              </button>
            </div>
          )}
          {cart ? (
            <>
              <div className="w-1/2 flex flex-col justify-center items-center pt-2 bg-white ">
                <h1 className="font-montserrat pl-8  text-base font-semibold w-full border-b border-gray-300">
                  Your Cart
                </h1>

                <div className="flex w-full flex-col justify-start bg-white items-start space-y-4 max-h-[60vh] p-4 overflow-y-scroll scrollbar-thin">
                  {item.length === 0 ? (
                    <p className="text-center w-full">Your cart is empty!</p>
                  ) : (
                    item.map((item) => (
                      <div
                        key={item.itemID._id}
                        className="flex justify-between items-center space-x-4  p-2 w-full">
                        <div className="flex space-x-4 items-center">
                          <img
                            src={item.itemID.image}
                            alt={item.itemID.name}
                            className="w-20 h-20"
                          />
                          <div className="flex flex-col">
                            <h2>{item.itemID.name.toUpperCase()}</h2>
                            <p className="font-montserrat text-base font-medium">
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(item.itemID.price)}
                            </p>
                          </div>
                        </div>

                        <div className="flex space-x-4 items-center">
                          <button
                            className="p-2 bg-red-700 scale-75 text-white rounded-md"
                            onClick={() => deleteItem(item.itemID._id)}>
                            <TrashBin />
                          </button>
                          <button
                            onClick={() =>
                              decreaseItem(item.itemID._id, item.quantity)
                            }
                            className="p-2 bg-red-500 text-white rounded-md">
                            -
                          </button>
                          <p className="p-2 px-6 rounded-lg border-borderGrey border-2">
                            {item.quantity}
                          </p>
                          <button
                            onClick={() =>
                              increaseItem(item.itemID._id, item.quantity)
                            }
                            className="p-2 bg-green-500 text-white rounded-md">
                            +
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="w-1/3 bg-white flex items-center justify-center p-2">
                <div className="w-full flex flex-col justify-center items-start space-x-4 space-y-8">
                  <h1 className="font-montserrat pl-4 py-4  text-base font-semibold w-full border-b border-gray-300">
                    Summary
                  </h1>

                  <div className="w-2/3">
                    <label
                      htmlFor="payment-method"
                      className="text-base font-semibold font-montserrat">
                      Payment Method:
                    </label>
                    <select
                      id="payment-method"
                      value={pembayaran}
                      onChange={(e) => setPembayaran(e.target.value)}
                      className="w-full p-2 border-2 border-gray-300 rounded-md mt-2 font-montserrat">
                      <option value="">Select a payment method</option>
                      <option value="creditCard">Credit Card</option>
                      <option value="bankTransfer">Bank Transfer</option>
                      <option value="paypal">PayPal</option>
                      <option value="gopay">GoPay</option>
                    </select>
                  </div>

                  {pembayaran && (
                    <p className="ml-4 text-sm font-medium font-montserrat">
                      Payment Method:{" "}
                      {pembayaran.charAt(0).toUpperCase() + pembayaran.slice(1)}
                    </p>
                  )}

                  <p className="ml-4 font-montserrat text-base font-semibold">
                    Total :
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(total)}
                  </p>
                  <button
                    onClick={Checkout}
                    className="p-2 bg-myBlue text-white rounded-md hover:bg-myGold mb-4">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-screen w-full flex justify-center items-center bg-anotherGrey">
              <h1>No Item Added</h1>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Cart;
