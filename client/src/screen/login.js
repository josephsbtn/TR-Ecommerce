import React from "react";
import LoginDesign from "../component/design/loginDesign";
import Logo from "../component/design/logo";
function Login() {
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
          <div>
            <h2 className="text-2xl font-bold text-white">LOG IN</h2>
          </div>
          <form className="flex flex-col w-full p-4 space-y-8">
            <div className=" flex flex-col space-y-5">
              <label className="font-montserrat text-white ">E-mail</label>
              <input
                type="email"
                className="w-full p-2 border  border-gray-600 rounded-md "
                required
              />
              <label className="font-montserrat text-white">Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-600 rounded-md "
                required
              />
              <button
                type="submit"
                className="w-full bg-white text-black font-bold py-2 rounded-md"
              >
                Sign-in
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
