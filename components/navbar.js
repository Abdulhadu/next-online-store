import React, { useState, useRef } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import { CgTrashEmpty } from "react-icons/cg";
import { BsFilePlus } from "react-icons/bs";
import { BsFileMinus } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

const navbar = ({
  logout,
  user,
  cart,
  addtoCart,
  clearCart,
  removeQty,
  subTotal,
}) => {
  const [dropdown, setdropdown] = useState(false);
  const togleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();

  return (
    <header className="container sticky top-0 z-40 text-gray-600 body-font ">
      <div className="!overflow-x-hidden sm:overflow-x-hidden">
        <nav className="bg-white border-gray-200">
          <div className="flex z-40 flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <div className="w-40 mt-5 sm:mt-0 sm:w-60">
              <Image src="/Logo.png" height={70} width={250} />
            </div>
            <div className="flex items-center">
              <div className="hidden sm:block">
                <a
                  href="tel:5541251234"
                  className="mr-6 text-sm sm:text-lg text-gray-700 hover:underline"
                >
                  (+92) 317-5569121
                </a>
              </div>
              {user.value == null && (
                <button className=" inline-flex items-center mx-3 drop-shadow-lg  rounded-md bg-purple-700 text-slate-50 border-0 py-2 px-5 font-bold text-lg focus:outline-none hover:bg-gray-200 hover:text-purple-800   hover:font-bold mt-4 md:mt-0">
                  <a href="/login">Login</a>
                </button>
              )}

              <div className="z-10 relative inline-block text-left">
                <span
                  onMouseOver={() => {
                    setdropdown(true);
                  }}
                  onMouseLeave={() => {
                    setdropdown(false);
                  }}
                  className="py-2 z-40 bg-white text-sr:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  {dropdown && (
                    <div
                      onMouseOver={() => {
                        setdropdown(true);
                      }}
                      onMouseLeave={() => {
                        setdropdown(false);
                      }}
                      className=" origin-top-right top-10 absolute right-5 w-56 rounded-md shadow-lg bg-purple-100 ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex="-1"
                    >
                      <div className="z-50" role="none">
                        <ul>
                          <li>
                            {" "}
                            <a
                              href="#"
                              className=" text-gray-700 block px-4 py-2 font-semibold hover:bg-purple-300 text-sm"
                              role="menuitem"
                              tabIndex="-1"
                              id="menu-item-0"
                            >
                              My Accounts
                            </a>
                          </li>
                          <li>
                            {" "}
                            <a
                              href="/contact"
                              className="text-gray-700 block px-4 py-2 font-semibold hover:bg-purple-300 text-sm"
                              role="menuitem"
                              tabIndex="-1"
                              id="menu-item-1"
                            >
                              Support
                            </a>
                          </li>
                          <li>
                            {" "}
                            <a
                              href="/orders"
                              className="text-gray-700 block px-4 py-2 font-semibold hover:bg-purple-300 text-sm"
                              role="menuitem"
                              tabIndex="-1"
                              id="menu-item-2"
                            >
                              Orders
                            </a>
                          </li>
                          <li>
                            {" "}
                            <a
                              onClick={logout}
                              className="text-gray-700 block px-4 py-2 font-semibold hover:bg-purple-300 text-sm"
                              role="menuitem"
                              tabIndex="-1"
                              id="menu-item-3"
                            >
                              Sign out
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {user.value && (
                    <RiAccountCircleFill
                      className="cursor-pointer mt-5 sm:mt-0 mx-3 "
                      size={45}
                    />
                  )}
                </span>
              </div>

              <button
                onClick={togleCart}
                className="inline-flex  mx- drop-shadow-lg rounded-md bg-purple-700 text-slate-50 border-0 py-3 px-3  focus:outline-none hover:bg-gray-200 hover:text-purple-800 text-base  hover:font-bold mt-4 md:mt-0"
              >
                <FaShoppingCart size={20} />
              </button>
            </div>
          </div>
        </nav>
        <nav className="bg-gray-100">
          <div className=" max-w-screen-xl px-4 py-3 mx-auto">
            <div className="flex items-center">
              <ul className="flex flex-row text-center font-medium mt-0 mr-6 space-x-8 text-sm">
                <li>
                  <Link href="/" legacyBehavior>
                    <a className="text-sm link link-underline font-sans antialiased link-underline-black mr-5 font-bold  cursor-pointer text-purple-800 hover:text-gray-900 sm:text-lg  ">
                      HOME
                    </a>
                  </Link>
                  <Link href="/tshirt " legacyBehavior>
                    <a className="text-sm link link-underline link-underline-black mr-5 font-bold  cursor-pointer text-purple-800 hover:text-gray-900 sm:text-lg ">
                      T-SHIRT
                    </a>
                  </Link>
                  <Link href="/hoodies" legacyBehavior>
                    <a className="text-sm link link-underline link-underline-black mr-5 font-bold  cursor-pointer text-purple-800 hover:text-gray-900 sm:text-lg ">
                      HOODIES
                    </a>
                  </Link>
                  <Link href="/menStyle" legacyBehavior>
                    <a className="text-sm  link link-underline link-underline-black mr-5 font-bold  cursor-pointer text-purple-800 hover:text-gray-900 sm:text-lg ">
                      MEN-STYLE
                    </a>
                  </Link>

                  <Link href="/contact" legacyBehavior>
                    <a className="text-sm link link-underline link-underline-black mr-5 font-bold cursor-pointer text-purple-800 hover:text-gray-900 sm:text-lg ">
                      CONTACT US
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Shopping Cart  */}
        <div
          ref={ref}
          className={`absolute top-0 right-0 z-50 transition-transform transform ${
            Object.keys(cart).length !== 0
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >
          <div className="relative inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="flex h-full flex-col overflow-y-scroll bg-purple-100 shadow-xl">
              <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2
                    className="text-lg font-medium text-gray-900"
                    id="slide-over-title"
                  >
                    Shopping cart
                  </h2>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      onClick={togleCart}
                      type="button"
                      className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close panel</span>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {Object.keys(cart).length == 0 && (
                        <div className="my-6 item-center font-semibold text-center">
                          <svg
                            className="item center mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            width="200"
                            height="310"
                          >
                            <g
                              id="no_cart_in_bag"
                              data-name="no cart in bag"
                              transform="translate(-988 -7673)"
                            >
                              <g
                                id="no_cart"
                                data-name="no cart"
                                transform="translate(988 7673)"
                              >
                                <g
                                  id="Group_5970"
                                  data-name="Group 5970"
                                  transform="translate(0 0)"
                                >
                                  <g
                                    id="Group_5967"
                                    data-name="Group 5967"
                                    transform="translate(17.408 92.119)"
                                  >
                                    <path
                                      id="Path_17743"
                                      data-name="Path 17743"
                                      d="M405.506,794.581l63.621-36.762L418.2,724.274Z"
                                      transform="translate(-323.428 -576.978)"
                                      fill="#ba8064"
                                    ></path>
                                    <path
                                      id="Path_17744"
                                      data-name="Path 17744"
                                      d="M135.711,140.727l32.918-.12,1.287-20.225,79.451,45.843-34.42,1.084v19.165Z"
                                      transform="translate(-118.988 -119.373)"
                                      fill="#dba480"
                                    ></path>
                                    <path
                                      id="Path_17745"
                                      data-name="Path 17745"
                                      d="M314.4,206.341,272,124.761l-2.279,22.008,1.4,59.572Z"
                                      transform="translate(-220.537 -122.691)"
                                      fill="#460100"
                                      opacity="0.1"
                                    ></path>
                                    <path
                                      id="Path_17746"
                                      data-name="Path 17746"
                                      d="M141.237,253.056l-10.26-47.388,34.59-.126v37.243Z"
                                      transform="translate(-115.402 -183.904)"
                                      fill="#995b47"
                                    ></path>
                                    <path
                                      id="Path_17747"
                                      data-name="Path 17747"
                                      d="M511.029,445.295l-49.136-22.179L460.8,385.489l1.089-72.515,35.954-1.133Z"
                                      transform="translate(-365.33 -264.454)"
                                      fill="#a96e56"
                                    ></path>
                                    <path
                                      id="Path_17748"
                                      data-name="Path 17748"
                                      d="M148.755,398.756l9.58-70.307,4.9-79.149L81.161,201.911,66.677,351.368Z"
                                      transform="translate(-66.677 -181.153)"
                                      fill="#dba480"
                                    ></path>
                                    <path
                                      id="Path_17749"
                                      data-name="Path 17749"
                                      d="M349.459,429.379c-.415,1.942-2.182,2.6-3.948,1.46a5.753,5.753,0,0,1-2.446-5.572c.414-1.942,2.182-2.6,3.948-1.46A5.753,5.753,0,0,1,349.459,429.379Z"
                                      transform="translate(-276.046 -348.874)"
                                      fill="#67251d"
                                    ></path>
                                    <path
                                      id="Path_17750"
                                      data-name="Path 17750"
                                      d="M209.819,348.753c-.415,1.942-2.182,2.6-3.948,1.46a5.753,5.753,0,0,1-2.446-5.572c.415-1.942,2.182-2.6,3.948-1.46A5.753,5.753,0,0,1,209.819,348.753Z"
                                      transform="translate(-170.233 -287.779)"
                                      fill="#67251d"
                                    ></path>
                                    <g
                                      id="Group_5965"
                                      data-name="Group 5965"
                                      transform="translate(31.503 60.166)"
                                      opacity="0.2"
                                    >
                                      <path
                                        id="Path_17751"
                                        data-name="Path 17751"
                                        d="M219.35,441.507a16.861,16.861,0,0,1-8.439-2.272A28.35,28.35,0,0,1,196.858,412l4.383-45.226a2.414,2.414,0,0,1,4.806.467l-4.383,45.226a23.483,23.483,0,0,0,11.608,22.554,12.055,12.055,0,0,0,18.081-9.247l3.819-39.41a2.414,2.414,0,0,1,4.806.467l-3.819,39.41a16.912,16.912,0,0,1-16.809,15.266Z"
                                        transform="translate(-196.727 -364.591)"
                                        fill="#460100"
                                      ></path>
                                    </g>
                                    <path
                                      id="Path_17752"
                                      data-name="Path 17752"
                                      d="M162.373,116.218,161.06,136.85l-34.59.126,82.078,47.388V164.738l35.954-1.132Zm44.968,47.351v18.7l-76.395-44.106,31.247-.113,1.261-19.819,76.774,44.3Z"
                                      transform="translate(-111.986 -116.218)"
                                      fill="#fcc89d"
                                    ></path>
                                    <g
                                      id="Group_5966"
                                      data-name="Group 5966"
                                      transform="translate(29.24 57.45)"
                                    >
                                      <path
                                        id="Path_17753"
                                        data-name="Path 17753"
                                        d="M210.007,430.3a16.864,16.864,0,0,1-8.438-2.271,28.35,28.35,0,0,1-14.054-27.235l4.383-45.226a2.414,2.414,0,0,1,4.806.467l-4.383,45.226a23.483,23.483,0,0,0,11.608,22.554,12.055,12.055,0,0,0,18.081-9.247l3.819-39.41a2.414,2.414,0,0,1,4.806.467l-3.819,39.41A16.912,16.912,0,0,1,210.007,430.3Z"
                                        transform="translate(-187.384 -353.38)"
                                        fill="#995b47"
                                      ></path>
                                    </g>
                                    <path
                                      id="Path_17754"
                                      data-name="Path 17754"
                                      d="M405.506,546.991,419.99,488.05V397.534Z"
                                      transform="translate(-323.428 -329.388)"
                                      fill="#995b47"
                                    ></path>
                                  </g>
                                  <g
                                    id="Group_5968"
                                    data-name="Group 5968"
                                    transform="translate(0 0)"
                                  >
                                    <path
                                      id="Path_17755"
                                      data-name="Path 17755"
                                      d="M394.573,120.6c-.142-.5.244-.855.5-1.088a1.4,1.4,0,0,0,.271-.293,0,0,0,0,0,0,0,1.39,1.39,0,0,0-.384-.107c-.34-.065-.853-.162-1-.665s.244-.855.5-1.088a1.39,1.39,0,0,0,.271-.293,0,0,0,0,0,0,0,1.4,1.4,0,0,0-.384-.107c-.34-.064-.853-.162-1-.664s.244-.855.5-1.088l.009-.008a.9.9,0,0,0,.259-.482.391.391,0,0,1,.276-.292.41.41,0,0,1,.5.316,1.122,1.122,0,0,1-.51,1.046,1.4,1.4,0,0,0-.271.292,0,0,0,0,0,0,0,1.4,1.4,0,0,0,.384.107c.34.065.853.162,1,.665s-.244.855-.5,1.088a1.4,1.4,0,0,0-.271.293,0,0,0,0,0,0,0,1.391,1.391,0,0,0,.384.107c.34.065.853.162,1,.665s-.244.855-.5,1.088a1.257,1.257,0,0,0-.273.3,0,0,0,0,0,0,0,1.641,1.641,0,0,0,.387.1c.331.063.826.157.983.625a.416.416,0,0,1-.21.507.392.392,0,0,1-.456-.109.789.789,0,0,0-.464-.253h0C395.229,121.2,394.716,121.1,394.573,120.6Z"
                                      transform="translate(-349.075 -37.518)"
                                      fill="#212121"
                                      opacity="0.3"
                                    ></path>
                                    <path
                                      id="Path_17765"
                                      data-name="Path 17765"
                                      d="M395.468,120.6c.142-.5-.244-.855-.5-1.088a1.4,1.4,0,0,1-.271-.293,0,0,0,0,1,0,0,1.39,1.39,0,0,1,.384-.107c.34-.065.853-.162,1-.665s-.244-.855-.5-1.088a1.389,1.389,0,0,1-.271-.293,0,0,0,0,1,0,0,1.4,1.4,0,0,1,.384-.107c.34-.064.853-.162,1-.664s-.244-.855-.5-1.088l-.009-.008a.9.9,0,0,1-.259-.482.391.391,0,0,0-.276-.292.41.41,0,0,0-.5.316,1.122,1.122,0,0,0,.51,1.046,1.4,1.4,0,0,1,.271.292,0,0,0,0,1,0,0,1.4,1.4,0,0,1-.384.107c-.34.065-.853.162-1,.664s.244.855.5,1.088a1.4,1.4,0,0,1,.271.293,0,0,0,0,1,0,0,1.39,1.39,0,0,1-.384.107c-.34.065-.853.162-1,.665s.244.855.5,1.088a1.257,1.257,0,0,1,.273.3,0,0,0,0,1,0,0,1.641,1.641,0,0,1-.387.1c-.331.063-.826.157-.983.625a.416.416,0,0,0,.21.507.392.392,0,0,0,.456-.109.789.789,0,0,1,.464-.253h0C394.812,121.2,395.326,121.1,395.468,120.6Z"
                                      transform="translate(-262.76 -23.736)"
                                      fill="#212121"
                                      opacity="0.3"
                                    ></path>
                                    <path
                                      id="Path_17756"
                                      data-name="Path 17756"
                                      d="M375.447,179.277a2.539,2.539,0,1,1,3.346,1.3A2.542,2.542,0,0,1,375.447,179.277Zm3.737-1.643a1.543,1.543,0,1,0-.791,2.034A1.545,1.545,0,0,0,379.184,177.634Z"
                                      transform="translate(-375.232 -52.408)"
                                      fill="#212121"
                                      opacity="0.3"
                                    ></path>
                                    <path
                                      id="Path_17764"
                                      data-name="Path 17764"
                                      d="M375.447,179.277a2.539,2.539,0,1,1,3.346,1.3A2.542,2.542,0,0,1,375.447,179.277Zm3.737-1.643a1.543,1.543,0,1,0-.791,2.034A1.545,1.545,0,0,0,379.184,177.634Z"
                                      transform="translate(-333.888 -175.716)"
                                      fill="#212121"
                                      opacity="0.3"
                                    ></path>
                                    <path
                                      id="Path_17757"
                                      data-name="Path 17757"
                                      d="M350.086,264.8a1.852,1.852,0,0,1-2.682-2.547l-.868-.823a3.047,3.047,0,0,0,4.417,4.194Z"
                                      transform="translate(-253.642 -206.302)"
                                      fill="#212121"
                                      opacity="0.3"
                                    ></path>
                                    <path
                                      id="Path_17766"
                                      data-name="Path 17766"
                                      d="M346.628,264.8a1.852,1.852,0,0,0,2.682-2.547l.867-.823a3.047,3.047,0,0,1-4.417,4.194Z"
                                      transform="translate(-170.953 -110.557)"
                                      fill="#212121"
                                      opacity="0.15"
                                    ></path>
                                    <path
                                      id="Union_11"
                                      data-name="Union 11"
                                      d="M2.059,6.97l.989-3.048L0,2.933.283,2.06l3.049.989L4.321,0,5.2.284l-.99,3.048,3.047.989L6.97,5.2l-3.048-.99-.99,3.049Z"
                                      transform="translate(6.528 48.598)"
                                      fill="#212121"
                                      stroke="rgba(0,0,0,0)"
                                      strokeMiterlimit="10"
                                      strokeWidth="1"
                                      opacity="0.3"
                                    ></path>
                                    <path
                                      id="Union_13"
                                      data-name="Union 13"
                                      d="M2.059,6.97l.989-3.048L0,2.933.283,2.06l3.049.989L4.321,0,5.2.284l-.99,3.048,3.047.989L6.97,5.2l-3.048-.99-.99,3.049Z"
                                      transform="translate(94.294 121.132)"
                                      fill="#212121"
                                      stroke="rgba(0,0,0,0)"
                                      strokeMiterlimit="10"
                                      strokeWidth="1"
                                      opacity="0.3"
                                    ></path>
                                    <path
                                      id="Union_12"
                                      data-name="Union 12"
                                      d="M1.235,4.182l.593-1.829L0,1.759l.17-.524L2,1.829,2.592,0l.525.17L2.523,2l1.828.594-.17.523L2.353,2.523,1.759,4.352Z"
                                      transform="translate(107.351 6.528)"
                                      fill="#212121"
                                      stroke="rgba(0,0,0,0)"
                                      strokeMiterlimit="10"
                                      strokeWidth="1"
                                      opacity="0.3"
                                    ></path>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                          <h2>Cart is Empty!</h2>
                        </div>
                      )}
                      {/* loop the list items in cart  */}
                      {Object.keys(cart).map((k) => {
                        return (
                          <li key={k} className="flex py-6">
                            <div className="h-24 w-auto flex-shrink- overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={cart[k].img}
                                alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href="#">
                                      {cart[k].name}|{cart[k].size}/
                                      {cart[k].variant}{" "}
                                    </a>
                                  </h3>
                                  <p className="ml-4">{cart[k].qty}</p>
                                </div>

                                <p className="mt-1 text-sm text-gray-500">
                                  {cart[k].variant}
                                </p>

                                <div className="flex justify-start text-base font-medium my-1 text-gray-900">
                                  <button
                                    onClick={() => {
                                      removeQty(
                                        k,
                                        cart[k].img,
                                        1,
                                        cart[k].name,
                                        cart[k].size,
                                        cart[k].price,
                                        cart[k].variant
                                      );
                                    }}
                                  >
                                    <BsFileMinus size={27} />{" "}
                                  </button>
                                  <span className="border-2 px-3 border-gray-600">
                                    {cart[k].qty}
                                  </span>

                                  <button
                                    onClick={() => {
                                      addtoCart(
                                        k,
                                        cart[k].img,
                                        1,
                                        cart[k].name,
                                        cart[k].size,
                                        cart[k].price,
                                        cart[k].variant
                                      );
                                    }}
                                  >
                                    <BsFilePlus size={27} />{" "}
                                  </button>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-700 font-semibold">
                                  {cart[k].price}
                                </p>

                                <div className="flex">
                                  <button
                                    onClick={() => {
                                      removeQty(
                                        k,
                                        cart[k].img,
                                        1,
                                        cart[k].name,
                                        cart[k].size,
                                        cart[k].price,
                                        cart[k].variant
                                      );
                                    }}
                                    type="button"
                                    className="font-medium text-purple-800 hover:text-purple-800"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>{subTotal}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6 flex-row">
                  <a
                    href="/checkout"
                    className="flex items-center  justify-center rounded-full border border-transparent font-semibold text-white bg-purple-800 px-6 py-3 text-base hover:font-bold hover:border-purple-800 hover:border-2 hover:text-purple-800 shadow-sm hover:bg-slate-200"
                  >
                    Checkout
                  </a>
                </div>

                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <button className="mx-2 font-bold" onClick={clearCart}>
                    <CgTrashEmpty size={25} />
                  </button>
                  <p>
                    <button
                      onClick={togleCart}
                      type="button"
                      className="font-medium text-purple-800 hover:text-purple-800"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default navbar;
