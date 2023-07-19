import mongoose from "mongoose";


// connecting to database
const connectdb = async () => {
  const connectionUrl = process.env.MONGO_URI;
  mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Database connected successfully`))
    .catch((err) => console.log("Getting Error from DB connection" + err.message))
  mongoose.set('strictQuery', false);
};

export default connectdb;
