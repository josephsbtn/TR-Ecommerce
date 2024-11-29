import React, { useEffect, useState } from "react";
import Navbar from "../../component/design/navbar";
import SideNavUser from "../../component/design/SideNavUser";
import axios from "axios";
import { useParams } from "react-router-dom";
import ConfirmPopUp from "../../component/notification/confirmPopUp";
import TrashBin from "../../component/icon/trashBin";
import TopPopUp from "../../component/notification/topPopUp";

function EditItem() {
  const { itemId } = useParams();
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [productType, setProductType] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState([]);

  const [notification, setNotification] = useState(false);
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const cat = (await axios.get("/api/categories/getallcategories")).data;
        setCategory(cat);
        console.log("categories", cat);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    const fetchItem = async () => {
      try {
        const res = (await axios.post("/api/items/itemsById", { itemId })).data;
        console.log("Respon", res);
        setProductType(res.category);
        setName(res.name);
        setDescription(res.description);
        setPrice(res.price);
        setImage(res.image);
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || error.message);
      }
    };
    fetchItem();
    fetchCat();
  }, []);

  function convertBase64(e) {
    const file = e.target.files[0];
    if (!file) {
      setError(true);
      console.log("No image selected");
      return false;
    }
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      setError("Invalid file type. Only JPEG and PNG files are allowed.");
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File is too large. Maximum file size is 5MB.");
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

  const submitHandler = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (!name || !productType || !price || !description || !image) {
      setError("All fields are required.");
      return;
    }

    // Prepare data for update
    const updateItem = {
      category: productType,
      name,
      price,
      description,
      image,
    };

    console.log("Updating item:", updateItem); // Debugging

    try {
      // Send update request to the server
      const response = await axios.put("/api/items/editItem", {
        ...updateItem,
        itemId,
      });
      console.log("Update response:", response.data);

      setSuccess("Item updated successfully.");
      setShow(true);
      window.location.href = "/listProducts";
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to update item.");
    }
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      const res = (
        await axios.delete("/api/items/deleteItem", { data: { itemId } })
      ).data;
      console.log(res);
      setProductType("");
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
      setSuccess("Item deleted successfully");
      setShow(true);
      window.location.href = "/listProducts";
    } catch (error) {
      setShow(true);
      setError(error.response?.data?.message || error.message);
      console.log(error);
    }
  };

  return (
    <>
      <section className="flex flex-col bg-anotherGrey w-full h-auto">
        <div>
          <SideNavUser open={open} />
        </div>
        <Navbar OnOpen={() => setOpen(!open)} />
        <ConfirmPopUp
          open={notification}
          onClose={() => setNotification(false)}>
          <div className="flex flex-col items-center justify-center h-fit w-fit p-6 rounded-2xl space-y-4">
            <div className="h-fit w-fit p-4 bg-red-800 rounded-full">
              <TrashBin />
            </div>

            <h6 className="text-md font-montserrat text-black font-bold text-center ">
              Are you sure you want <br /> to delete this room?
            </h6>
            <div className="flex space-x-4">
              <button
                className="bg-red-800 text-white px-4 py-2 rounded-xl font-montserrat font-bold"
                onClick={deleteHandler}>
                Yes
              </button>
              <button onClick={() => setNotification(false)}>No</button>
            </div>
          </div>
        </ConfirmPopUp>
        <TopPopUp show={show} onClose={() => setShow(false)}>
          {success ? (
            <div className="flex p-4 rounded-xl bg-green-800">
              <p className="text-green-500">{success}</p>
            </div>
          ) : error ? (
            <div>
              <p className="text-red-500">{error}</p>
            </div>
          ) : null}
        </TopPopUp>
        <div
          className="h-screen w-full p-10 flex items-center justify-center"
          onClick={() => setOpen(false)}>
          <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-10 w-full mt-10">
            <div className="w-full lg:w-1/2 p-5 border rounded-md shadow-md bg-white">
              <h3 className="text-xl font-semibold mb-4 font-montserrat">
                Product Image
              </h3>
              <div className="flex flex-col space-y-4">
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded Preview"
                    className="w-full h-80 object-cover rounded-md border"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-md font-montserrat  flex items-center justify-center text-gray-600">
                    + Add Image
                  </div>
                )}
                <div className="flex space-x-4">
                  <button
                    onClick={() => setImage("")}
                    className="px-4 py-2 bg-red-600 font-montserrat  text-white rounded-md">
                    Remove
                  </button>
                  <label className="px-4 py-2 font-montserrat bg-blue-600 text-white rounded-md cursor-pointer">
                    Add
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

            <div className="w-full lg:w-1/2 p-5 border rounded-md bg-white shadow-md">
              <h3 className="text-xl font-montserrat font-semibold mb-4">
                General Information
              </h3>
              <form
                onSubmit={submitHandler}
                className="flex flex-col space-y-4">
                <div>
                  <label className="block font-montserrat text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md font-montserrat"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-gray-700 mb-1 font-montserrat">
                      Product Type
                    </label>
                    <select
                      className="w-full p-2 border font-montserrat rounded-md"
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}>
                      <option value="">Select Product Type</option>
                      {category.map((cat) => (
                        <option
                          className="font-montserrat text-sm"
                          value={cat._id}
                          key={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-montserrat mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border font-montserrat rounded-md"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Enter price"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-montserrat mb-1">
                    Product Description
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md font-montserrat"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter product description"
                    rows="4"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-myBlue text-white p-1 rounded-xl font-montserrat font-medium ">
                  Edit Item
                </button>
              </form>
              <button
                type="submit"
                className="bg-red-900 w-full mt-4 text-white p-1 rounded-xl font-montserrat font-medium "
                onClick={() => setNotification(true)}>
                Delete Item
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditItem;
