import React, { useState, useEffect } from "react";
import SideNavUser from "../../component/design/SideNavUser";
import Navbar from "../../component/design/navbar";
import axios from "axios";
import { useParams } from "react-router-dom";

function MyOrders() {
  const { userId } = useParams();
  const [open, setOpen] = useState(false);
  const [pembelian, setPembelian] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPembelian = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/history/getAllHistory");
        console.log(res.data);

        // Filter transactions based on userId from URL params
        const filteredPembelian = res.data.filter(
          (history) => history.cartID.userId?._id === userId
        );

        setPembelian(filteredPembelian);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message || "Failed to fetch data");
      }
    };

    fetchPembelian();
  }, [userId]); // Include userId as a dependency to refetch if it changes

  return (
    <section className="flex flex-col w-full h-auto">
      <div>
        <SideNavUser open={open} onClose={() => setOpen(false)} />
      </div>

      <Navbar OnOpen={() => setOpen(!open)} />

      <div
        className="h-screen w-full bg-gray-100"
        onClick={() => setOpen(false)}>
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Purchase History
          </h1>

          {loading && (
            <p className="text-center text-blue-500 font-medium">
              Loading purchase history...
            </p>
          )}

          {error && (
            <p className="text-center text-red-500 font-medium">
              Error: {error}
            </p>
          )}

          {!loading && !error && pembelian.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pembelian.map((history) => (
                <div
                  key={history._id}
                  className="bg-white p-4 shadow rounded-lg border border-gray-200">
                  <h2 className="font-semibold text-lg text-gray-800">
                    Payment Method: {history.PaymentMethod}
                  </h2>
                  <p className="text-gray-600">
                    User: {history.cartID.userId?._id || "Unknown"}
                  </p>
                  {history.cartID.items.map((item) => (
                    <div key={item.itemID._id} className="mt-2">
                      <p className="text-gray-600">
                        Product: {item.itemID.name}
                      </p>
                      <p className="text-gray-600">
                        Price:{" "}
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(item.itemID.price)}
                      </p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  ))}
                  <p className="text-gray-600">
                    Date: {new Date(history.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && pembelian.length === 0 && (
            <p className="text-center text-gray-500 font-medium">
              No purchase history found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default MyOrders;
