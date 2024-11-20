import React from "react";

function TopPopUp({ show, onClose, children }) {
  return (
    <div
      onClick={onClose}
      className={`fixed flex justify-center w-full h-screen items-start transition-all mt-10 duration-300 ${
        show ? "visible opacity-100" : "invisible opacity-0"
      }`}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow p-6 transform transition-all duration-300 scale-100">
        {children}
      </div>
    </div>
  );
}

export default TopPopUp;
