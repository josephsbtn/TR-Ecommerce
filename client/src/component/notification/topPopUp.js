import React, { useState, useEffect } from "react";

function topPopUp({ show, onClose, Children }) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed  flex justify-center items-start bg-black bg-opacity-25 ${
          show ? "visible" : "hidden"
        }`}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-xl shadow p-6 transition-all duration-300 ${
            show ? "scale-100 opacity-100" : "scale-150 opacity-0"
          }`}>
          {Children}
        </div>
      </div>
    </>
  );
}

export default topPopUp;
