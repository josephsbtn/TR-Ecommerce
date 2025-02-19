import React, { useEffect, useState } from "react";
import Navbar from "../../component/design/navbar";
import SideNavUser from "../../component/design/SideNavUser";
import BigUserIcon from "../../component/icon/bigUserIcon";
import DashItemIcon from "../../component/icon/DashItemIcon";
import ConfirmPopUp from "../../component/notification/confirmPopUp";
import Loading from "../../component/design/Loading";
import axios from "axios";
import DashSellingIcon from "../../component/icon/DashSellingIcon";

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
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deleteCat = async (thisId) => {
    try {
      const response = await axios.delete("/api/categories/deleteCategory", {
        data: { id: thisId },
      });
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
        return;
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
        return;
      }
      await axios.put("/api/categories/updateCategory", {
        catId: editedCatId,
        name: editedCat,
      });
      setKategori(
        kategori.map((kate) =>
          kate._id === editedCatId ? { ...kate, name: editedCat } : kate
        )
      );
      setEditedCat("");
      setEditedCatId("");
      setIsEditing(false);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, pembelianRes, itemRes, catRes] = await Promise.all([
          axios.get("/api/users/getallusers"),
          axios.get("/api/history/getAllHistory"),
          axios.get("/api/items/getAllItem"),
          axios.get("/api/categories/getallcategories"),
        ]);
        setUser(userRes.data);
        setPembelian(pembelianRes.data);
        setItem(itemRes.data);
        setKategori(catRes.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchData();
    console.log("isedititng :", isEditing);
  }, []);

  return (
    <section className="flex flex-col w-full h-auto bg-red-300">
      <SideNavUser open={open} onClose={() => setOpen(false)} />
      <ConfirmPopUp open={isEditing} onClose={() => setIsEditing(false)}>
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
          {loading ? (
            <div className="flex w-full h-screen scale-50 justify-center items-center">
              <Loading />
            </div>
          ) : error ? (
            <div className="text-red-500 text-2xl font-montserrat">{error}</div>
          ) : (
            <>
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
                  <DashSellingIcon />
                  <h1 className="font-montserrat text-white text-xl ml-5 font-medium">
                    {pembelian.length}
                  </h1>
                  <h1 className="font-montserrat text-white text-base font-medium">
                    Total Penjualan
                  </h1>
                </div>
                <div className="flex flex-col items-start justify-center space-y-2 h-full w-60 bg-slate-700 p-4 rounded-2xl">
                  <DashItemIcon />
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
                    className="bg-myBlue hover:bg-blue-700 text-xs text-white font-montserrat p-3 rounded-full">
                    TAMBAH
                  </button>
                </form>
                {error && (
                  <h1 className="text-xs text-red-700 font-montserrat text-center pb-2">
                    {error}
                  </h1>
                )}
                {success && (
                  <h1 className="text-xs text-myGold bg-myBlue font-montserrat text-center p-1 rounded-full">
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
                          className="text-[10px] font-montserrat p-2 text-myBlue hover:bg-myBlue hover:text-white rounded-2xl">
                          EDIT
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
