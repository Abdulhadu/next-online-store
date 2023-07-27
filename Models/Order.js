import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    products: [
      {
        productid: { type: String },
        quantity: { type: Number, default: 1 },
        color: { type: String },
        size: { type: String },
        price: { type: Number, required: true },
        img: { type: String, required: true },
      },
    ],
    address: { type: String, required: true },
    price: { type: String, required: true },
    status: { type: String, default: "pending", required: true },
    paymentMethod: { type: String, default: "Cash On Delivery", required: true },
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.model("order", OrderSchema);
