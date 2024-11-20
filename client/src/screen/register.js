import React, { useEffect, useState } from "react";
import LoginDesign from "../component/design/loginDesign";
import axios from "axios";
import Lihat from "../component/icon/Lihat";
import Logo from "../component/design/logo";
import GakLihat from "../component/icon/GakLihat";
import TopPopUp from "../component/notification/topPopUp";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [show, setShow] = useState(true);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleRepeat, setVisibleRepeat] = useState(false);

  const SubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (
        !email ||
        !password ||
        !confirmPassword ||
        !username ||
        !fullname ||
        !phoneNumber
      ) {
        throw new Error("Fill all fields");
      }

      if (confirmPassword != password) {
        throw new Error("Passwords do not match");
      }

      setLoading(true);

      const newUser = {
        email,
        password,
        username,
        fullname,
        phoneNumber,
      };

      const result = (await axios.post("/api/users/register", newUser)).data;
      console.log(result);
      setLoading(false);
      setSuccess("Registration Successful!!");
      setError(""); // Clear any existing error
    } catch (error) {
      setLoading(false);
      setSuccess(""); // Clear any existing success message
      setError(error.message || "Something went wrong");
      console.error(error);
    }
  };

  return (
    <>
      <section className="flex h-screen w-full justify-center items-center space-x-28">
        <TopPopUp show={show} onClose={() => setShow(false)}>
          <div>HALLOO</div>
        </TopPopUp>
        <div className="h-full w-1/3 flex flex-col bg-myBlue items-center justify-center">
          <Logo />
          <LoginDesign />
        </div>

        <div className="flex flex-col w-1/3 h-screen p-4 justify-center items-center">
          <form
            className="flex flex-col w-full p-4 space-y-4"
            onSubmit={SubmitHandler}>
            <div className="flex flex-col space-y-2">
              <h1 className="font-montserrat text-3xl my-8 font-medium">
                REGISTER
              </h1>
              <label className="font-montserrat text-sm">E-mail</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded-md"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-montserrat text-sm">Username</label>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded-md"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-montserrat text-sm">Fullname</label>
              <input
                type="text"
                onChange={(e) => setFullname(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded-md"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-montserrat text-sm">Phone Number</label>
              <input
                type="number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded-md"
                required
              />
            </div>
            <div className="flex space-x-4 justify-center">
              <div className="flex flex-col space-y-2">
                <label className="font-montserrat text-sm">Password</label>
                <div className="flex items-center space-x-2">
                  <input
                    type={visible ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded-md"
                    required
                  />
                  <div
                    className="scale-75 transition-all duration-300"
                    onClick={() => setVisible(!visible)}>
                    <div className="transition-opacity duration-300 ease-in-out">
                      {visible ? <Lihat /> : <GakLihat />}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-montserrat text-sm">
                  Repeat Password
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type={visibleRepeat ? "text" : "password"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded-md"
                    required
                  />
                  <div
                    className="scale-75"
                    onClick={() => setVisibleRepeat(!visibleRepeat)}>
                    {visibleRepeat ? <Lihat /> : <GakLihat />}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-anotherGrey rounded-2xl font-medium text-base hover:bg-myBlue hover:text-white transition-all duration-300 font-montserrat">
              SUBMIT
            </button>
          </form>

          {success && (
            <div className="text-center text-green-500 font-bold text-lg mt-4">
              {success}
            </div>
          )}

          {error && (
            <div className="text-center text-red-500 font-bold text-lg mt-4">
              {error}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Register;
