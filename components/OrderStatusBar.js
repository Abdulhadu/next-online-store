import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
const OrderStatusBar = ({ orderStatus }) => {
  const [currentStatus, setCurrentStatus] = useState(0);

  useEffect(() => {
    setCurrentStatus(statusMapping[orderStatus]);
  }, [orderStatus]);

  const statusMapping = {
    Processing: 0,
    Shipped: 1,
    Delivered: 2,
  };

  const updateStatusBar = (stepIndex) => {
    setCurrentStatus(stepIndex);
  };

  return (
    <>
      <div className="shadow-lg  mb-3 sm:mb-5 flex rounded-2xl flex-col  bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
        <h2 className="text-xl sm:text-3xl py-2 sm:py-4 lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
          Order Status
        </h2>
        <div className="order-status-bar bg-gray-200 rounded-md p-2 flex justify-between">
          <div
            className={`step flex-1 text-center py-2 rounded-md ${
              currentStatus >= 0 ? "bg-yellow-500" : "bg-gray-300"
            }`}
          >
            <span>Processing</span>
          </div>
          <div
            className={`step flex-1 text-center py-2 rounded-md ${
              currentStatus >= 1 ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span>Shipped</span>
          </div>
          <div
            className={`step flex-1 text-center py-2 rounded-md ${
              currentStatus >= 2 ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <span>Delivered</span>
          </div>
        </div>

        <div className="order-status-control mt-4">
          <input
            type="range"
            min="0"
            max="2"
            value={currentStatus}
            step="1"
            onChange={(e) => updateStatusBar(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </>
  );
};
OrderStatusBar.propTypes = {
  orderStatus: PropTypes.oneOf(["Processing", "Shipped", "Delivered"])
    .isRequired,
};

export default OrderStatusBar;
