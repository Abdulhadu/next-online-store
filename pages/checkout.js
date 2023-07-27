import React from "react";
import { BsFilePlus } from "react-icons/bs";
import { BsFileMinus } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import OrderConfirmationModal from "./OrderConfirmationModal";
import { useRouter } from "next/router";

const checkout = ({ cart, addtoCart, clearCart, removeQty, subTotal }) => {
  const [form, setform] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "Pakistan",
    province: "",
    postalCode: "",
    phoneNo: "",
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleInputChange = (e) => {
    setform((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const Submit = async (e) => {
    e.preventDefault();

    // Retrieve the form values
    const {
      email,
      firstName,
      lastName,
      address,
      apartment,
      city,
      country,
      province,
      postalCode,
      phoneNo,
      paymentMethod,
    } = form;

    // Prepare the data object to send to the API
    const data = {
      email,
      username: `${firstName}, ${lastName}`,
      address: `${address}, ${apartment}, ${city}, ${country}, ${province}, ${postalCode}`,
      phoneNo,
      cart,
      paymentMethod,
    };
    console.log("data is : ", data);
    try {
      // Make an API call to submit the form data
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        // API call successful
        toast.success("Order placed successfully!");
        clearCart(); // Clear the cart after successful submission
        setShowConfirmationModal(true);
      } else {
        // API call failed
        toast.error("Failed to submit the order. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the order:", error);
      toast.error(
        "An error occurred while submitting the order. Please try again later."
      );
    }
  };
  const router = useRouter();
  useEffect(() => {
    // Redirect to home page after closing the confirmation modal
    if (!showConfirmationModal) {
      router.push("/checkout");
    }
  }, [showConfirmationModal]);

  useEffect(() => {
    // Show info toast message after the component is mounted
    toast.info("Please Proceed to Checkout", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, []);
  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={5006}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="bg-gray-50">
        <h1 className="mx-auto text-center font-bold text-3xl py-5">
          Checkout
        </h1>

        <main className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:max-w-none">
            <form
              onSubmit={Submit}
              className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
            >
              <div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    Contact information
                  </h2>

                  <div className="mt-4">
                    <label
                      htmlFor="email-address"
                      className="block text-md font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="email-address"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        autoComplete="email"
                        className="block w-full border-gray-300 rounded-md shadow-sm  focus:ring-purple-500 focus:border-purple-500 sm:text-base py-1 px-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h2 className="text-lg font-medium text-gray-900">
                    Shipping information
                  </h2>

                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label
                        htmlFor="first-name"
                        className="block text-md font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="first-name"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleInputChange}
                          autoComplete="given-name"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-base py-1 px-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="last-name"
                        className="block text-md font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="last-name"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleInputChange}
                          autoComplete="family-name"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-base py-1 px-1"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-md font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={form.address}
                          onChange={handleInputChange}
                          autoComplete="street-address"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-base py-1 px-1"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="apartment"
                        className="block text-md font-medium text-gray-700"
                      >
                        Apartment, suite, etc.
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="apartment"
                          id="apartment"
                          value={form.apartment}
                          onChange={handleInputChange}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-base py-1 px-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-md font-medium text-gray-700"
                      >
                        City
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={form.city}
                          onChange={handleInputChange}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-base py-1 px-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="province"
                        className="block text-md font-medium text-gray-700"
                      >
                        Province
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="province"
                          id="province"
                          value={form.province}
                          onChange={handleInputChange}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-base py-1 px-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="postal-code"
                        className="block text-md font-medium text-gray-700"
                      >
                        Postal code
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="postalCode"
                          id="postal-code"
                          value={form.postalCode}
                          onChange={handleInputChange}
                          autoComplete="postal-code"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-base py-1 px-1"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="phone"
                        className="block text-md font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="phoneNo"
                          id="phone"
                          value={form.phoneNo}
                          onChange={handleInputChange}
                          autoComplete="Phone no"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-base py-1 px-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                  <fieldset className="mt-4">
                    <legend className="sr-only">Payment type</legend>
                    <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="cashOnDelivery"
                          name="paymentMethod"
                          value="cashOnDelivery"
                          checked={form.paymentMethod === "cashOnDelivery"}
                          onChange={handleInputChange}
                          defaultChecked
                     
                          className="sm rounded-full bg-blue-600 hover:bg-blue-500 focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 sm:text-base py-1 px-1"
                        />
                        <label
                          htmlFor="cashOnDelivery"
                          className="ml-3 block text-md font-medium text-gray-700"
                        >
                          Cash On Delivery
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="bankPayment"
                          name="paymentMethod"
                          value="bankPayment"
                          checked={form.paymentMethod === "bankPayment"}
                          onChange={handleInputChange}
                          className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 sm:text-base py-1 px-1"
                        />
                        <label
                          htmlFor="bankPayment"
                          className="ml-3 block text-md font-medium text-gray-700"
                        >
                          Bank Payment
                        </label>
                      </div>
                    </div>
                  </fieldset>

                  {form.paymentMethod === "cashOnDelivery" && (
                    <div className="shadow-lg rounded-lg m-4 p-2 sm:px-4 bg-pink-100 sm:text-lg">
                     
                      <p>Payment will be made in cash upon delivery.</p>
                    </div>
                  )}

                  {form.paymentMethod === "bankPayment" && (
                    <div className="shadow-lg rounded-lg m-4 p-2 sm:px-4 bg-pink-100 sm:text-lg">
                      
                      <p>
                        Please make the payment to the following bank account:
                      </p>
                    <br></br>
                      <p>Bank Name: UBL Bank</p>
                      <p>Account Number: 123456789</p>
                      <p>Routing Number: 987654321</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10 lg:mt-0">
                <h2 className="text-lg font-medium text-gray-900">
                  Order summary
                </h2>

                <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <h3 className="sr-only">Items in your cart</h3>
                  <ul role="list" className="divide-y divide-gray-200">
                    {Object.keys(cart).map((k) => {
                      return (
                        <li key={k} className="flex py-6 px-4 sm:px-6">
                          <div className="h-24 w-auto flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={cart[k].img}
                              alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-6 flex-1 flex flex-col">
                            <div className="flex">
                              <div className="min-w-0 flex-1">
                                <h4 className="text-sm">
                                  <a
                                    href="#"
                                    className="font-semibold text-gray-700 hover:text-gray-800"
                                  >
                                    {cart[k].name}|{cart[k].size}/
                                    {cart[k].variant}
                                  </a>
                                </h4>

                                <p className="mt-1 text-md text-gray-500">
                                  {cart[k].variant}
                                </p>
                                <div className="flex justify-start text-base font-medium my-2 text-gray-900">
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

                              <div className="ml-4 flex-shrink-0 flow-root">
                                <button
                                  onClick={() => {
                                    removeQty(
                                      k,
                                      1,
                                      cart[k].name,
                                      cart[k].size,
                                      cart[k].price,
                                      cart[k].variant
                                    );
                                  }}
                                  type="button"
                                  className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                                >
                                  <span className="sr-only">Remove</span>

                                  <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Subtotal</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {subTotal} PKR
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Shipping</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        150 PKR
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                      <dt className="text-base font-medium">Total</dt>
                      <dd className="text-base font-medium text-gray-900">
                        {subTotal + 150} PKR
                      </dd>
                    </div>
                  </dl>
                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <button
                      type="submit"
                      className="w-full bg-purple-800 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-bold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
                    >
                      Confirm order
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
      {showConfirmationModal && (
        <OrderConfirmationModal
          onClose={() => setShowConfirmationModal(false)}
        />
      )}
    </div>
  );
};

export default checkout;
