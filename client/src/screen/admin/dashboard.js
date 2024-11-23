import React, { useEffect, useState } from "react";
import Navbar from "../../component/design/navbar";
import SideNavUser from "../../component/design/SideNavUser";
import BigUserIcon from "../../component/icon/bigUserIcon";
import DashItemIcon from "../../component/icon/DashItemIcon";
import ConfirmPopUp from "../../component/notification/confirmPopUp";
import axios from "axios";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState([]);
  const [pembelian, setPembelian] = useState([]);
  const [user, setUser] = useState([]);
  const [kategori, setKategori] = useState([]);

  const [namaKat, setNamaKat] = useState("");
  const [editedCat, setEditedCat] = useState("");
  const [editedCatId, setEditedCatId] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [succes, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deleteCat = async (thisId) => {
    try {
      const response = await axios.delete("/api/categories/deleteCategory", {
        data: { id: thisId },
      });
      console.log("Deleted category: ", response.data);
      setKategori(kategori.filter((kate) => kate._id !== thisId));
    } catch (error) {
      setError(error.message);
    }
  };

  const addCatHandler = async (e) => {
    e.preventDefault();
    try {
      if (namaKat === "") {
        setError("Nama kategori tidak boleh kosong");
        return false;
      }
      const added = (
        await axios.post("/api/categories/addCategory", { name: namaKat })
      ).data;
      setKategori([...kategori, added]);
      setNamaKat("");
      setSuccess(true);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  const editCatHandler = async (e) => {
    e.preventDefault();
    try {
      if (editedCat === "") {
        setError("Nama kategori tidak boleh kosong");
        return false;
      }
      const update = await axios.put("/api/categories/updateCategory", {
        catId: editedCatId,
        name: editedCat,
      });

      console.log(update);
      window.location.reload();
      setIsEditing(false);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const fetchPembelian = async () => {
      setLoading(true);
      try {
        const res = (await axios.get("api/history/getAllHistory")).data;
        setPembelian(res);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    const fetchItem = async () => {
      try {
        const item = (await axios.get("/api/items/getAllItem")).data;
        setItem(item);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchCat = async () => {
      try {
        const cat = (await axios.get("/api/categories/getallcategories")).data;
        setKategori(cat);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchItem();
    fetchPembelian();
    fetchCat();
  }, []);

  return (
    <>
      <section className="flex flex-col w-full h-auto bg-red-300">
        <SideNavUser open={open} onClose={() => setOpen(false)} />
        <ConfirmPopUp show={isEditing} onClose={() => setIsEditing(false)}>
          <form
            onSubmit={editCatHandler}
            className="w-full flex justify-center items-center space-x-3">
            <input
              type="text"
              value={editedCat}
              onChange={(e) => setEditedCat(e.target.value)}
              className="w-44 h-8 p-2 text-sm font-montserrat text-black focus:outline-none border-b border-myGold"
            />
            <button
              type="submit"
              className="bg-myBlue text-xs text-white font-montserrat p-3 rounded-full hover:bg">
              UPDATE
            </button>
          </form>
        </ConfirmPopUp>
        <Navbar OnOpen={() => setOpen(!open)} />
        <div className="h-screen w-full" onClick={() => setOpen(false)}>
          <div className="flex flex-col w-full items-center mt-16 h-screen bg-anotherGrey">
            <div className="flex justify-between items-center w-auto h-fit my-10 space-x-20">
              <div className="flex flex-col items-start justify-center space-y-2 h-full w-60 bg-slate-700 p-4 rounded-2xl">
                <BigUserIcon />
                <h1 className="font-montserrat text-white text-xl ml-5 font-medium">
                  {user.length}
                </h1>
                <h1 className="font-montserrat text-white text-base font-medium">
                  Akun Pengguna
                </h1>
              </div>
              <div className="flex flex-col items-start justify-center space-y-2 h-full w-60 bg-slate-700 p-4 rounded-2xl">
                <DashItemIcon />
                <h1 className="font-montserrat text-white text-xl ml-5 font-medium">
                  {pembelian.length}
                </h1>
                <h1 className="font-montserrat text-white text-base font-medium">
                  Total Penjualan
                </h1>
              </div>
              <div className="flex flex-col items-start justify-center space-y-2 h-full w-60 bg-slate-700 p-4 rounded-2xl">
                <BigUserIcon />
                <h1 className="font-montserrat text-white text-xl ml-5 font-medium">
                  {item.length}
                </h1>
                <h1 className="font-montserrat text-white text-base font-medium">
                  Products
                </h1>
              </div>
            </div>
            <div className="flex flex-col w-[22rem] h-96 bg-white rounded-xl overflow-y-scroll scrollbar-none">
              <h1 className="font-montserrat text-base text-myBlue p-2 ml-3 mt-2 font-medium">
                Kategori
              </h1>
              <form
                onSubmit={addCatHandler}
                className="flex w-full items-center justify-center space-x-3 pb-4">
                <input
                  type="text"
                  placeholder="Tambah Kategori"
                  value={namaKat}
                  onChange={(e) => setNamaKat(e.target.value)}
                  className="w-44 h-8 p-2 text-sm font-montserrat text-black focus:outline-none border-b border-myGold"
                />
                <button
                  type="submit"
                  className="bg-myBlue hover:bg-blue-700 text-xs text-white font-montserrat p-3 rounded-full hover:bg">
                  TAMBAH
                </button>
              </form>
              {error && (
                <h1 className=" text-xs text-red-700 font-montserrat text-center pb-2">
                  {error}
                </h1>
              )}
              {succes && (
                <h1 className=" text-xs text-myGold bg-myBlue font-montserrat text-center p-1 rounded-full">
                  BERHASIL MENAMBAHKAN KATEGORI
                </h1>
              )}
              <div className="flex flex-col space-y-2 border-t border-myBlue">
                {kategori.map((kategoris) => (
                  <div
                    key={kategoris._id}
                    className="w-full flex justify-between h-fit py-2 border-b border-myBlue">
                    <h1 className="font-montserrat text-sm text-myBlue p-2 ml-2">
                      {kategoris.name}
                    </h1>
                    <div className="flex w-fit items-center justify-end space-x-2">
                      <button
                        onClick={() => deleteCat(kategoris._id)}
                        className="text-[10px] text-red-800 font-montserrat p-2 hover:bg-red-800 hover:text-white rounded-2xl">
                        DELETE
                      </button>
                      <button
                        onClick={() => {
                          setEditedCat(kategoris.name);
                          setEditedCatId(kategoris._id);
                          setIsEditing(true);
                        }}
                        className="text-[10px] font-montserrat p-2 text-myBlue hover:bg-myBlue hover:text-white rounded-2xl ">
                        EDIT
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
