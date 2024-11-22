import React, { useState } from "react";
import Navbar from "../../component/design/navbar";
import SideNavUser from "../../component/design/SideNavUser";
function AddItem() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [productType, setProductType] = useState("Rings");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
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
          <SideNavUser open={open} />
        </div>
        <Navbar OnOpen={() => setOpen(!open)} />
        <div className="h-auto w-full p-10" onClick={() => setOpen(false)}>
          <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-10 w-full">
            <div className="w-full lg:w-1/2 p-5 border rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-4">Product Image</h3>
              <div className="flex flex-col space-y-4">
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded Preview"
                    className="w-full h-48 object-cover rounded-md border"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-600">
                    + Add Image
                  </div>
                )}
                <div className="flex space-x-4">
                  <button
                    onClick={() => setImage("")}
                    className="px-4 py-2 bg-red-600 text-white rounded-md">
                    Remove
                  </button>
                  <label className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer">
                    Replace
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={convertBase64}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 p-5 border rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                General Information
              </h3>
              <form className="flex flex-col space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-gray-700 mb-1">
                      Product Type
                    </label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}>
                      <option value="Rings">Rings</option>
                      <option value="Necklaces">Necklaces</option>
                      <option value="Earrings">Earrings</option>
                      <option value="Bracelets">Bracelets</option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded-md"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Enter price"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Product Description
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter product description"
                    rows="4"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddItem;
