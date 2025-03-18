import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const MONGO_URI = process.env.MONGO_URI;
let connection;

const connect = async () => {
  try {
    if (!connection) {
      connection = await mongoose.connect(MONGO_URI);
    }
    await mongoose.connect(MONGO_URI);
    // console.log("connected!");
    return connection;
  } catch (error) {
    throw new Error("Error. Connection failed!", error);
  }
};
export default connect;
