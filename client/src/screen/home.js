import React, { useState, useEffect } from "react";
import Navbar from "../component/design/navbar";
import SideNavUser from "../component/design/SideNavUser";
import image1 from "../component/image/image1Home.png";
import ellipse1 from "../component/image/Ellipse1.png";
import ellipse2 from "../component/image/Ellipse2.png";
import ellipse3 from "../component/image/Ellipse3.png";
import ellipse4 from "../component/image/Ellipse4.png";
import newArrival from "../component/image/newArrivals.png";
import welcome1 from "../component/image/welcome1.png";
import welcome2 from "../component/image/welcome2.png";

function Home() {
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
          className="h-auto w-full flex flex-col space-y-28 items-center"
          onClick={() => setOpen(false)}>
          <div className="h-screen w-full">
            <img src={image1} className="h-screen w-full object-cover" />
            <div className="font-lateef flex flex-col bg-black w-full justify-center items-center h-screen bg-opacity-20 text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <h1 className="w-full text-center text-white ">Jewelry</h1>
              <h1 className="w-full text-center text-3xl text-white">
                Made For You
              </h1>
            </div>
          </div>
          <div className="w-[90%]  h-auto py-10 grid grid-cols-4 gap-4 justify-center">
            <div className="w-80 h-auto flex flex-col space-y-4 items-center justify-start">
              <img src={ellipse1} className="w-60 h-60 " />
              <h1 className="text-2xl font-normal font-Scheherazade">
                Bracelets
              </h1>
            </div>
            <div className="w-80 h-auto flex flex-col space-y-4 items-center justify-start">
              <img src={ellipse2} className="w-60 h-60 " />
              <h1 className="text-2xl font-normal font-Scheherazade">Rings</h1>
            </div>
            <div className="w-80 h-auto flex flex-col space-y-4 items-center justify-start">
              <img src={ellipse3} className="w-60 h-60 " />
              <h1 className="text-2xl font-normal font-Scheherazade">
                Earings
              </h1>
            </div>
            <div className="w-80 h-auto flex flex-col space-y-4 items-center justify-start">
              <img src={ellipse4} className="w-60 h-60 " />
              <h1 className="text-2xl font-normal font-Scheherazade">
                Neackles
              </h1>
            </div>
          </div>
          <div className="w-[90%] py-16 flex flex-col items-center justify-start bg-myBlue h-auto ">
            <div className="flex w-full justify-center items-center space-x-4 ">
              <div className="w-[10%] flex flex-col items-center">
                <h1 className="text-myGold font-GreatVibes text-3xl w-full text-start">
                  New
                </h1>
                <h1 className="text-myGold font-GreatVibes text-5xl">
                  Arrival
                </h1>
              </div>
              <div className="w-[70%] h-[2px] bg-myGold"></div>
            </div>
            <div className="flex w-full h-full justify-around items-center">
              <div className="h-[19rem] w-[2px] bg-myGold"></div>
              <div className="flex flex-col space-y-5 w-[70%]">
                <h1 className="w-[70%] text-center text-3xl font-headlanone text-myGold">
                  Summer Collection
                </h1>
                <p className=" text-center w-[70%] text-white ">
                  Embrace the warmth and brilliance of the summer sun with our
                  exquisite Summer Collection. Each piece is thoughtfully
                  crafted to capture the essence of the season, blending vibrant
                  colors, elegant designs, and timeless beauty. Whether you're
                  lounging by the beach, attending a summer soirée, or simply
                  enjoying a sunny day out, our jewelry will add a touch of
                  sparkle to your every moment.
                </p>
              </div>
              <img
                src={newArrival}
                className="h-auto w-96 right-40 mb-5 z-10 absolute -translate-y-0"
              />
              <div className="h-[19rem] w-[2px] bg-myGold"></div>
            </div>
            <div className="flex w-full justify-center items-center space-x-4 ">
              <div className="w-[70%] h-[2px] bg-myGold"></div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center space-x-4 border-y-2  h-20 border-slate-300 "></div>
          <div className="w-[90%] flex ">
            <div className="flex flex-col w-[50%]">
              <img src={welcome1} className="w-[420px] h-auto" />
              <img
                src={welcome2}
                className="w-96 h-auto absolute -z-10 translate-x-64 translate-y-[28rem]"
              />
            </div>
            <div className="flex w-3/5 space-y-4 flex-col h-fit items-center justify-center border-2 p-4 py-8 mt-20 border-myGold">
              <h1 className="w-full text-center text-3xl font-headlanone font-bold">
                Welcome
              </h1>
              <p className="w-2/3 text-center font-montserrat text-sm">
                Discover the elegance and timeless beauty of our exquisite
                jewelry collections. Each piece is crafted with the utmost care
                and attention to detail, designed to bring comfort, confidence,
                and sophistication to your life. Explore our range of stunning
                jewelry and find the perfect piece that speaks to your unique
                style and personality. Thank you for visiting, and we hope you
                find something truly special with us."
              </p>
            </div>
          </div>
          <div className="w-[90%] flex flex-col justify-center items-center py-20 space-y-8">
            <h1 className="w-full text-center text-3xl font-lateef font-medium">
              ROSE OF SHARON ARE 78% CARBON INTENSIVE
            </h1>
            <div className="grid grid-cols-3 justify-center w-full">
              <div className="flex flex-col justify-center items-center">
                <svg
                  width="88"
                  height="83"
                  viewBox="0 0 88 83"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g id="ion:water-outline">
                    <path
                      id="Vector"
                      d="M68.75 51.875C68.75 66.2006 59.1886 75.2187 44 75.2187C28.8114 75.2187 19.25 66.2006 19.25 51.875C19.25 36.5021 36.9927 15.7489 42.4342 9.74598C42.6278 9.5327 42.8681 9.36148 43.1386 9.24409C43.409 9.1267 43.7032 9.06592 44.0009 9.06592C44.2986 9.06592 44.5927 9.1267 44.8632 9.24409C45.1336 9.36148 45.3739 9.5327 45.5675 9.74598C51.0073 15.7489 68.75 36.5021 68.75 51.875Z"
                      stroke="#699BF7"
                      stroke-width="2.5"
                      stroke-miterlimit="10"
                    />
                    <path
                      id="Vector_2"
                      d="M59.125 53.1719C59.125 56.2674 57.8212 59.2362 55.5004 61.4251C53.1797 63.614 50.0321 64.8438 46.75 64.8438"
                      stroke="#699BF7"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </svg>
                <h1 className="text-xl font-lateef font-semibold">
                  WE USE 7 TIMES LESS WATER
                </h1>
                <p className="text-sm font-montserrat text-slate-400">
                  per carat production
                </p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <svg
                  width="84"
                  height="83"
                  viewBox="0 0 84 83"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g id="ph:tree-light">
                    <path
                      id="Vector"
                      d="M64.493 20.7792C62.674 16.3589 59.5623 12.5749 55.5556 9.91088C51.5489 7.2469 46.8293 5.82397 42 5.82397C37.1707 5.82397 32.4511 7.2469 28.4444 9.91088C24.4377 12.5749 21.326 16.3589 19.507 20.7792C15.4602 22.5525 12.0211 25.448 9.60692 29.1146C7.19273 32.7811 5.9072 37.061 5.90625 41.4352C5.87344 53.467 16.1208 63.8712 28.2811 64.1954C32.3862 64.2904 36.4425 63.301 40.0312 61.3293V75.2188C40.0312 75.7347 40.2387 76.2296 40.6079 76.5944C40.9771 76.9592 41.4779 77.1641 42 77.1641C42.5221 77.1641 43.0229 76.9592 43.3921 76.5944C43.7613 76.2296 43.9688 75.7347 43.9688 75.2188V61.3293C47.381 63.2048 51.2203 64.1912 55.125 64.1954H55.7058C67.8792 63.8712 78.1266 53.4637 78.0938 41.4352C78.0928 37.061 76.8073 32.7811 74.3931 29.1146C71.9789 25.448 68.5398 22.5525 64.493 20.7792ZM55.6172 60.3048C51.4432 60.4135 47.3492 59.1601 43.9688 56.7384V42.7029L58.6294 35.4599C59.0967 35.2294 59.4522 34.825 59.6178 34.3355C59.7833 33.8461 59.7453 33.3117 59.512 32.8499C59.2788 32.3882 58.8695 32.0369 58.3741 31.8733C57.8788 31.7097 57.338 31.7473 56.8706 31.9778L43.9688 38.3519V28.5313C43.9688 28.0154 43.7613 27.5206 43.3921 27.1558C43.0229 26.791 42.5221 26.586 42 26.586C41.4779 26.586 40.9771 26.791 40.6079 27.1558C40.2387 27.5206 40.0312 28.0154 40.0312 28.5313V46.1332L27.1294 39.759C26.6621 39.5286 26.1212 39.491 25.6259 39.6546C25.1305 39.8181 24.7212 40.1694 24.488 40.6312C24.2547 41.0929 24.2167 41.6273 24.3822 42.1168C24.5478 42.6062 24.9033 43.0107 25.3706 43.2411L40.0312 50.4842V56.7384C36.6484 59.1553 32.5561 60.4082 28.3828 60.3048C18.3061 60.0551 9.8175 51.4212 9.84375 41.4547C9.84355 37.7076 10.9806 34.0465 13.108 30.9446C15.2354 27.8426 18.2554 25.4423 21.7777 24.0539C22.0334 23.9518 22.2646 23.7977 22.4562 23.6016C22.6478 23.4056 22.7956 23.172 22.89 22.9159C24.3206 19.044 26.9212 15.7002 30.3395 13.3377C33.7578 10.9752 37.8285 9.70806 42 9.70806C46.1715 9.70806 50.2422 10.9752 53.6605 13.3377C57.0788 15.7002 59.6794 19.044 61.11 22.9159C61.2044 23.172 61.3522 23.4056 61.5438 23.6016C61.7354 23.7977 61.9666 23.9518 62.2224 24.0539C65.7434 25.4413 68.7625 27.84 70.8898 30.9402C73.0171 34.0403 74.1549 37.6994 74.1562 41.445C74.1825 51.4147 65.6939 60.0454 55.6172 60.3048Z"
                      fill="#0FA958"
                    />
                  </g>
                </svg>

                <h1 className="text-xl font-lateef font-semibold">
                  REQUIRES 1281 TIMES LESS LAND CONVERSION
                </h1>
                <p className="text-sm font-montserrat text-slate-400">
                  per carat production
                </p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <svg
                  width="57"
                  height="71"
                  viewBox="0 0 57 71"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g id="akar-icons:thunder">
                    <path
                      id="Vector"
                      d="M41.9995 10.6588C43.2369 8.70925 42.0707 5.91659 40.014 5.91659H24.0635C23.6316 5.91266 23.2061 6.0472 22.8281 6.30729C22.45 6.56737 22.132 6.94425 21.9046 7.40167L9.83487 32.4173C8.88249 34.3876 10.0795 36.846 11.9914 36.846H20.1352L12.464 60.7049C11.3549 63.7224 14.3521 66.4825 16.3661 64.2993L47.5 27.6041H31.2336L41.9995 10.6588Z"
                      stroke="#F24E1E"
                      stroke-width="3.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </svg>

                <h1 className="text-xl font-lateef font-semibold">
                  REQUIRES HALF AS MUCH ENERGY USAGE
                </h1>
                <p className="text-sm font-montserrat text-slate-400">
                  per carat production
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
