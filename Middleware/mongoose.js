import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const connectdb = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    return; // Handle the error appropriately (e.g., send an error response)
  }
  return handler(req, res);
};

export default connectdb;
