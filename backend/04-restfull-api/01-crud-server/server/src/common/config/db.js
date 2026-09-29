import mongooe from "mongoose";
import { MONGO_URI } from "./envConfig.js";

const connectDB = async () => {
  try {
    const conn = await mongooe.connect(MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
