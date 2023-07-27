import Order from "../../Models/Order";
import connectdb from "../../Middleware/mongoose";

const calculateTotalPrice = (cart) => {
  let totalPrice = 0;

  Object.keys(cart).forEach((key) => {
    const product = cart[key];
    const shipping=150;
    totalPrice += product.qty * product.price + shipping;
  });

  return totalPrice.toFixed(2); // Assuming you want the total price rounded to 2 decimal places
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { email, username, address, cart, paymentMethod} = req.body;

      const products = Object.keys(cart).map((key) => ({
        productid: key,
        quantity: cart[key].qty,
        color: cart[key].color,
        size: cart[key].size,
        price: cart[key].price,
        img: cart[key].img,
      }));

      const totalPrice = calculateTotalPrice(cart);

      const order = new Order({
        userId: email,
        userName: username,
        products,
        address,
        price: totalPrice,
        status: "pending",
        paymentMethod: paymentMethod
      });

      await order.save();

      res.status(200).json({ success: true, order });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectdb(handler);
