import React from "react";
import { useState, useEffect } from "react";
import SideNavUser from "../../component/design/SideNavUser";
import Navbar from "../../component/design/navbar";
import { useParams } from "react-router-dom";
import axios from "axios";

function DetailItem() {
  const idItem = useParams();
  const [item, setItem] = useState({});
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const addCart = async () => {
    try {
      const data = (await axios.post("/api/cart/addToCart", { idItem })).data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = (await axios.get("/api/items/getItem", { idItem })).data;
        setItem(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItem();
  }, [idItem]);
  return (
    <>
      <section className="flex flex-col w-full h-auto">
        <div>
          <SideNavUser open={open} onClose={() => setOpen(false)} />
        </div>
        <Navbar OnOpen={() => setOpen(!open)} />

        <div className="h-screen w-full" onClick={() => setOpen(false)}></div>
      </section>
    </>
  );
}

export default DetailItem;
