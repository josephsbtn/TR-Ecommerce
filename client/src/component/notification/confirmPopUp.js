import React from "react";

function ConfirmPopUp({ show, onClose, children }) {
  return (
    <div
      onClick={onClose}
      className={`fixed flex justify-center w-full h-screen bg-black bg-opacity-40 items-center transition-all mt-10 duration-300 ${
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

export default ConfirmPopUp;
