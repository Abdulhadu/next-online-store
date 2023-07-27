/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { getOrderById } from "../services/admin";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import OrderStatusBar from "../components/OrderStatusBar";

const Orders = () => {
  const [username, setUsername] = useState(null); // State to store the username
  const [finalOrder, setFinalOrder] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      var decodedToken = jwt_decode(token, "secretkey");
      const username = decodedToken.email;
      setUsername(username);
      // console.log("username is : ", username);

      // Call the API to get user orders using the decoded user ID
      getOrderById(username)
        .then((userOrders) => {
          // Modify the data structure (if required)
          const modifiedData = userOrders.map((order) => {
            return {
              ...order,
              products: Object.values(order.products),
            };
          });
          setFinalOrder(modifiedData);
        })
        .catch((error) => {
          console.error("Error fetching user orders:", error);
          // Handle errors that occurred while fetching user orders
        });
    } else {
      // Handle the case when there is no token available
      // For example, redirect to the login page
      router.push("/login");
    }
  }, [router.query]);


  return (
    <>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        {finalOrder?.map((order) => {
          return (
            <>
              <div>
                <OrderStatusBar orderStatus={order.status} />
              </div>
              <div className="flex justify-start item-start space-y-2 flex-col">
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                  Order ID: {order._id}
                </h1>
                <p className="text-base font-medium leading-6 text-gray-800">
                  {order.createdAt}
                </p>
              </div>
              <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                  <div className="shadow-md flex rounded-2xl flex-col justify-start items-start  bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                    <p className="text-lg md:text-xl  font-semibold leading-6 xl:leading-5 text-gray-800">
                      Order Details
                    </p>

                    {order.products.map((product) => (
                      <>
                        <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                          <div className="pb-4 md:pb-8 w-full md:w-40">
                            <img
                              className="w-full hidden md:block"
                              src={product.img}
                              alt="dress"
                            />
                          </div>
                          <div className="border-b border-gray-800 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                            <div className="w-full flex flex-col justify-start items-start space-y-8">
                              <h3 className="text-xl  xl:text-2xl font-semibold leading-6 text-gray-800">
                                {product.productid}
                              </h3>
                              <div className="flex justify-start items-start flex-col space-y-2">
                                <p className="text-lg font-semibold   text-gray-900">
                                  <span className="dark:text-gray-600 text-gray-300">
                                    Product Size:
                                  </span>
                                  ({product.size})
                                </p>
                                <p className="text-lg font-semibold   text-gray-900 ">
                                  <span className="dark:text-gray-600 text-gray-300">
                                    Product Color:
                                  </span>
                                  ({product.color})
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between space-x-8 items-start w-full">
                              <p className="text-base  xl:text-lg leading-6">
                                Price: {product.price}
                              </p>
                              <p className="text-base  xl:text-lg leading-6 text-gray-800">
                                Quantity: 0{product.quantity}
                              </p>
                              <p className="text-base  xl:text-lg font-semibold leading-6 text-gray-800">
                                Total: {product.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="flex justify-center flex-col md:flex-row l items-stretch rounded-2xl w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                    <div className="shadow-md flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 rounded-2xl space-y-6">
                      <h3 className="text-xl  font-semibold leading-5 text-gray-800">
                        Summary
                      </h3>
                      <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-800 border-b pb-4">
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base leading-4 text-gray-800">
                            Shipping
                          </p>
                          <p className="text-base  leading-4 text-gray-800">
                            $120
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base font-semibold leading-4 text-gray-800">
                          Total
                        </p>
                        <p className="text-base  font-semibold leading-4 text-gray-800">
                          {order.price}
                        </p>
                      </div>
                    </div>
                    <div className="shadow-md flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full rounded-2xl bg-gray-50  space-y-6">
                      <h3 className="text-xl  font-semibold leading-5 text-gray-800">
                        Shipping
                      </h3>
                      <div className="flex justify-between items-start w-full">
                        <div className="flex justify-center items-center space-x-4">
                          <div className="w-8 h-8">
                            <img
                              className="w-full h-full"
                              alt="logo"
                              src="https://i.ibb.co/L8KSdNQ/image-3.png"
                            />
                          </div>
                          <div className="flex flex-col justify-start items-center">
                            <p className="text-lg leading-6 font-semibold text-gray-800">
                              DHL Express Delivery
                              <br />
                              <span className="font-normal">
                                Deliver With in 3 Working Days
                              </span>
                            </p>
                          </div>
                        </div>
                        <p className="text-lg font-semibold leading-6  text-gray-800">
                          $150
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shadow-md bg-gray-50  w-full xl:w-96 flex justify-between items-center rounded-2xl md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                  <h3 className="text-xl  font-semibold leading-5 text-gray-800">
                    Customer
                  </h3>
                  <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                    <div className="flex flex-col justify-start items-start flex-shrink-0">
                      <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-800">
                        <img
                          src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                          alt="avatar"
                        />
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-base  font-semibold leading-4 text-left text-gray-800">
                            {order.userName}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-center text-gray-800  md:justify-start items-center space-x-4 py-4 border-b border-gray-800 w-full">
                        <img
                          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg"
                          alt="email"
                        ></img>
                        <img
                          className="hidden"
                          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1dark.svg"
                          alt="email"
                        ></img>
                        <p className="cursor-pointer text-sm leading-5 ">
                          {order.userId}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                      <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                        <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                          <p className="text-base  font-semibold leading-4 text-center md:text-left text-gray-800">
                            Shipping Address
                          </p>
                          <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-800">
                            {order.address}
                          </p>
                        </div>
                        <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                          <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                            Billing Address
                          </p>
                          <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-800">
                            {order.address}
                          </p>
                        </div>
                      </div>
                      <div className="flex w-full justify-center items-center md:justify-start md:items-start"></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Orders;
