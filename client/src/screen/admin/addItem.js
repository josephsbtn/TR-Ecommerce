import React, { useState } from "react";
import Navbar from "../../component/design/navbar";
import SideNavbar from "../../component/design/sideNavbar";
function AddItem() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [error, setError] = useState(false);
  function convertBase64(e) {
    const file = e.target.files[0];
    if (!file) {
      setError(true);
      console.log("No image selected");
      return false;
    }
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      setError(true);
      console.log("Invalid file type. Only JPEG and PNG files are allowed.");
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setError(true);
      console.log("File is too large. Maximum file size is 2MB.");
      return;
    }
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        setImage(reader.result);
      };
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <>
      <section className="flex flex-col w-full h-auto">
        <div>
          <SideNavbar open={open} />
        </div>
        <Navbar OnOpen={() => setOpen(!open)} />
        <div className="h-screen w-full" onClick={() => setOpen(false)}></div>
      </section>
    </>
  );
}

export default AddItem;
