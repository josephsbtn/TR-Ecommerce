import React, { useState } from "react";
import Navbar from "../component/design/navbar";
import SideNavUser from "../component/design/SideNavUser";
import image1 from "../component/image/image1AboutUs.png";
import image2 from "../component/image/image2AboutUs.png";
import image3 from "../component/image/image3AboutUs.png";
import image4 from "../component/image/image4AboutUs.png";
import image5 from "../component/image/image5AboutUs.png";
import image6 from "../component/image/image6AboutUs.png";
import image7 from "../component/image/image7AboutUs.png";
import image8 from "../component/image/image8AboutUs.png";

function Aboutus() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="flex flex-col w-full h-auto">
        <div>
          <SideNavUser open={open} onClose={() => setOpen(false)} />
        </div>
        <div className="z-20 fixed">
          <Navbar OnOpen={() => setOpen(!open)} />
        </div>

        <div
          className="h-auto w-full bg-white mt-24 py-8"
          onClick={() => setOpen(false)}>
          <div className="w-full mx-auto flex flex-col items-center">
            <div className="text-center">
              <h2 className="text-gray-700 text-xl font-roman tracking-wide">
                OUR MOTTO
              </h2>
              <h1 className="text-4xl font-lateef my-4">
                “ADORN YOUR DAYS WITH MINDFUL LUXURY”
              </h1>
              <p className="text-gray-500 font-roman text-lg">
                Because your brilliance deserves a story that matters.
              </p>
            </div>

            <div className="relative mt-44 w-[90%] h-max py-36">
              <div className="w-full flex justify-between">
                <div className="max-w-[50%]">
                  <h1 className="text-4xl font-lateef w-full text-center">
                    ROSE SHARON
                  </h1>
                  <p className="w-full text-center mt-10 font-montserrat text-[#706a6a] text-sm font-normal">
                    Is more than just luxury lab-grown diamond jewelry. It
                    embodies the idea of mindful living and self-expression
                    through jewelry.
                    <br />
                    <br />
                    Our vision is to redefine everyday luxury with
                    heirloom-quality products, responsibly sourced and
                    consciously crafted for positive impact. With ROSE SHARON,
                    each day becomes a meaningful and elegant expression of
                    self. “Adorn your days with mindful luxury”
                  </p>
                </div>
                <div className="absolute right-8 -top-6 w-1/3 z-0">
                  {" "}
                  <img
                    src={image1}
                    alt="Jewelry Image"
                    className=" rounded-bl-[80px] overflow-hidden object-cover"
                  />
                  <div className="absolute bottom-10 right-16 border-t-4 border-l-4 border-r-4 border-b-4 border-yellow-600 rounded-tl-[150px] h-full w-full -z-10"></div>
                </div>
                  
              </div>
            </div>

            <div className="mt-24 w-[90%] text-center">
              <div className="mt-10">
                <div className="text-center">
                  <h2 className="text-[40px] absolute right-[40%] font-medium font-lateef text-balck">
                    Why Rose of Sharon?
                  </h2>
                </div>

                <div className=" flex flex-col lg:flex-row items-center justify-center gap-8">
                  {/* Left Image */}
                  <div className="w-full lg:w-1/2">
                    <img
                      src={image2}
                      alt="Rose of Sharon Jewelry"
                      className=" w-96 h-80object-cover shadow-md"
                    />
                  </div>

                  {/* Right Content */}
                  <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <h3 className="text-3xl font-lateef mb-4">
                      We Believe to make simplicity in elegance
                    </h3>
                    <p className="text-gray-500 text-lg">
                      The beauty and confidence within every individual through
                      our exquisite and timeless jewelry.
                    </p>
                  </div>
                </div>

                {/* Bottom Image */}
                <div className="mt-12 flex justify-center">
                  <div className="w-full lg:w-1/2">
                    <img
                      src={image3}
                      alt="Jewelry Hand Image"
                      className=" -mt-60 w-64 h-60 object-cover bottom-[-30px] right-[-20px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="w-full
             h-fit relative bg-red-500 mt-36 ">
              <img
                src={image4}
                alt="Jewelry Image"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-black w-full h-full bg-opacity-30">
                <h1 className="font-lateef text-white text-center mt-20 text-[50px] ">
                  No limits to the lifestyle you deserve
                </h1>
                <p className="font-montserrat text-white text-center mt-10 text-[20px] w-full ">
                  Our team of 3d modelers jewelers can create literally any ring
                  you can imagine,
                  <br /> including complex design We’re opening up our services
                  to private clients, <br /> so you can get a beautiful,
                  designer quality
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 mt-36 gap-4 justify-center w-[90%]  items-start">
              <div className="flex flex-col items-center justify-start ">
                <img
                  src={image5}
                  alt="Jewelry Image
                "
                  className="w-72 h-72 object-cover object-center"
                />
                <h1 className="font-lateef text-[30px] font-bold">
                  For Beauty
                </h1>
                <p className="font-montserrat text-sm text-center">
                  Offending Belonging Promotion Provision An Be Oh Consulted
                </p>
              </div>
              <div className="flex flex-col items-center justify-start">
                <img
                  src={image6}
                  alt="Jewelry Image
                "
                  className="w-72 h-72 object-cover object-center"
                />
                <h1 className="font-lateef text-[30px] font-bold">
                  Product Quality
                </h1>
                <p className="font-montserrat text-sm text-center">
                  Blessin Welcoened Ladyship She Met Humoured Sir Breeding
                </p>
              </div>
              <div className="flex flex-col items-center justify-start">
                <img
                  src={image7}
                  alt="Jewelry Image
                "
                  className="w-72 h-72 object-cover object-center"
                />
                <h1 className="font-lateef text-[30px] font-bold">
                  For Comfort
                </h1>
                <p className="font-montserrat text-sm text-center">
                  Providing comfort and elegance in every piece
                </p>
              </div>
              <div className="flex flex-col items-center justify-start ">
                <img
                  src={image8}
                  alt="Jewelry Image
                "
                  className="w-72 h-72 object-cover object-center"
                />
                <h1 className="font-lateef text-[30px] font-bold">
                  Well Designed
                </h1>
                <p className="font-montserrat text-sm text-center">
                  To create and offer high-quality, timeless jewelry that
                  reflects superior craftsmanship and innovative design
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Aboutus;
