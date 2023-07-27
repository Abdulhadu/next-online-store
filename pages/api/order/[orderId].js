import Order from "../../../Models/Order";

import connectdb from "../../../Middleware/mongoose";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).end(); // Method Not Allowed
  }

  const orderId = req.query.orderId;
  const { status } = req.body;

  try {
    await connectdb();

    // Update the order status in the database
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      { $set: { status } },
      { returnOriginal: false } // Return the updated document
    );

    if (!updatedOrder.value) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(updatedOrder.value);
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
