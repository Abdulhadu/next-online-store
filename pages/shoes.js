import React from "react";
import mongoose from "mongoose";
import Product from "../Models/Product";
import Link from "next/link";
const shoes = ({ products }) => {
  return (
    <>
      <div
        className="flex justify-center p-6 md:p-10 2xl:p-8 relative bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: 'url("/page-header.jpg")' }}
      >
        <div className="absolute top-0 start-0 bg-black w-full h-full opacity-50 transition-opacity duration-500 group-hover:opacity-80"></div>
        <div className="w-full flex items-center justify-center relative z-10 py-10 md:py-14 lg:py-20 xl:py-24 2xl:py-32">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center">
            <span className="font-satisfy block font-normal mb-3">explore</span>
            SHOES
          </h2>
        </div>
      </div>
      <div>
        <section className="body-font lg:px-8 mx-auto max-w-7xl">
          <div className="container px-5 py-24 mx-auto">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {Object.keys(products).map((item) => (
                <div
                  key={item._id}
                  className="p-4 shadow-lg hover:shadow-2xl border-2"
                >
                  <Link
                    passHref={true}
                    legacyBehavior
                    href={`/product/${products[item].Slug}`}
                  >
                    <a className="block relative h-50 px-2 py-2 sm:px-4 sm:py-4 rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="object-cover object-center w-full h-full block"
                        src={products[item].img}
                      />

                      <div className="mt-4">
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                          {products[item].Category}
                        </h3>
                        <h2 className="text-gray-900 title-font sm:text-lg md:text-lg font-medium">
                          {products[item].title}
                        </h2>
                        <p className="mt-1 font-bold">
                          ${products[item].price}
                        </p>
                        <div className="mt-0.5 sm:mt-1">
                          {products[item].Size.includes("SM") && (
                            <span className="border-2 text-sm mx-0.5 sm:mx-0.5 sm:px-1.5">
                              SM
                            </span>
                          )}
                          {products[item].Size.includes("M") && (
                            <span className="border-2 text-sm mx-0.5 sm:mx-0.5 sm:px-1.5">
                              M
                            </span>
                          )}
                          {products[item].Size.includes("L") && (
                            <span className="border-2 text-sm  mx-0.5 sm:mx-0.5 sm:px-1.5">
                              L
                            </span>
                          )}
                          {products[item].Size.includes("XL") && (
                            <span className="border-2 text-sm mx-0.5 sm:mx-0.5 sm:px-1.5">
                              XL
                            </span>
                          )}
                          {products[item].Size.includes("XXL") && (
                            <span className="border-2 text-sm mx-0.5 sm:mx-0.5 sm:px-1.5">
                              XXL
                            </span>
                          )}
                        </div>
                        <div className="mt-1">
                          {products[item].Color.includes("white") && (
                            <button className="border-2 border-gray-300 rounded-full w-3 h-3 sm:w-6 sm:h-6 focus:outline-none"></button>
                          )}
                          {products[item].Color.includes("black") && (
                            <button className="border-2 border-gray-300 ml-1 bg-gray-800 rounded-full w-3 h-3 sm:w-6 sm:h-6 focus:outline-none"></button>
                          )}
                          {products[item].Color.includes("green") && (
                            <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-3 h-3 sm:w-6 sm:h-6 focus:outline-none"></button>
                          )}
                          {products[item].Color.includes("yellow") && (
                            <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-3 h-3 sm:w-6 sm:h-6 focus:outline-none"></button>
                          )}
                          {products[item].Color.includes("red") && (
                            <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-3 h-3 sm:w-6 sm:h-6 focus:outline-none"></button>
                          )}
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(`${process.env.MONGO_URI}`);
  }

  let products = await Product.find({ Category: "Shoes" });
  return {
    props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  };
}

export default shoes;
