import React, { useState, useEffect } from "react";
import LoginDesign from "../component/design/loginDesign";
import Logo from "../component/design/logo";
import { Link } from "react-router-dom";
import TopPopUp from "../component/notification/topPopUp";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);
  const [success, setSucces] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setOpen(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const submitLogin = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };
    try {
      setLoading(true);
      const res = (await axios.post(`/api/users/login`, user)).data;
      console.log("LOGIN :", res);
      localStorage.setItem("currentUser", JSON.stringify(res));
      setSucces("Login Successful");
      console.log(success);
      setOpen(true);

      if (res.isAdmin) {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/home";
      }
      setLoading(false);
    } catch (error) {
      setOpen(true);
      setError(error.response?.data?.message || error.message);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <section className="flex  h-screen w-full bg-white  justify-center items-center space-x-16">
        <div className="absolute top-2 left-4">
          <Logo />
        </div>
        <div className="mt-16">
          <LoginDesign />
        </div>

        <div className="flex flex-col w-1/3 h-fit  p-4 justify-center items-center bg-myBlue ">
          <div className="w-full">
            <Link to={"/"}>
              <h1 className="w-full text-end text-white font-bold">X</h1>
            </Link>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">LOG IN</h2>
          </div>
          <form
            onSubmit={submitLogin}
            className="flex flex-col w-full p-4 space-y-8">
            <div className=" flex flex-col space-y-5">
              <label className="font-montserrat text-white ">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border  border-gray-600 rounded-md "
                required
              />
              <label className="font-montserrat text-white">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded-md "
                required
              />

              <Link to={"/register"}>
                <h1 className="font-montserrat text-white text-sm hover:border-b border-myGold w-fit">
                  Dont have an account ? Register
                </h1>
              </Link>
              <button
                type="submit"
                className="w-full bg-white text-black font-bold py-2 rounded-md">
                Sign-in
              </button>
            </div>
          </form>
          {success ? (
            <div className=" bg-green-800 shadow-xl rounded-lg w-fit py-1 px-2 h-fit flex  items-start justify-center">
              <p className=" text-white text-center font-medium font-montserrat text-base">
                {success}
              </p>
            </div>
          ) : error ? (
            <div className=" bg-red-800 shadow-xl rounded-lg w-fit py-1 px-2 h-fit flex  items-start justify-center">
              <p className=" text-white text-center font-medium font-montserrat text-base">
                {error}
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

export default Login;
