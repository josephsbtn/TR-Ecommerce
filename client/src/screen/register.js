import React, { useEffect, useState } from "react";
import LoginDesign from "../component/design/loginDesign";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");

  useEffect()=>{
    
  }

  return (
    <>
      <section className="flex  h-screen w-full bg-myBlue  justify-center items-center">
        <LoginDesign />
        <div className="flex flex-col w-1/3 h-fit  p-4 justify-center items-center bg-white ">
          <form className="flex flex-col w-full p-4 space-y-4">
            <div className=" flex flex-col space-y-2">
              <label className="font-montserrat ">E-mail</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-400 rounded-md"
                required
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
