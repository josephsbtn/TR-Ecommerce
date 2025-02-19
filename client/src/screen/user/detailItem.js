import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideNavUser from "../../component/design/SideNavUser";
import Navbar from "../../component/design/navbar";
import BagButton from "../../component/design/BagButton";
import axios from "axios";

function DetailItem() {
  const { itemId } = useParams();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const userId = user ? user._id : null;
  const [quantity, setQuantity] = useState(1);

  const [name, setName] = useState("");
  const [productType, setProductType] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);

  // Add item to cart
  const addCart = async () => {
    if (!userId) {
      alert("Please log in to add items to the cart.");
      return;
    }

    try {
      const subtotal = price * quantity;
      const response = await axios.post("/api/cart/addItem", {
        userId,
        items: [
          {
            itemID: itemId,
            quantity: quantity,
          },
        ],
        subtotal: subtotal,
      });

      console.log(response.data);
      alert("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding item to cart:", error.message);
      alert("Failed to add item to cart.");
    }
  };

  // Fetch item details
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = (await axios.post("/api/items/itemsById", { itemId })).data;
        setCategoryId(res.category);
        setName(res.name);
        setDescription(res.description);
        setPrice(res.price);
        setImage(res.image);
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || error.message);
      }
    };

    if (itemId) {
      fetchItem();
    }
  }, [itemId]);

  useEffect(() => {
    if (categoryId) {
      const fetchCategory = async () => {
        try {
          const { data } = await axios.get(
            `/api/categories/categoryById/${categoryId}`
          );
          setProductType(data.name);
          console.log("Category:", data);
        } catch (error) {
          console.error(error);
          setError(error.message);
        }
      };

      fetchCategory();
    }
  }, [categoryId]);

  return (
    <section className="flex flex-col w-full h-auto">
      <div>
        <SideNavUser open={open} onClose={() => setOpen(false)} />
      </div>
      <Navbar OnOpen={() => setOpen(!open)} />

      <div
        className="h-screen w-full flex justify-center"
        onClick={() => setOpen(false)}>
        <section className="flex items-center justify-between w-[80%] h-[90%] mt-16">
          <div>
            <img
              src={image}
              alt="product image"
              className="w-96 h-96 object-cover rounded-3xl border-2 border-anotherGrey"
            />
          </div>
          <div className="flex flex-col items-start justify-start p-4 rounded-xl w-96 h-3/4 border-2 border-anotherGrey overflow-scroll scrollbar-none">
            <h1 className="text-xl font-bold font-montserrat">{name}</h1>
            <p className="text-lg font-montserrat">{productType}</p>
            <p className="font-montserrat text-base font-semibold">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(price)}
            </p>
            <h1 className="border-t-2 border-anotherGrey py-4 text-base font-semibold font-montserrat mt-10 w-full">
              Description
            </h1>
            <p className="text-sm font-medium font-montserrat">{description}</p>
          </div>
          <div className="flex flex-col items-start space-y-4 justify-center p-2 rounded-xl border-2 border-anotherGrey w-72">
            <h1 className="text-xl font-montserrat w-full font-medium m-2">
              Set Quantity
            </h1>
            <div className="flex justify-around items-center w-full">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                disabled={quantity <= 1}
                className={`${
                  quantity <= 1
                    ? "cursor-not-allowed opacity-50 text-2xl font-montserrat rounded-full h-5 w-5 flex items-center justify-center"
                    : "text-3xl font-montserrat rounded-full h-5 w-5 flex items-center p-4 justify-center hover:bg-anotherGrey hover:text-black"
                }`}>
                -
              </button>

              <h1 className="text-xl font-montserrat">{quantity}</h1>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-3xl font-montserrat rounded-full h-5 w-5 p-4 flex items-center justify-center hover:bg-myBlue hover:text-white">
                +
              </button>
            </div>
            <div className="flex justify-between items-center w-full space-x-8 p-2">
              <h1 className="font-montserrat text-sm font-normal">
                Subtotal :{" "}
              </h1>
              <h1 className="font-montserrat text-base font-semibold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(quantity * price)}
              </h1>
            </div>
            <button
              onClick={() =>
                userId ? addCart() : (window.location.href = "/login")
              }
              className="bg-myBlue w-full font-medium font-montserrat text-sm text-white p-2 rounded-md hover:bg-white hover:text-myGold hover:border-2 hover:border-borderGrey transition-all duration-300">
              Add to Cart
            </button>
          </div>
        </section>
        {user ? <BagButton userId={userId} /> : null}
      </div>
    </section>
  );
}

export default DetailItem;
