import React from "react";
import { Link } from "react-router-dom";
function ItemCard({ item }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <>
      <Link to={user.isAdmin ? `/item/${item.id}` : ``}>
        <div className="bg-white w-96 h-auto flex flex-col mt-2 p-2 rounded-2xl shadow-xl ">
          <img src={item.image} className="w-96 h-44 mt-4" />
          <h1 className="ml-4 font-montserrat text-base font-medium">
            {item.name}
          </h1>
          <p className="ml-4 font-montserrat text-sm">Rp {item.price}</p>
        </div>
      </Link>
    </>
  );
}

export default ItemCard;
