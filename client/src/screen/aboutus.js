import React, { useState } from "react";
import Navbar from "../component/design/navbar";
import SideNavUser from "../component/design/SideNavUser";

function Aboutus() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="flex flex-col w-full h-auto">
        <div>
          <SideNavUser open={open} onClose={() => setOpen(false)} />
        </div>
        <Navbar OnOpen={() => setOpen(!open)} />

        <div className="h-auto w-full bg-white" onClick={() => setOpen(false)}>
          <div className="max-w-7xl mx-auto p-8">
            <div className="text-center">
              <img
                src="/path-to-logo.png"
                alt="Rose of Sharon Logo"
                className="mx-auto w-32 mb-4"
              />
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

            <div className="relative mt-16">
              <div className="w-full flex justify-end">
                <div className="relative w-1/2">
                  <img
                    src="/path-to-image.png"
                    alt="Jewelry Image"
                    className="rounded-bl-[80px] overflow-hidden object-cover"
                  />
                  <div className="absolute border-t-4 border-l-4 border-yellow-600 rounded-bl-[80px] h-full w-full top-0 left-0 -z-10"></div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-2xl font-headlanone font-bold">
                ROSE SHARON
              </h2>
              {/* Why Rose of Sharon Section */}
              <div className="mt-16">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-700">
                    Why Rose of Sharon?
                  </h2>
                </div>

                <div className="mt-12 flex flex-col lg:flex-row items-center justify-center gap-8">
                  {/* Left Image */}
                  <div className="w-full lg:w-1/2">
                    <img
                      src="/path-to-left-image.png"
                      alt="Rose of Sharon Jewelry"
                      className="rounded-xl object-cover w-full h-full"
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
                      src="/path-to-bottom-image.png"
                      alt="Jewelry Hand Image"
                      className="rounded-xl object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Aboutus;
